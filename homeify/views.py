# registers endpoints

from datetime import date

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status

from rest_framework.response import Response
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken

from .models import Membership
from .serializers import *
import re


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
        content = {'message': 'User successfully added.'}
        return Response(data=content, status=status.HTTP_201_CREATED)


class LogoutAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            tokens = OutstandingToken.objects.filter(user_id=user_id)
            # this deletes refresh token based on user_id from access tokens
            for token in tokens:
                t, _ = BlacklistedToken.objects.get_or_create(token=token)
            #  access tokens can't be deleted, so it's recommended that access lifetime should be short
            return Response(data={"message": "User successfully logout"}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class SeeCurrentUserAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            data = self.getUserJson(user)
            return Response(data=data, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def getUserJson(self, user):
        data = {'username': user.username,
                'email': user.email,
                'last_name': user.last_name, 'first_name': user.first_name,
                'profile_img': user.image_url}
        return data


class EditUsernameAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
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
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class EditEmailAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                email = request.data['email']
                if not self.validateEmail(email):
                    content = {'message': 'Wrong email address'}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
                user.email = email
                user.save()
                content = {'message': 'Email successfully updated.'}
                return Response(data=content, status=status.HTTP_200_OK)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def validateEmail(self, email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if re.fullmatch(regex, email):
            return True
        return False


class EditPasswordAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
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
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class AddGroup(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)  # the user that adds the group is the admin
            serializer = HomeGroupSerializer(data=request.data)
            if serializer.is_valid():
                # create group
                name = request.data['name']
                descr = request.data['description']
                code = ''  # @TODO generate code at the moment Id is used maybe we should leave it like that
                new_group = HomeGroup.objects.create(name=name, description=descr, code=code)
                # create membership
                Membership.objects.create(user=user, group=new_group, owner=True,
                                          date_joined=date.today())
                new_group.members.add(user)
                new_group.save()
                return Response(data={'message': 'Group successfully created'}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class UserToGroup(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)  # add current logged in user to group
            valid, message = self.validatePostRequest(request, user)
            if not valid:
                return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)

            # create membership
            Membership.objects.create(user=user, group=message, owner=False,
                                      date_joined=date.today())
            message.members.add(user)
            message.save()
            return Response(data={'message': 'User added to the group'}, status=status.HTTP_201_CREATED)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        access_token_obj = AccessToken(token)
        user_id = access_token_obj['user_id']
        user = CustomUser.objects.get(id=user_id)  # add current logged in user to group
        valid, message = self.validateRequest(request)
        if not valid:
            return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)

        # create membership
        Membership.objects.filter(user=user, group=message).delete()
        message.members.remove(user)
        message.save()
        return Response(data={'message': 'User removed from the group'}, status=status.HTTP_200_OK)

    def validateRequest(self, request):
        code = request.data.get("code")
        if code is None:
            return False, "Missing parameter code"

        try:
            code_numer = int(code)
        except ValueError:
            return False, "Wrong code format"

        try:
            home_group = HomeGroup.objects.get(id=code_numer)
        except ObjectDoesNotExist:
            return False, "Group not found"

        return True, home_group

    def validatePostRequest(self, request, user):
        valid, msg = self.validateRequest(request)
        if not valid:
            return False, msg

        number_of_members_in_group = Membership.objects.filter(user=user, group=msg).count()
        if number_of_members_in_group != 0:
            return False, "User was already part of the group"

        return True, msg


class AdminUserToGroup(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)  # add current logged in user to group
            valid, message = self.validateRequest(request, user)
            if not valid:
                return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)

            user_id_to_add = request.data.get("user_id")
            try:
                requested_user = CustomUser.objects.get(id=user_id_to_add)
            except ObjectDoesNotExist:
                return Response(data={'message': "User not found"}, status=status.HTTP_400_BAD_REQUEST)

            number_of_members_in_group = Membership.objects.filter(user=requested_user, group=message).count()
            print(number_of_members_in_group)
            if number_of_members_in_group != 0:
                return Response(data={'message': "User was already part of the group"},
                                status=status.HTTP_400_BAD_REQUEST)

            # create membership
            Membership.objects.create(user=requested_user, group=message, owner=False,
                                      date_joined=date.today())
            message.members.add(requested_user)
            message.save()
            return Response(data={'message': 'User added to the group'}, status=status.HTTP_201_CREATED)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)  # add current logged in user must be group owner
            valid, message = self.validateRequest(request, user)
            if not valid:
                return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)

            user_id_to_add = request.data.get("user_id")
            try:
                requested_user = CustomUser.objects.get(id=user_id_to_add)
            except ObjectDoesNotExist:
                return Response(data={'message': "User not found"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                Membership.objects.get(user=requested_user, group=message)
            except ObjectDoesNotExist:
                return Response(data={'message': "User is not in the group"}, status=status.HTTP_400_BAD_REQUEST)

            # remove from membership

            Membership.objects.filter(user=requested_user, group=message).delete()
            message.members.remove(requested_user)
            message.save()
            return Response(data={'message': 'User removed from the group'}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def validateRequest(self, request, user):
        code = request.data.get("code")
        requested_user_id = request.data.get("user_id")

        if code is None:
            return False, "Missing parameter code"

        if requested_user_id is None:
            return False, "Missing parameter user_id"

        try:
            code_numer = int(code)
        except ValueError:
            return False, "Wrong code format"

        try:
            home_group = HomeGroup.objects.get(id=code_numer)
        except ObjectDoesNotExist:
            return False, "Group not found"

        try:
            Membership.objects.get(user=user, group=home_group, owner=True)
        except ObjectDoesNotExist:
            return False, "Current user is not group owner"

        return True, home_group


class GetUsersFromGroup(generics.GenericAPIView):
    def get(self, request):
        group_id = request.data.get("group_id")
        if group_id is None:
            return Response(data={'message': "Missing parameter group_id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = HomeGroup.objects.get(id=group_id)
        except ObjectDoesNotExist:
            return Response(data={'message': 'Group does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        memberships = Membership.objects.all().filter(group=group)
        list = []
        for membership in memberships:
            user = membership.user
            item = {'id': user.id,
                    'last_name': user.last_name,
                    'frist_name': user.first_name,
                    'email': user.email}
            list.append(item)
        return Response(data={'data': list}, status=status.HTTP_200_OK)


class GetGroupsForCurrentUser(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            memberships = Membership.objects.all().filter(user=user)
            list = []
            for membership in memberships:
                group = membership.group
                owner = Membership.objects.all().filter(group=group, owner=True).first()
                group = {'id': group.id,
                         'name': group.name,
                         'description': group.description,
                         'owner': owner.user.id}
                list.append(group)
            return Response(data={'data': list}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)
