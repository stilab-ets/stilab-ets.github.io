from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from ..models import Member


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        member = Member.objects.create(
            user=user,
            email=validated_data["email"],
        )

        return member

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value


class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data["username_or_email"]
        password = data["password"]

        user = User.objects.filter(email__iexact=identifier).first() or User.objects.filter(username=identifier).first()

        if user is None:
            raise serializers.ValidationError("Invalid username/email or password.")

        user = authenticate(username=user.username, password=password)

        if not user:
            raise serializers.ValidationError("Invalid username/email or password.")

        data["user"] = user
        return data
