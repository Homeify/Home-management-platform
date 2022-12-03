from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken, SlidingToken


class hasToken(BasePermission):
    def has_permission(self, request, view):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]

