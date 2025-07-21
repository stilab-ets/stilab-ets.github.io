from rest_framework import serializers

from ..models.teaching import Teaching
from ..serializers.member_serializer import MemberSerializer


class TeachingSerializer(serializers.ModelSerializer):
    teacher = MemberSerializer(read_only=True)

    class Meta:
        model = Teaching
        fields = "__all__"
