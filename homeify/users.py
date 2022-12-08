from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework import permissions

# Register API


class RegisterAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = RegisterSerializer(request.data)
        try:
            data.validate()
        except:
            content = {'message': 'Register error.'}
            return Response(data=content, status=status.HTTP_406_NOT_ACCEPTABLE)
        data.create()
        content = {'message': 'User succesfully added.'}
        return Response(data=content, status=status.HTTP_201_CREATED)
