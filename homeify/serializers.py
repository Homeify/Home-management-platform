from .models import CustomUser, HomeGroup, Membership, Task, StatusType, Comment
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
    owner = serializers.SerializerMethodField(method_name='get_owner')
    members = serializers.SerializerMethodField(method_name='get_members')
    date_created = serializers.SerializerMethodField(method_name='get_date_created')

    def get_owner(self, obj):
        serializer = CustomUserSerializer(Membership.objects.filter(owner=True).first().user)
        return serializer.data

    def get_members(self, obj):
        userIdx = [membership.user.id for membership in Membership.objects.filter(group=obj)]
        queryset = CustomUser.objects.filter(id__in=userIdx)
        serializer = CustomUserSerializer(queryset, many=True)
        return serializer.data

    def get_date_created(self, obj):
        return Membership.objects.filter(owner=True).first().date_joined

    class Meta:
        model = HomeGroup
        fields = ['id', 'name', 'description', 'owner', 'members', 'date_created']


class HomeGroupDetailSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(required=True, max_length=60)
    description = serializers.CharField(max_length=255)
    owner = serializers.SerializerMethodField(method_name='get_owner')
    members_count = serializers.SerializerMethodField(method_name='get_members_count')

    def get_owner(self, obj):
        serializer = CustomUserSerializer(Membership.objects.filter(group=obj, owner=True).first().user)
        return serializer.data

    def get_members_count(self, obj):
        return Membership.objects.filter(group=obj).count()

    class Meta:
        model = HomeGroup
        fields = ['id', 'name', 'description', 'owner', 'members', 'members_count']


class HomeGroupUpsertSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeGroup
        fields = ('name', 'description')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'image_url')


class MemberSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')

    def get_user(self, obj):
        serializer = CustomUserSerializer(obj.user)
        return serializer.data

    class Meta:
        model = Membership
        fields = ('id', 'awards', 'date_joined', 'owner', 'user')


class TaskSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    group_id = serializers.ReadOnlyField()
    author_id = serializers.ReadOnlyField()
    assigned_user_id = serializers.ReadOnlyField()
    posted = serializers.DateTimeField(required=False, format=None)
    deadline = serializers.DateTimeField(format=None)
    title = serializers.CharField(required=True, min_length=3, max_length=100)
    content = serializers.CharField(min_length=3, max_length=500)
    reward = serializers.IntegerField(required=True, min_value=1)
    priority = serializers.IntegerField(required=True)
    status = serializers.ChoiceField(required=False, choices=StatusType.choices)
    emoji = serializers.CharField(required=False)
    color = serializers.CharField(required=False)
    assigned_user = serializers.SerializerMethodField(method_name='get_user')
    author = serializers.SerializerMethodField(method_name='get_author')

    def get_user(self, obj):
        if obj.assigned_user:
            return obj.assigned_user.get_full_name()
            # serializer = MemberSerializer(Membership.objects.filter(group=obj.group, user=obj.assigned_user).first())
            # return serializer.data
        return None
    
    def get_author(self, obj):
        if obj.author:
            return obj.author.get_full_name()
        return None

    class Meta:
        model = Task
        fields = ['id', 'group_id', 'author_id', 'assigned_user_id', 'posted', 'deadline', 'title', 'content', 'reward',
                  'priority', 'status', 'emoji', 'color', 'assigned_user', 'author']
        extra_kwargs = {
            'posted': {'required': False},
            'status': {'required': False},
            'emoji': {'required': False},
            'color': {'required': False}
        }

class CommentSerializer(serializers.ModelSerializer):
    author_id = serializers.ReadOnlyField()
    task_id = serializers.ReadOnlyField()
    date_posted = serializers.DateTimeField(required=False, format=None)
    body = serializers.CharField(required=True, min_length=2, max_length=500)
    id = serializers.ReadOnlyField()
    author = serializers.ReadOnlyField()

    def get_user(self, obj):
        serializer = CustomUserSerializer(obj.author)
        return serializer.data

    class Meta:
        model = Comment
        fields = ('author_id', 'body', 'task_id', 'date_posted', 'id', 'author')