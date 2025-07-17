from rest_framework import serializers

from ..models.member import Member
from ..serializers.user_serializer import UserSerializer


class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Member
        fields = "__all__"
