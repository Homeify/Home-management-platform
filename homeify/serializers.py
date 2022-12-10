from .models import CustomUser, HomeGroup, Task, StatusType
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


# maps python objects to json


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    username = serializers.Field(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name',
                   'password1', 'password2']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        try:
            user = CustomUser.objects.create(
                username=validated_data['username'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )

            user.set_password(validated_data['password1'])
            user.save()
            return user
        except Exception as e:
          print(e)  
            
class HomeGroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(required=True, max_length=60)
    description = serializers.CharField(max_length=255)

    class Meta:
        model = HomeGroup
        fields = ['id', 'name', 'description']


class TaskSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    group_id = serializers.ReadOnlyField()
    author_id = serializers.ReadOnlyField()
    assigned_user_id = serializers.ReadOnlyField()
    posted = serializers.DateField(required=False)
    deadline = serializers.DateField()
    title = serializers.CharField(required=True, min_length=3, max_length=100)
    content = serializers.CharField(min_length=3,max_length=500)
    reward = serializers.IntegerField(required=True, min_value=1)
    priority = serializers.IntegerField(required=True)
    status = serializers.ChoiceField(required=False, choices=StatusType.choices)
    emoji = serializers.CharField(required=False)
    color = serializers.CharField(required=False)

    class Meta:
        model = Task
        fields = ['id', 'group_id', 'author_id', 'assigned_user_id', 'posted', 'deadline', 'title', 'content', 'reward', 'priority', 'status', 'emoji', 'color']
        extra_kwargs = {
            'posted': {'required': False},
            'status': {'required': False},
            'emoji': {'required': False},
            'color': {'required': False}
        }