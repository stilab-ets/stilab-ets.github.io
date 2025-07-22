from rest_framework import serializers

from ..models.course import Course
from ..serializers.member_serializer import MemberSerializer


class CourseSerializer(serializers.ModelSerializer):
    teacher = MemberSerializer(read_only=True)

    class Meta:
        model = Course
        fields = "__all__"
