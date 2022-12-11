from django.db import models
from django.contrib.auth.models import AbstractUser


# holds definitions for our modules (classes)

class CustomUser(AbstractUser):
    # additional fields added to the default user object
    image_url = models.URLField(blank=False, null=True)


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


class StatusType(models.TextChoices):
    to_do = 'to do'
    in_progress = 'in progress'
    on_hold = 'on hold'
    done = 'done'


class Task(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='author')
    assigned_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assignedUser')
    group = models.ForeignKey(HomeGroup, on_delete=models.CASCADE)
    posted = models.DateTimeField()
    deadline = models.DateTimeField()
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=500)
    reward = models.IntegerField()
    priority = models.IntegerField()
    status = models.CharField(max_length=20, choices=StatusType.choices, default=StatusType.to_do)
    emoji = models.CharField(max_length=50, default='none')
    color = models.CharField(max_length=50, default='white')

    def __str__(self):
        return self.title + " - " + self.group.name

class Comment(models.Model):
    author = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    task = models.ForeignKey(Task, on_delete = models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=500)

    def __str__(self):
        return '{} by {}'.format(self.body, self.author)
