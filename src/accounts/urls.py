from django.urls import include, path, re_path
from .views import CustomConfirmEmailView, ResendMail, account_activate_from_root
from django.views.generic import TemplateView, RedirectView

urlpatterns = [

    # dj-rest-auth API urls 불러오기
    path('', include('dj_rest_auth.urls')),  

    # User가 1차로 계정 이메일 인증 - dj-rest-auth registration보다 앞에 위치해야 함
    re_path(
        r'^register/account-confirm-email/(?P<key>[-:\w]+)/$', CustomConfirmEmailView.as_view(),
        name='account_confirm_user',
    ),

    # 1차 인증 이메일 다시 보내기
    path('account-confirm-user/resend-mail/', ResendMail.as_view(), name='account-confirm-user-resend'),

    # Root user가 2차로 계정 최종 승인
    path('account-activate-root/<int:id>/<str:token>/', account_activate_from_root, name='account_activate_root'),
 
    # dj-rest-auth registration API urls 불러오기
    path('register/', include('dj_rest_auth.registration.urls')),

    # 패스워드 재설정 처리를 시행하는 url (이메일로 전송된 것)
    re_path(r'^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,32})/$',
        RedirectView.as_view(url="confirm"),
        name='password_reset_confirm'),

]