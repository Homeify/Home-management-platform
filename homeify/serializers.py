from .models import CustomUser, HomeGroup, Membership
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
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    image_url = serializers.URLField(required=False, default="")

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name',
                  'rewards', 'image_url', 'password1', 'password2']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'image_url': {'required': False}
        }

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            image_url=validated_data['image_url'],
        )

        user.set_password(validated_data['password1'])
        user.save()

        return user


class HomeGroupSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(required=True, max_length=60)
    description = serializers.CharField(max_length=255)
    owner = serializers.SerializerMethodField(method_name='get_owner')
    members = serializers.SerializerMethodField(method_name='get_members')

    def get_owner(self, obj):
        serializer = CustomUserSerializer(Membership.objects.filter(owner = True).first().user)
        return serializer.data
    
    def get_members(self, obj):
        userIdx = [membership.user.id for membership in Membership.objects.filter(group = obj)]
        queryset = CustomUser.objects.filter(id__in = userIdx)
        serializer = CustomUserSerializer(queryset, many=True)
        return serializer.data
    
    class Meta:
        model = HomeGroup
        fields = ['id', 'name', 'description', 'owner', 'members']

class HomeGroupDetailSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(required=True, max_length=60)
    description = serializers.CharField(max_length=255)
    owner = serializers.SerializerMethodField(method_name='get_owner')
    members_count = serializers.SerializerMethodField(method_name='get_members_count')

    def get_owner(self, obj):
        serializer = CustomUserSerializer(Membership.objects.filter(group = obj, owner = True).first().user)
        return serializer.data
    
    def get_members_count(self, obj):
        return Membership.objects.filter(group = obj).count()
    
    class Meta:
        model = HomeGroup
        fields = ['id', 'name', 'description', 'owner', 'members']   


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