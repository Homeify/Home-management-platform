from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import RegisterAPI, LogoutAPI, SeeCurrentUserAPI, AddGroup, GetGroupsForCurrentUser, AdminUserToGroup, \
    GroupDetailAPIView
from rest_framework.test import APIRequestFactory


class UsersAPIViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.username = "john"
        self.last_name = "Snow"
        self.first_name = "John"
        self.email = "john@snow.com"
        self.password1 = "you_know_nothing"
        self.password2 = "you_know_nothing"
        self.register_url = reverse("register")
        self.login_url = reverse("token_obtain_pair")
        self.logout_url = reverse("logout_user")
        self.get_user_url = reverse("see_current_user")
        self.register_view = RegisterAPI.as_view()
        self.login_view = TokenObtainPairView.as_view()
        self.logout_view = LogoutAPI.as_view()
        self.current_user_view = SeeCurrentUserAPI.as_view()

    def post_data(self):
        data = {"username": self.username,
                "last_name": self.last_name,
                "first_name": self.first_name,
                "email": self.email,
                "password1": "you_know_nothing",
                "password2": "you_know_nothing",
                }

        request = self.factory.post(self.register_url, data)
        response = self.register_view(request)

        return response

    def test_valid_register(self):
        response = self.post_data()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_existing_user(self):
        ok = False
        try:
            self.post_data()
            response = self.post_data()
            self.assertEqual(status.HTTP_406_NOT_ACCEPTABLE, response.status_code)
        except Exception:
            ok = True
        self.assertTrue(ok)

    def test_invalid_register(self):
        data = {
            "username": self.username,
            "password1": self.password1
        }
        request = self.factory.post(self.register_url, data)
        response = self.register_view(request)
        self.assertEqual(status.HTTP_406_NOT_ACCEPTABLE, response.status_code)

    def test_login_user(self):
        response = self.post_data()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        data = {
            "username": self.username,
            "password": self.password1
        }

        request = self.factory.post(self.login_url, data)
        response = self.login_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        refresh_token = response.data.get('refresh')
        access_token = response.data.get('access')
        self.assertTrue(refresh_token is not None, "refresh token not found in body")
        self.assertTrue(access_token is not None, "access token not found in body")

    def test_logout(self):
        response = self.post_data()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        data = {
            "username": self.username,
            "password": self.password1
        }

        request = self.factory.post(self.login_url, data)
        response = self.login_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + response.data.get('access')
        }

        request = self.factory.post(self.logout_url, **auth_headers)
        response = self.logout_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_current_user(self):
        response = self.post_data()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        data = {
            "username": self.username,
            "password": self.password1
        }

        request = self.factory.post(self.login_url, data)
        response = self.login_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + response.data.get('access')
        }
        request = self.factory.get(self.get_user_url, **auth_headers)
        response = self.current_user_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.username, response.data.get("username"))
        self.assertEqual(self.email, response.data.get("email"))
        self.assertEqual(self.last_name, response.data.get("last_name"))
        self.assertEqual(self.first_name, response.data.get("first_name"))


class GroupViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.name = "test group"
        self.description = "test group description"
        self.create_group = reverse("add_group")
        self.add_group_view = AddGroup.as_view()
        self.login_url = reverse("token_obtain_pair")
        self.register_url = reverse("register")
        self.login_view = TokenObtainPairView.as_view()
        self.register_view = RegisterAPI.as_view()
        self.get_groups = reverse("get_groups")
        self.get_group_view = GetGroupsForCurrentUser.as_view()
        self.add_user_url = reverse("admin_add_user_to_group")
        self.add_user_view = AdminUserToGroup.as_view()
        self.see_user = reverse("see_current_user")
        self.see_user_view = SeeCurrentUserAPI.as_view()
        self.add_member = reverse("admin_add_user_to_group")
        self.add_member_view = AdminUserToGroup.as_view()
        self.data_register = {"username": "john2",
                              "last_name": "john2",
                              "first_name": "snow2",
                              "email": "email@gmail.com2",
                              "password1": "you_know_nothing2",
                              "password2": "you_know_nothing2",
                              }

        self.data_register_2 = {"username": "john3",
                                "last_name": "john3",
                                "first_name": "snow3",
                                "email": "email@gmail.com3",
                                "password1": "you_know_nothing3",
                                "password2": "you_know_nothing3",
                                }

        self.data_login = {
            "username": "john2",
            "password": "you_know_nothing2"
        }

        self.data_login_2 = {
            "username": "john3",
            "password": "you_know_nothing3"
        }

        req = self.factory.post(self.register_url, self.data_register)
        self.register_view(req)
        req = self.factory.post(self.register_url, self.data_register_2)
        self.register_view(req)
        request = self.factory.post(self.login_url, self.data_login_2)
        login_response = self.login_view(request)
        see_headers = {'HTTP_AUTHORIZATION': 'Bearer ' + login_response.data.get('access')}
        request = self.factory.get(self.see_user, **see_headers)
        response = self.see_user_view(request)
        self.id_user_2 = response.data.get("id")
        request = self.factory.post(self.login_url, self.data_login)
        login_response = self.login_view(request)
        see_headers = {'HTTP_AUTHORIZATION': 'Bearer ' + login_response.data.get('access')}
        request = self.factory.get(self.see_user, **see_headers)
        response = self.see_user_view(request)
        self.id_user_1 = response.data.get("id")

        self.auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + login_response.data.get('access')
        }

    def test_create_group_wrong_method(self):
        request = self.factory.get(self.create_group)
        response = self.add_group_view(request)
        self.assertEqual(status.HTTP_405_METHOD_NOT_ALLOWED, response.status_code)

    def test_create_group_without_login(self):
        request = self.factory.post(self.create_group)
        response = self.add_group_view(request)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def add_group(self):
        data = {
            "name": self.name,
            "description": self.description

        }

        request = self.factory.post(self.create_group, data, **self.auth_headers)
        response = self.add_group_view(request)
        return response

    def test_add_group(self):
        response = self.add_group()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        owner = response.data.get("owner")
        self.assertEqual(owner.get("username"), self.data_login["username"])
        members = response.data.get("members")
        self.assertTrue(len(members) == 1)
        self.assertEqual(members[0]["username"], self.data_login["username"])

        # get group from id

        # update group from id
    def test_get_groups(self):
        request = self.factory.get(self.get_groups, **self.auth_headers)
        response = self.get_group_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_add_member(self):
        response = self.add_group()
        id = response.data.get("id")
        data = {
            "code": id,
            "user_id": self.id_user_2
        }
        request = self.factory.post(self.add_member, data,  **self.auth_headers)
        response = self.add_member_view(request)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        request = self.factory.post(self.add_member, data,  **self.auth_headers)
        response = self.add_member_view(request)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(response.data.get("message"), "User was already part of the group")

        data["user_id"] = 1222221111111111
        request = self.factory.post(self.add_member, data,  **self.auth_headers)
        response = self.add_member_view(request)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(response.data.get("message"), "User not found")

    def remove_user_from_group(self):
        response = self.add_group()
        id = response.data.get("id")
        data = {
            "code": id,
            "user_id": self.id_user_2
        }
        request = self.factory.post(self.add_member, data,  **self.auth_headers)
        response = self.add_member_view(request)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        request = self.factory.delete(self.add_member, data,  **self.auth_headers)
        response = self.add_member_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(response.data.get("message"), "User removed from the group")
        request = self.factory.delete(self.add_member, data,  **self.auth_headers)
        response = self.add_member_view(request)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(response.data.get("message"), "User is not in the group")

    def see_group(self):
        resp = self.add_group()
        group_id = resp.data.id
        url = "groups/"
        req = self.factory.get(url, **self.auth_headers)
        see_group_view = GroupDetailAPIView.as_view()
        resp = see_group_view(req, pk=group_id)
        self.assertEqual(status.HTTP_200_OK, resp.status_code)
        self.assertEqual(group_id, resp.data.get("id"))

    def update_group(self):
        resp = self.add_group()
        group_id = resp.data.id

        data = {
            "name": "new name",
            "description": "new description"

        }

        url = "groups/"
        req = self.factory.post(url, data, **self.auth_headers)
        see_group_view = GroupDetailAPIView.as_view()
        resp = see_group_view(req, pk=group_id)
        self.assertEqual(status.HTTP_200_OK, resp.status_code)
        self.assertEqual(group_id, resp.data.get("id"))
        self.assertEqual(data["name"], resp.data.get("name"))
        self.assertEqual(data["description"], resp.data.get("description"))


