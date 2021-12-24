"""aaadir URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from django.urls import path, include, re_path


urlpatterns = [
    re_path('^$', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),

    # 계정 confirm 처리를 시행하는 url (이메일로 전송된 것) - api/auth보다 앞에 위치해야 함
    re_path(
        r'^api/auth/register/account-confirm-email/(?P<key>[-:\w]+)/$', RedirectView.as_view(url="confirm"),
        name='account_confirm_email',
    ),

    path('api/auth/', include('users.urls')),
    path('api/posts/', include('posts.urls')),

    # 패스워드 재설정 처리를 시행하는 url (이메일로 전송된 것)
    re_path(r'^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,32})/$',
        RedirectView.as_view(url="confirm"),
        name='password_reset_confirm'),

    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='react.html')),    
]