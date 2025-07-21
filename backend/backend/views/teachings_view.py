from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.teaching import Teaching
from ..serializers.teaching_serializer import TeachingSerializer


class TeachingsView(APIView):
    def get(self, request):
        teachings = Teaching.objects.all()
        serializer = TeachingSerializer(teachings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
