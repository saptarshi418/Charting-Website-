"""
URL configuration for chartapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path
from userAcount.views import user_register , login_user,verify_registration_otp,verify_login_otp
from django.urls import include
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("register/", user_register),
    path("login/", login_user),

    path("register/verify-otp/", verify_registration_otp),
    path("login/verify-otp/", verify_login_otp),
    path("token/refresh/", TokenRefreshView.as_view()),

    path("user/", include("userAcount.urls")),
]  
