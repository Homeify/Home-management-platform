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
        self.server = "http://127.0.0.1:8000/"

    def test_valid_register(self):
        data = {"username": self.username,
                "last_name": self.last_name,
                "first_name": self.first_name,
                "email": self.email,
                "password1": "you_know_nothing",
                "password2": "you_know_nothing"
                }
        url = reverse('register')
        view = RegisterAPI.as_view()
        request = self.factory.post(url, data)
        response = view(request)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
