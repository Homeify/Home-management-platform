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
from .views import RegisterAPI, EditUsernameAPI, EditPasswordAPI, LogoutAPI, SeeCurrentUserAPI, EditEmailAPI, AddGroup, UserToGroup, AdminUserToGroup, GetGroupsForCurrentUser, GetUsersFromGroup, GroupDetailAPIView, TaskAPI, EditTaskContent, EditTaskPriority, EditTaskDeadline, EditTaskAssignee, EditTaskTitle, EditTaskStatus, EditTaskEmoji, EditTaskColor, GetTasksForGroup
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
    path('groups/add', AddGroup.as_view(), name='add_group'),
    path('groups/user', UserToGroup.as_view(), name='user_to_group'),
    path('groups/user/admin', AdminUserToGroup.as_view(), name='admin_add_user_to_group'),
    path('groups/tasks', GetTasksForGroup.as_view(), name='get_group_tasks'),
    path('groups', GetGroupsForCurrentUser.as_view(), name='get_groups'),
    path('groups/users/<int:group_id>', GetUsersFromGroup.as_view(), name='get_users_for_group'),
    path('groups/<int:pk>', GroupDetailAPIView.as_view()),
    path('groups/users', GetUsersFromGroup.as_view(), name='get_users_for_group'),
    path('tasks/edit/deadline', EditTaskDeadline.as_view(), name='edit_task_deadline'),
    path('tasks/edit/content', EditTaskContent.as_view(), name='edit_task_content'),
    path('tasks/edit/priority', EditTaskPriority.as_view(), name='edit_task_priority'),
    path('tasks/edit/title', EditTaskTitle.as_view(), name='edit_task_title'),
    path('tasks/edit/assignee', EditTaskAssignee.as_view(), name='edit_task_assignee'),
    path('tasks/edit/status', EditTaskStatus.as_view(), name='edit_task_status'),
    path('tasks/edit/color', EditTaskColor.as_view(), name='edit_task_color'),
    path('tasks/edit/emoji', EditTaskEmoji.as_view(), name='edit_task_emoji'),
    path('tasks', TaskAPI.as_view(), name='task'),
    path('', admin.site.urls),
]
