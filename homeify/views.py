# registers endpoints

from datetime import date, datetime, timezone

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView
)
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken
from .models import Membership, HomeGroup, Task, Comment
from django.utils.dateparse import parse_datetime

from .serializers import *
import re


# Register API


class RegisterAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

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
            serializer = CustomUserSerializer(request.user, context=self.get_serializer_context())
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


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
                output = HomeGroupSerializer(new_group)
                return Response(output.data, status=status.HTTP_201_CREATED)
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
    def get(self, request, group_id):
        if group_id is None:
            return Response(data={'message': "Missing parameter group_id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            group = HomeGroup.objects.get(id=group_id)
        except ObjectDoesNotExist:
            return Response(data={'message': 'Group does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        memberships = Membership.objects.filter(group=group)
        serializer = MemberSerializer(memberships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetGroupsForCurrentUser(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            groupIdx = [membership.group.id for membership in Membership.objects.filter(user=request.user)]
            queryset = HomeGroup.objects.filter(id__in=groupIdx)
            try:
                serializer = HomeGroupSerializer(queryset, many=True, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(data={'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class GroupDetailAPIView(RetrieveUpdateDestroyAPIView):
    """
    Handles the retrieval, update, delete of HomeGroup objects.
    """

    def get_object(self, pk):
        """
        Retrieves a Group object given its identifier pk.
        """
        try:
            return HomeGroup.objects.get(pk=pk)
        except HomeGroup.DoesNotExist as e:
            return Response({"ERROR": str(e)}, status=400)

    def get(self, request, pk, format=None):
        """
        Retrieves a Group given its identifier pk.
        """
        try:
            try:
                token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
                access_token_obj = AccessToken(token)
            except Exception:
                return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

            group = self.get_object(pk)
            serializer = HomeGroupDetailSerializer(group, context={'request': request})
            return Response(serializer.data)
        except Exception as e:
            return Response({"ERROR": str(e)}, status=400)

    def patch(self, request, pk=None):
        """
        Partially updates a Group given its identifier pk.
        """
        try:
            try:
                token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
                access_token_obj = AccessToken(token)
            except Exception:
                return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)
            group = None
            if pk is not None:
                group = self.get_object(pk)
            if group:
                ownerMembership = Membership.objects.filter(group=group, owner=True).first()
                if ownerMembership.user.id != request.user.id:
                    return Response(data={'message': 'Owner-only operation.'}, status=status.HTTP_403_FORBIDDEN)
                serializer = HomeGroupUpsertSerializer(group, data=request.data, partial=True,
                                                       context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                return Response(data=serializer.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"ERROR": str(e)}, status=400)

    def delete(self, request, pk, format=None):
        """
        Deletes a Group given its identifier pk.
        """
        try:
            try:
                token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
                access_token_obj = AccessToken(token)
            except Exception:
                return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)
            group = None
            if pk is not None:
                group = self.get_object(pk)
            if group:
                ownerMembership = Membership.objects.filter(group=group, owner=True).first()
                if ownerMembership.user.id != request.user.id:
                    return Response(data={'message': 'You do not have sufficient permissions.'},
                                    status=status.HTTP_403_FORBIDDEN)
                group.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"ERROR": str(e)}, status=400)


class TaskAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            serializer = TaskSerializer(data=request.data)
            valid, message = self.validateRequest(request, user)

            if not valid:
                return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)

            if serializer.is_valid():
                # create task
                assigned_user_id = request.data['assigned_user_id']
                assigned_user = CustomUser.objects.get(id=assigned_user_id)

                group_id = request.data['group_id']
                group = HomeGroup.objects.get(id=group_id)

                deadline = request.data['deadline']
                title = request.data['title']
                content = request.data['content']
                reward = int(request.data['reward'])
                priority = int(request.data['priority'])

                new_task = Task.objects.create(author=user, assigned_user=assigned_user, group=group,
                                               posted=datetime.now(), deadline=deadline, title=title, content=content,
                                               reward=reward, priority=priority)

                new_task.save()
                serializer_task = TaskSerializer(new_task)
                return Response(data={'message': serializer_task.data}, status=status.HTTP_201_CREATED)
            return Response(data={'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={'message': e}, status=status.HTTP_403_FORBIDDEN)

    def validateRequest(self, request, user):
        group_id = request.data.get('group_id')
        deadline = parse_datetime(request.data.get('deadline'))
        if deadline is None:
            return False, "Incorrect datetime format, should be YYYY-MM-DD HH:MM"

        if group_id is None:
            return False, "Missing parameter group_id"

        try:
            group = HomeGroup.objects.get(id=group_id)
        except ObjectDoesNotExist:
            return False, "Group not found"

        try:
            Membership.objects.get(user=user, group=group)
        except ObjectDoesNotExist:
            return False, "Group not found"

        if deadline < datetime.today():
            return False, "Incorrect deadline value, must be greater than current datetime"

        return True, "Valid request"

    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            group_id = request.data.get("group_id")

            if group_id is None:
                return Response(data={'message': "Missing parameter group_id"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                group = HomeGroup.objects.get(id=group_id)
            except ObjectDoesNotExist:
                return Response(data={'message': 'Group does not exist'}, status=status.HTTP_400_BAD_REQUEST)

            tasks = Task.objects.all().filter(assigned_user=user, group=group)

            list_of_tasks = []

            for task in tasks:
                serializer_task = TaskSerializer(task)
                list_of_tasks.append(serializer_task.data)

            return Response(data={'data': list_of_tasks}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            task_id = request.data.get("task_id")

            if task_id is None:
                return Response(data={'message': "Missing parameter task_id"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                task = Task.objects.get(id=task_id)
                group = HomeGroup.objects.get(id=task.group.id)
                membership = Membership.objects.get(user=user, group=group)

                if task.author == user or membership.owner:
                    task.delete()
                    return Response(data={'message': 'Task succesfully deleted'}, status=status.HTTP_200_OK)

                return Response(data={'message': 'Insufficient permission'}, status=status.HTTP_401_UNAUTHORIZED)

            except ObjectDoesNotExist:
                return Response(data={'message': 'Task does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class EditTaskAssignee(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            try:
                task_id = request.data['task_id']
                assigned_user_id = request.data['assigned_user_id']
                task = Task.objects.get(id=task_id)

                assigned_user = CustomUser.objects.get(id=assigned_user_id)
                group = HomeGroup.objects.get(id=task.group.id)
                Membership.objects.get(user=assigned_user, group=group)

                if task.author != user:
                    return Response(data={'message': 'Insufficient permission'}, status=status.HTTP_401_UNAUTHORIZED)

                task.assigned_user = assigned_user
                task.status = StatusType.to_do
                task.save()
                return Response(data={'message': 'Assignee successfully updated.'}, status=status.HTTP_200_OK)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class GetTasksForGroup(generics.GenericAPIView):
    def get(self, request, group_id):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            if group_id is None:
                return Response(data={'message': "Missing parameter group_id"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                group = HomeGroup.objects.get(id=group_id)
            except ObjectDoesNotExist:
                return Response(data={'message': 'Group does not exist'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                membership = Membership.objects.get(user=user, group=group)
            except ObjectDoesNotExist:
                return Response(data={'message': 'You are not a member of this group'},
                                status=status.HTTP_401_UNAUTHORIZED)

            tasks = Task.objects.all().filter(group=group)

            list_of_tasks = []

            for task in tasks:
                item = {
                    'id': task.id,
                    'author': task.author.get_full_name(),
                    'assigned_user': task.assigned_user.get_full_name(),
                    'posted': task.posted,
                    'deadline': task.deadline,
                    'title': task.title,
                    'content': task.content,
                    'reward': task.reward,
                    'priority': task.priority,
                    'status': task.status,
                    'color': task.color,
                    'emoji': task.emoji
                }

                list_of_tasks.append(item)

            return Response(data={'data': list_of_tasks}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class UpdateTaskAPI(generics.GenericAPIView):
    def patch(self, request, pk):
        if pk is None:
            return Response(data={'message': "Missing parameter task_id"}, status=status.HTTP_400_BAD_REQUEST)

        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        access_token_obj = AccessToken(token)
        user_id = access_token_obj['user_id']
        user = CustomUser.objects.get(id=user_id)
        # validate there is a task
        try:
            task = Task.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response(data={'message': "Nonexistent task"}, status=status.HTTP_400_BAD_REQUEST)

        # validate user is in the group from the task
        try:
            Membership.objects.get(group=task.group, user=user)
        except ObjectDoesNotExist:
            return Response(data={'message': "User doesn't have access to this task"},
                            status=status.HTTP_400_BAD_REQUEST)

        # update task
        # validate date if added
        str_date = request.data.get('deadline')
        if str_date is not None:
            deadline = parse_datetime(str_date)
            if deadline is None:
                return Response(data={"message": "Incorrect datetime format, should be YYYY-MM-DD HH:MM"},
                                status=status.HTTP_400_BAD_REQUEST)

        # validate user if added
        assigned_user_id = request.data.get('assigned_user_id')
        if assigned_user_id is not None:
            try:
                assigned_user = CustomUser.objects.get(id=assigned_user_id)
                Membership.objects.get(group=task.group, user=assigned_user)
                task.assigned_user = assigned_user
            except ObjectDoesNotExist:
                return Response(data={'message': "Wrong user assigned"},
                                status=status.HTTP_400_BAD_REQUEST)

        self.updateUserProfile(task, request.data.get('status'))
        serializer = TaskSerializer(task, data=request.data, partial=True,
                                    context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        try:
            task = Task.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response(data={'message': "Nonexistent task"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = TaskSerializer(task, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def updateUserProfile(self, task, new_status):
        if new_status is not None and task.status != 'done' and new_status == 'done':
            # update membership
            membership = Membership.objects.get(group=task.group, user=task.assigned_user)
            membership.awards += task.reward
            membership.save()


class DeclineTask(generics.GenericAPIView):
    def post(self, request, pk):
        if pk is None:
            return Response(data={'message': "Missing parameter task_id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            task = Task.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response(data={'message': "Nonexistent task"}, status=status.HTTP_400_BAD_REQUEST)

        # verify if user has enough points to decline task
        membership = Membership.objects.get(user=task.assigned_user, group=task.group)
        if membership.awards >= task.reward and task.status != 'done':
            membership.awards -= task.reward
            membership.save()
            task.assigned_user = None
            task.save()
            return Response(data={'message': "Successfully declined task"}, status=status.HTTP_200_OK)

        return Response(data={'message': "User doesn't have enough points to decline this task"},
                        status=status.HTTP_400_BAD_REQUEST)


class CommentAPI(generics.GenericAPIView):
    def post(self, request):

        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id) #Select this user as master of comment.
            serializer = CommentSerializer(data=request.data)

            if serializer.is_valid():
                #Get context
                body = request.data['body']
                task = Task.objects.get(id=request.data['task_id'])

                #Create comment
                new_comment = Comment.objects.create(author=user, body=body, task=task, date_posted=datetime.now())

                new_comment.save()
                serializer_comment = CommentSerializer(new_comment)
                return Response(data={'message': serializer_comment.data}, status=status.HTTP_201_CREATED)
            return Response(data={'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header on comment'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            task_id = request.data['task_id']

            if task_id is None:
                return Response(data={'message': "Missing parameter task_id"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                task = Task.objects.get(id=task_id)
            except ObjectDoesNotExist:
                return Response(data={'message': 'Task does not exist'}, status=status.HTTP_400_BAD_REQUEST)

            comments = Comment.objects.all().filter(task=task)

            list_of_comments = []

            for com in comments:
                serializer_comment = CommentSerializer(com)
                list_of_comments.append(serializer_comment.data)

            return Response(data={'data': list_of_comments}, status=status.HTTP_200_OK)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            comment_id = request.data['comment_id']

            if comment_id is None:
                return Response(data={'message': "Missing parameter comment_id"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                comment = Comment.objects.get(id=comment_id)
                task = Task.objects.get(id=comment.task_id)

                if comment.author == user or task.author:
                    comment.delete()
                    return Response(data={'message': 'Comment succesfully deleted'}, status=status.HTTP_200_OK)

                return Response(data={'message': 'Insufficient permission'}, status=status.HTTP_401_UNAUTHORIZED)

            except ObjectDoesNotExist:
                return Response(data={'message': 'Comment does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class UpdateCommentAPI(generics.GenericAPIView):
    def patch(self, request, pk):
        if pk is None:
            return Response(data={'message': "Missing parameter comment_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            #Check if comment exists
            try:
                comment = Comment.objects.get(id=pk)
            except ObjectDoesNotExist:
                return Response(data={'message': "Comment does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            #Check if comment is in Task
            try:
                Task.objects.get(id=comment.task_id)
            except ObjectDoesNotExist:
                return Response(data={'message': "No such comment in task"}, status=status.HTTP_400_BAD_REQUEST)

            #Update comment
            try:
                comment_id = request.data['comment_id']
                comment = Comment.objects.get(id=comment_id)

                new_body = request.data['body']
                date_meta = datetime.now()

                if comment.author != user:
                    return Response(data={'message': 'Insufficient permission'}, status=status.HTTP_401_UNAUTHORIZED)

                comment.body = new_body
                comment.date_posted= date_meta
                comment.save()
                return Response(data={'message': 'Comment successfully updated.'}, status=status.HTTP_200_OK)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)