from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from ..models import Member


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)

    role = serializers.CharField(max_length=255)

    # Optional fields
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    biography = serializers.CharField(required=False, allow_blank=True)
    research_domain = serializers.CharField(max_length=255, required=False, allow_blank=True)
    image_url = serializers.URLField(required=False, allow_blank=True)
    github_url = serializers.URLField(required=False, allow_blank=True)
    linkedin_url = serializers.URLField(required=False, allow_blank=True)
    personal_website = serializers.URLField(required=False, allow_blank=True)

    def create(self, validated_data):
        phone = validated_data.pop("phone", "")
        biography = validated_data.pop("biography", "")
        research_domain = validated_data.pop("research_domain", "")
        github_url = validated_data.pop("github_url", "")
        linkedin_url = validated_data.pop("linkedin_url", "")
        personal_website = validated_data.pop("personal_website", "")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        member = Member.objects.create(
            user=user,
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            role=validated_data["role"],
            phone=phone,
            biography=biography,
            research_domain=research_domain,
            github_url=github_url,
            linkedin_url=linkedin_url,
            personal_website=personal_website,
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
