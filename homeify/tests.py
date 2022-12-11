from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import RegisterAPI, LogoutAPI, SeeCurrentUserAPI
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





