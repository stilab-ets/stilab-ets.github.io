from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.award import Award
from ..serializers.award_serializer import AwardSerializer
from ..serializers.delete_serializer import (
    DeleteRequestSerializer,
    DeleteResponseSerializer,
)


class AwardsView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]

    @swagger_auto_schema(
        operation_id="Get Awards",
        operation_description="Retrieves a list of all awards",
        responses={200: AwardSerializer},
        tags=["Awards"],
    )
    def get(self, request):
        awards = get_list_or_404(Award)
        serializer = AwardSerializer(awards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="Create Awards (Admin)",
        operation_description="Creates a new award",
        request_body=AwardSerializer,
        responses={201: AwardSerializer},
        tags=["Awards"],
    )
    def post(self, request):
        existing = Award.objects.filter(id=request.data.get("id")) | Award.objects.filter(citekey=request.data.get("citekey"))

        if existing.exists():
            return Response(
                {"error": "An award with this ID or citekey already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = AwardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Update Awards (Admin)",
        operation_description="Updates an award",
        request_body=AwardSerializer,
        responses={200: AwardSerializer},
        tags=["Awards"],
    )
    def put(self, request):
        existing = Award.objects.filter(id=request.data.get("id")) | Award.objects.filter(citekey=request.data.get("citekey"))

        if not existing.exists():
            return Response(
                {"error": "The award you are trying to update does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        award = existing.first()
        serializer = AwardSerializer(instance=award, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Delete awards (Admin)",
        operation_description="Deletes an award",
        request_body=DeleteRequestSerializer,
        responses={204: DeleteResponseSerializer},
        tags=["Awards"],
    )
    def delete(self, request):
        award = get_object_or_404(Award, id=request.data.get("id"))
        award.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
