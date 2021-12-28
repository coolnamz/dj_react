from django.views.generic import TemplateView
from django.contrib import messages
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from allauth.account.views import ConfirmEmailView
from allauth.account import app_settings
from allauth.account.adapter import get_adapter
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
import requests
import datetime

from allauth.account.models import EmailAddress
from users.models import CustomUser
from .utils import account_activation_token, make_email_to_root


# User가 email link를 클릭 -> Root가 2차 인증을 시행하기 위한 메일을 보냄
class CustomConfirmEmailView(ConfirmEmailView):
    # allauth.account.views.ConfirmEmailView를 override함
    # tmplate_name ==> account/email_confirm.html
    template_name = "account/email_confirm_user.html" 

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
            status = "not_verified"
            user = get_object_or_404(CustomUser, email=email_user)

            # 사용자 1차 인증은 승인
            user.email_verified = True
            user.last_confirm_request = datetime.datetime.now()
            user.save()

            # 관리자 2차 인증을 위한 메일 관리자에게 보내기
            user = CustomUser.objects.get(email=email_user)
            email = make_email_to_root(self.request, user)
            try:
                email.send()
            except:
                context = {
                    "title": "이메일 전송 실패",
                    "text1": "이메일 전송 시스템에 문제가 발생하였습니다.",
                    "text2": "관리자 메일로 직접 인증 요청을 해 주시기 바랍니다."
                }
                return render(self.request, "account/email_confirm_done.html", context)
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
            context_title = "✓ 인증이 이미 완료된 계정"
            context_text1 = "이미 인증이 완료된 계정입니다."
            context_text2 = "다시 로그인을 시도해보시기 바랍니다."
        elif status == "not_verified":
            context_title = "✓ 관리자 승인 요청 발송"
            context_text1 = "계정 활성화를 위해 관리자 승인을 요청하였습니다."
            context_text2 = "관리자 승인은 2~5일 가량 소요될 수 있습니다."
        else:
            context_title = "✗ 존재하지 않는 계정"
            context_text1 = "존재하지 않는 계정입니다."
            context_text2 = "다시 확인해주시기 바랍니다."

        context = {
            "title": context_title,
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
            "title": "승인 완료",
            "text1": f"{email_user} 계정의 승인이 완료되었습니다.",
            "text2": ""
        }
    else:
        context = {
            "title": "승인 실패",
            "text1": "계정 활성 link에 오류가 있습니다.",
            "text2": ""
        }

    return render(request, "account/email_confirm_done.html", context)


# User 인증 메일 다시 보내기
class ResendMail(TemplateView):
    template_name = "account/email_confirm_user_resend.html"

    def post(self, request):        
        api_email_resend = request.build_absolute_uri("/auth/register/resend-email/")
        email_post = request.POST['email']
        data = {'email': email_post}

        try: 
            email_user = EmailAddress.objects.get(email=email_post)
            if email_user.verified:   
                status = "already_verified"
            else:
                status = "not_verified"
                # 인증 메일 재발송
                response = requests.post(api_email_resend, data)
        except:
                status = "not_exist"
                context = {
                    "title": "이메일 전송 실패",
                    "text1": "이메일 전송 시스템에 문제가 발생하였습니다.",
                    "text2": ""
                }
                return render(self.request, "account/email_confirm_done.html", context)

        redirect_url = reverse("account_confirm_user_resend") + "?email=" + email_post
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


# Root 인증 요청 다시보내는 API
class ResendRequestToRoot(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):   
        try:
            email_post = request.data["email"]
            email_user = EmailAddress.objects.get(email=email_post)
        except:
            return Response({"detail": "등록되지 않은 이메일 주소입니다."}, status.HTTP_400_BAD_REQUEST)

        if email_user.verified:
            return Response({"detail": "이미 인증되어 있는 계정입니다."}, status.HTTP_400_BAD_REQUEST)

        else:
            user = CustomUser.objects.get(email=email_post)
            if user.last_confirm_request > datetime.datetime.now() - datetime.timedelta(days=3):
                # last_request_day = user.last_confirm_request.strftime('%Y-%m-%d %H:%M')
                user.last_confirm_request
                return Response({"detail": f"최근 3일 이내 이미 승인 요청을 하였습니다."}, status.HTTP_400_BAD_REQUEST)
            else:            
                try:
                    email = make_email_to_root(request, user)
                    email.send()
                    user.last_confirm_request = datetime.datetime.now()
                    user.save()
                    return Response({"detail": "관리자 승인 요청이 전송되었습니다."})
                except:
                    return Response({"detail": "승인 요청 전송에 실패하였습니다."}, status.HTTP_400_BAD_REQUEST)



# 계정 인증 상태 확인해주는 API
class CheckEmailStatus(APIView):    
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email_post = request.data["email"]

        try: 
            email_user = EmailAddress.objects.get(email=email_post)
            user = CustomUser.objects.get(email=email_post)

            if email_user.verified:   
                data = "user_and_root"
            elif user.email_verified:
                data = "user_only"
            else:
                data = "not_verified"
        except:
            data = "wrong_address"


        return Response(data)