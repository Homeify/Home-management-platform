# registers endpoints

from rest_framework.decorators import api_view, authentication_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework_simplejwt.models import TokenUser
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from homeify.authentication import SessionCsrfExemptAuthentication
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework import permissions


# Register API


class RegisterAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serialized = RegisterSerializer(request.data)
        try:
            validated = serialized.validate(request.data)
            serialized.create(validated)
        except Exception as e:
            content = {'message': f'Register error. {e}'}
            return Response(data=content, status=status.HTTP_406_NOT_ACCEPTABLE)
        content = {'message': 'User succesfully added.'}
        return Response(data=content, status=status.HTTP_201_CREATED)


class LogoutAPI(generics.GenericAPIView):
    # TO DO
    def post(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        access_token_obj = AccessToken(token)
        user_id = access_token_obj['user_id']
        tokens = OutstandingToken.objects.filter(user_id=user_id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)
        return Response(data={"message": "User succesfully logout"}, status=status.HTTP_200_OK)


class EditUsernameAPI(generics.GenericAPIView):
    def patch(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        access_token_obj = AccessToken(token)
        user_id = access_token_obj['user_id']
        user = CustomUser.objects.get(id=user_id)
        try:
            username = request.data['username']
            min_chars = 3
            if len(username) > min_chars:
                user.username = username
                user.save()
                content = {'message': 'Username successfully updated.'}
                return Response(data=content, status=status.HTTP_200_OK)
            else:
                content = {'message': f"Username too short. At least {min_chars} characters required."}
                return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class EditPasswordAPI(generics.GenericAPIView):
    def patch(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        access_token_obj = AccessToken(token)
        user_id = access_token_obj['user_id']
        user = CustomUser.objects.get(id=user_id)
        try:
            password1 = request.data['password1']
            password2 = request.data['password2']
            if password1 == password2:
                try:
                    validate_password(password1)
                    user.set_password(password1)
                    user.save()
                    content = {'message': 'Password successfully updated.'}
                    return Response(data=content, status=status.HTTP_200_OK)
                except Exception as e:
                    content = {'message': e}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
            else:
                content = {'message': 'Passwords don\'t match'}
                return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
