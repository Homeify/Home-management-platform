from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Task
from .views import RegisterAPI, LogoutAPI, SeeCurrentUserAPI, TaskAPI, AddGroup, UpdateTaskAPI
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


class TaskAPIViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.username = "Marcel"
        self.last_name = "Snow"
        self.first_name = "John"
        self.email = "john@snow.com"
        self.password1 = "you_know_nothing"
        self.password2 = "you_know_nothing"
        self.register_url = reverse("register")
        self.login_url = reverse("token_obtain_pair")
        self.user_url = reverse('see_current_user')
        self.user_view = SeeCurrentUserAPI.as_view()
        self.register_view = RegisterAPI.as_view()
        self.login_view = TokenObtainPairView.as_view()
        self.register()
        self.auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + self.login()
        }
        self.group_id = self.create_group()
        self.user_id = self.viewUser()

    def register(self):
        data = {"username": self.username,
                "last_name": self.last_name,
                "first_name": self.first_name,
                "email": self.email,
                "password1": self.password1,
                "password2": self.password2,
                }
        request = self.factory.post(self.register_url, data)
        self.register_view(request)

    def viewUser(self):
        request = self.factory.get(self.user_url, **self.auth_headers)
        response = self.user_view(request)
        return response.data.get("id")

    def login(self):
        data = {
            "username": self.username,
            "password": self.password1
        }
        request = self.factory.post(self.login_url, data)
        response = self.login_view(request)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        access_token = response.data.get('access')
        self.assertTrue(access_token is not None, "access token not found in body")
        return access_token

    def create_group(self):
        data = {"name": "test new group",
                "description": "hello group"}
        view = AddGroup.as_view()
        url = reverse("add_group")
        request = self.factory.post(url, data, **self.auth_headers)
        response = view(request)
        return response.data.get("id")

    def test_create_task_no_group(self):
        data = {"group_id": "21",
                "deadline": "2022-12-12 10:00",
                "title": "Water the plants",
                "content": "all the plants in the garden",
                "reward": "3",
                "priority": "1",
                "status": "to do"}
        view = TaskAPI.as_view()
        url = reverse("task")
        request = self.factory.post(url, data, **self.auth_headers)
        response = view(request)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual("Group not found", response.data.get("message"))

    def create_task(self):
        data = {"assigned_user_id": self.user_id,
                "group_id": str(self.group_id),
                "deadline": "2022-12-20 10:00",
                "title": "Water the plants",
                "content": "all the plants in the garden",
                "reward": "3",
                "priority": "1",
                "status": "todo"}
        view = TaskAPI.as_view()
        url = reverse("task")
        request = self.factory.post(url, data, **self.auth_headers)
        response = view(request)
        return response.data["message"]

    def test_create_task(self):
        response = self.create_task()
        self.assertEqual(self.user_id, response["author_id"])
        self.assertEqual(self.user_id, response["assigned_user_id"])

    def test_create_task_old_deadline(self):
        data = {"assigned_user_id": self.user_id,
                "group_id": str(self.group_id),
                "deadline": "2021-12-20 10:00",
                "title": "Water the plants",
                "content": "all the plants in the garden",
                "reward": "3",
                "priority": "1",
                "status": "todo"}
        view = TaskAPI.as_view()
        url = reverse("task")
        request = self.factory.post(url, data, **self.auth_headers)
        response = view(request)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual("Incorrect deadline value, must be greater than current datetime",
                         response.data.get("message"))

    def test_create_task_wrong_date_format(self):
        data = {"assigned_user_id": self.user_id,
                "group_id": str(self.group_id),
                "deadline": "10:00 2021-12-20 ",
                "title": "Water the plants",
                "content": "all the plants in the garden",
                "reward": "3",
                "priority": "1",
                "status": "todo"}
        view = TaskAPI.as_view()
        url = reverse("task")
        request = self.factory.post(url, data, **self.auth_headers)
        response = view(request)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual("Incorrect datetime format, should be YYYY-MM-DD HH:MM",
                         response.data.get("message"))

    def test_get_task(self):
        task_response = self.create_task()
        task_id = task_response["id"]
        view = UpdateTaskAPI.as_view()
        url = "tasks/"
        request = self.factory.get(url, **self.auth_headers)
        response = view(request, pk=task_id)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqualsField(response.data, task_response, "id")
        self.assertEqualsField(response.data, task_response, "author_id")
        self.assertEqualsField(response.data, task_response, "group_id")
        self.assertEqualsField(response.data, task_response, "reward")
        self.assertEqualsField(response.data, task_response, "priority")
        self.assertEqualsField(response.data, task_response, "status")
        self.assertEqualsField(response.data, task_response, "color")

    def assertEqualsField(self, d1, d2, field):
        self.assertEqual(d1[field], d2[field])

    def test_update_task(self):
        new_status = "onhold"
        data = {"status": new_status}
        task_response = self.create_task()
        task_id = task_response["id"]
        view = UpdateTaskAPI.as_view()
        url = "tasks/"
        request = self.factory.patch(url, data, **self.auth_headers)
        response = view(request, pk=task_id)
        print(response.data)
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertEqual(response.data["status"], new_status)

    def test_update_nonexistant_task(self):
        task_id = 123
        view = UpdateTaskAPI.as_view()
        url = "tasks/"
        request = self.factory.patch(url, **self.auth_headers)
        response = view(request, pk=task_id)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
