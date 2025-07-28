from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.publication import Publication
from ..serializers.delete_serializer import DeleteSerializer
from ..serializers.publication_serializer import PublicationSerializer


class PublicationListAPI(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    @swagger_auto_schema(
        operation_id="Get Publications",
        operation_description="Retrieves a list of all publications",
        responses={200: PublicationSerializer},
        tags=["Publication"],
    )
    def get(self, request):
        publications = Publication.objects.all()
        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="Create Publication",
        operation_description="Creates a new publication",
        responses={201: PublicationSerializer},
        tags=["Publication"],
    )
    def post(self, request):
        # Check if a publication with the same ID or citekey already exists
        existing = Publication.objects.filter(id=request.data.get("id")) | Publication.objects.filter(citekey=request.data.get("citekey"))
        if existing.exists():
            return Response(
                {"error": "A publication with this ID or citekey already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = PublicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Update Publication",
        operation_description="Update a publication",
        responses={200: PublicationSerializer},
        tags=["Publication"],
    )
    def put(self, request):
        existing = Publication.objects.filter(id=request.data.get("id"))

        if not existing.exists():
            return Response(
                {"error": "The publication you are trying to update does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        publication = existing.first()
        serializer = PublicationSerializer(instance=publication, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Delete Publication",
        operation_description="Deletes a publication",
        responses={204: DeleteSerializer},
        tags=["Publication"],
    )
    def delete(self, request):
        publication = get_object_or_404(Publication, id=request.data.get("id"))
        publication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
