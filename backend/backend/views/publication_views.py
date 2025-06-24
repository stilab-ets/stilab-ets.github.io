from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.publication import Publication
from ..serializers.publication_serializer import PublicationSerializer


class PublicationListAPI(APIView):
    def get(self, request):
        publications = Publication.objects.all()
        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
