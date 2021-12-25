from django.contrib import messages
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from allauth.account.models import EmailAddress
from allauth.account.views import ConfirmEmailView
from allauth.account import app_settings
from allauth.account.adapter import get_adapter
import requests

from users.models import CustomUser
from aaadir.utils import account_activation_token



# User가 email link를 클릭 -> Root가 2차 인증을 시행하기 위한 메일을 보냄
class CustomConfirmEmailView(ConfirmEmailView):
    # allauth.account.views.ConfirmEmailView를 override함
    # tmplate_name ==> account/email_confirm.html
    template_name = "account/email_confirm_user.html"   ###

    def post(self, *args, **kwargs):        
        '''
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)

        get_object()는 allauth models.py에 있는 EmailConfirmationHMAC의 form_key function을 이용해서,
        (EmailConfirmationHMAC class는 email_adderess를 인자로 받음)
        특정 user의 정보가 담긴 EmailConfirmationHMAC class를 얻어옴
        -> 이를 confirmation 변수로 지정

        그 후 EmailConfirmationHMAC의 confirm function을 이용해서 그 user를 verified=True로 만들고,
        인증 완료 이메일을 발송함
        '''
        self.object = confirmation = self.get_object()
        email_user = confirmation.email_address

        if not email_user.verified:
            user = get_object_or_404(CustomUser, email=email_user)
            user_id = user.pk
            token = account_activation_token.make_token(user)
            activate_url = reverse("account_activate_root", kwargs={"id": user_id, "token": token})
            activate_url = self.request.build_absolute_uri(activate_url)
            mail_subject = user.first_name + '님의 계정 활성을 위한 메일입니다.'
            message = render_to_string('account/email_confirm_root.html', {
                'user': user,
                'activate_url':activate_url,
            })
            to_email = 'nnam27@gmail.com'
            email = EmailMessage(
                mail_subject, 
                message, 
                to=[to_email]
            )
            email.send()
            status = "not_verified"
        else:
            status = "already_verified"

        # In the event someone clicks on an email confirmation link
        # for one account while logged into another account,
        # logout of the currently logged in account.
        if (
            self.request.user.is_authenticated
            and self.request.user.pk != confirmation.email_address.user_id
        ):
            self.logout()

        get_adapter(self.request).add_message(
            self.request,
            messages.SUCCESS,
            "account/messages/email_confirmed.txt",
            {"email": confirmation.email_address.email},
        )
        if app_settings.LOGIN_ON_EMAIL_CONFIRMATION:
            resp = self.login_on_confirm(confirmation)
            if resp is not None:
                return resp
        # Don't -- allauth doesn't touch is_active so that sys admin can
        # use it to block users et al
        #
        # user = confirmation.email_address.user
        # user.is_active = True
        # user.save()
        
        if status == "already_verified":
            context_title1 = "✓ 인증이 이미 완료된 계정"
            context_title2 = ""
            context_text1 = "이미 인증이 완료된 계정입니다."
            context_text2 = "다시 로그인을 시도해보시기 바랍니다."
        elif status == "not_verified":
            context_title1 = "✓ 이메일 인증 완료"
            context_title2 = "✗ 관리자 인증 필요"
            context_text1 = "로그인을 위해서는 관리자 인증이 추가로 필요합니다."
            context_text2 = "관리자 인증은 2~5일 가량 소요될 수 있습니다."
        else:
            context_title1 = ""
            context_title2 = "✗ 존재하지 않는 계정"
            context_text1 = "존재하지 않는 계정입니다."
            context_text2 = "다시 확인해주시기 바랍니다."

        context = {
            "title1": context_title1,
            "title2": context_title2,
            "text1": context_text1,
            "text2": context_text2
        }
        return render(self.request, "account/email_confirm_done.html", context)



# Root가 link를 클릭한 경우 2차 인증 진행
def account_activate_from_root(request, id, token):
    try:
        user = get_object_or_404(CustomUser, pk=id)
        email_user = get_object_or_404(EmailAddress, pk=id)
    except(TypeError, ValueError, OverflowError, EmailAddress.DoesNotExist, CustomUser.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        # verified로 업데이트
        email_user.verified = True
        email_user.save() 

        # User에게 승인완료 메일 보내기
        current_site = get_current_site(request)
        mail_subject = user.first_name + '님의 가입이 승인되었습니다.'
        message = render_to_string('account/email_confirm_root_final.html', {
            'user': user,
            'domain': current_site,
        })
        to_email = user.email
        email = EmailMessage(
            mail_subject, 
            message, 
            to=[to_email]
        )
        email.send()

        context = {
            "title1": "승인 완료",
            "title2": "",
            "text1": f"{email_user} 계정의 승인이 완료되었습니다.",
            "text2": ""
        }
    else:
        context = {
            "title1": "",
            "title2": "Activation Link 오류",
            "text1": "계정 활성 link에 오류가 있습니다.",
            "text2": ""
        }

    return render(request, "account/email_confirm_done.html", context)


# User 인증 메일 다시 보내기
class ResendMail(TemplateView):
    template_name = "account/email_confirm_user_resend.html"

    def post(self, request):
        # 인증 메일 재발송
        api_email_resend = request.build_absolute_uri("/api/auth/register/resend-email/")
        email_post = request.POST['email']
        data = {'email': email_post}

        try: 
            email_user = EmailAddress.objects.get(email=email_post)
            if email_user.verified:   
                status = "already_verified"
            else:
                status = "not_verified"
                response = requests.post(api_email_resend, data)
        except EmailAddress.DoesNotExist:
                status = "not_exist"

        redirect_url = reverse("account-confirm-user-resend") + "?email=" + email_post
        redirect_url = redirect_url + "&status=" + status
        return redirect(redirect_url)  

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        email_get = self.request.GET['email']
        status_get = self.request.GET['status']

        if status_get == "already_verified":   
            context["title"] = "인증 완료된 계정"
            context["text1"] = "이미 인증이 완료된 계정입니다."
        elif status_get == "not_verified":
            context["title"] = "인증 메일 재발송"
            context["text1"] = f"{email_get}로 계정 인증 메일이 재발송 되었습니다."     
        else:
            context["title"] = "존재하지 않는 이메일"
            context["text1"] = f"가입 정보가 없는 이메일 주소입니다." 
            
        context["email"] = self.request.GET['email']
        return context
    
