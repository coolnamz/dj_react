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
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from rest_framework import routers

from labsbx.views import LabsbxViewSet, LabsbxsampleViewSet

router = routers.DefaultRouter()
router.register('labsbx', LabsbxViewSet, basename='labsbx')
router.register('labsbxsample', LabsbxsampleViewSet, basename='labsbxsample')

urlpatterns = [
    re_path('^$', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),

    # API path
    path('auth/', include('accounts.urls')),
    path('api/', include(router.urls)),
    path('api/posts/', include('posts.urls')),
    
    # 그 외 모든 url은 Reactjs로 보냄
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='react.html')),    
]