from rest_framework import serializers

from ..models.course import Course
from ..models.member import Member
from ..serializers.member_serializer import MemberSerializer


class CourseSerializer(serializers.ModelSerializer):
    teacher = MemberSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(queryset=Member.objects.all(), source="teacher", write_only=True)

    class Meta:
        model = Course
        fields = "__all__"
