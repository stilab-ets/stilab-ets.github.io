from django.shortcuts import get_list_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.course import Course
from ..serializers.course_serializer import CourseSerializer


class CoursesView(APIView):
    @swagger_auto_schema(
        operation_id="Get Courses",
        operation_description="Retrieves a list of all courses",
        responses={200: CourseSerializer},
        tags=["Course"],
    )
    def get(self, request):
        courses = get_list_or_404(Course)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
