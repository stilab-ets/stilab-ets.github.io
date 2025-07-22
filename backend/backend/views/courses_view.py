from django.shortcuts import get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.course import Course
from ..serializers.course_serializer import CourseSerializer


class CoursesView(APIView):
    def get(self, request):
        courses = get_list_or_404(Course)
        serializer = CourseSerializer(courses)
        return Response(serializer.data, status=status.HTTP_200_OK)
