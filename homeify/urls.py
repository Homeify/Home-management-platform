"""homeify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from .views import RegisterAPI, EditUsernameAPI, EditPasswordAPI, LogoutAPI, SeeCurrentUserAPI, EditEmailAPI
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin', admin.site.urls),
    path('users/register', RegisterAPI.as_view(), name='register'),
    path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/logout', LogoutAPI.as_view(), name='logout_user'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/edit/username', EditUsernameAPI.as_view(), name='edit_username'),  # edit current logged in user id
    path('users/edit/email', EditEmailAPI.as_view(), name='edit_email'),
    path('users/edit/password', EditPasswordAPI.as_view(), name='edit_password'),
    path('users/view/current_user', SeeCurrentUserAPI.as_view(), name='see_current_user'),
    path('', admin.site.urls),
]
