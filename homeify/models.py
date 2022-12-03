from django.db import models
from django.contrib.auth.models import AbstractUser


# holds definitions for our modules (classes)

class CustomUser(AbstractUser):
    # additional fields added to the default user object
    image_url = models.URLField(default=None)


class HomeGroup(models.Model):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=255)
    code = models.CharField(max_length=10, editable=False)
    members = models.ManyToManyField(CustomUser, through='Membership')

    def __str__(self):
        return self.name


class Membership(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(HomeGroup, on_delete=models.CASCADE)
    date_joined = models.DateField()
    awards = models.PositiveIntegerField(default=0)  # those are awards received by a user in a group
    # to discuss if we want to add badges on user profile
    owner = models.BooleanField(default=False)

    def __str__(self):
        return '(' + self.group.name + ' - ' + self.user.username + ')'
