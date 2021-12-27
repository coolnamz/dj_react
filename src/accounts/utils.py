from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
import six


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, User, timestamp):
        hash_value = six.text_type(User.pk) + six.text_type(User.email) + six.text_type(timestamp)        
        return hash_value

account_activation_token = TokenGenerator()



def make_email_to_root(request, User, to_email="nnam27@gmail.com"):

    # 관리자 2차 인증을 위한 메일 관리자에게 보내기
    user_id = User.pk
    token = account_activation_token.make_token(User)
    activate_url = reverse("account_activate_root", kwargs={"id": user_id, "token": token})
    activate_url = request.build_absolute_uri(activate_url)
    mail_subject = User.first_name + '님의 계정 활성을 위한 메일입니다.'
    message = render_to_string('account/email_confirm_root.html', {
        'user': User,
        'activate_url':activate_url,
    })
    to_email = 'nnam27@gmail.com'
    email = EmailMessage(
        mail_subject, 
        message, 
        to=[to_email]
    )
    return email