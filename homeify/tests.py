from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient
from .views import RegisterAPI
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
        self.url = reverse("register")
        self.view = RegisterAPI.as_view()

    def post_data(self):
        data = {"username": self.username,
                "last_name": self.last_name,
                "first_name": self.first_name,
                "email": self.email,
                "password1": "you_know_nothing",
                "password2": "you_know_nothing",
                "image_url": None
                }

        request = self.factory.post(self.url, data)
        response = self.view(request)

        return response

    def test_valid_register(self):
        response = self.post_data()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    # def test_exsting_user(self):
    #     # @TODO
