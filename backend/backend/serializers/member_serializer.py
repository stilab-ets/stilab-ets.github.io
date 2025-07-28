from rest_framework import serializers

from ..models.member import Member
from ..serializers.user_serializer import UserSerializer


class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Member
        fields = "__all__"


class CreateMemberSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    role = serializers.CharField(max_length=3)

    class Meta:
        model = Member
        exclude = ["user"]


class UpdateMemberSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=True)
    first_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    role = serializers.CharField(max_length=3, required=False, allow_blank=True)

    class Meta:
        model = Member
        exclude = ["user"]


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"
