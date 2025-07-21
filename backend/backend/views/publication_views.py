from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.publication import Publication
from ..serializers.publication_serializer import PublicationSerializer


class PublicationListAPI(APIView):
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
