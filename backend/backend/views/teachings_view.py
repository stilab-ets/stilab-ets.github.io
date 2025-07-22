from django.shortcuts import get_list_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.teaching import Teaching
from ..serializers.teaching_serializer import TeachingSerializer


class TeachingsView(APIView):
    def get(self, request):
        teachings = get_list_or_404(Teaching)
        serializer = TeachingSerializer(teachings)
        return Response(serializer.data, status=status.HTTP_200_OK)
