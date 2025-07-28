from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.course import Course
from ..serializers.course_serializer import CourseSerializer
from ..serializers.delete_serializer import (
    DeleteRequestSerializer,
    DeleteResponseSerializer,
)


class CoursesView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]

    @swagger_auto_schema(
        operation_id="Get Courses",
        operation_description="Retrieves a list of all courses",
        responses={200: CourseSerializer},
        tags=["Courses"],
    )
    def get(self, request):
        courses = get_list_or_404(Course)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="Create Courses (Admin)",
        operation_description="Creates a new course",
        request_body=CourseSerializer,
        responses={201: CourseSerializer},
        tags=["Courses"],
    )
    def post(self, request):
        existing = Course.objects.filter(id=request.data.get("id")) | Course.objects.filter(citekey=request.data.get("citekey"))

        if existing.exists():
            return Response(
                {"error": "A course with this ID or citekey already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Update Courses (Admin)",
        operation_description="Updates a course",
        request_body=CourseSerializer,
        responses={200: CourseSerializer},
        tags=["Courses"],
    )
    def put(self, request):
        existing = Course.objects.filter(id=request.data.get("id")) | Course.objects.filter(citekey=request.data.get("citekey"))

        if not existing.exists():
            return Response(
                {"error": "The course you are trying to update does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        course = existing.first()
        serializer = CourseSerializer(instance=course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Delete courses (Admin)",
        operation_description="Deletes a course",
        request_body=DeleteRequestSerializer,
        responses={204: DeleteResponseSerializer},
        tags=["Courses"],
    )
    def delete(self, request):
        course = get_object_or_404(Course, id=request.data.get("id"))
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
