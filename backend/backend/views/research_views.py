from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.member import Member
from ..models.research_project import ResearchProject
from ..serializers.research_serializer import ResearchSerializer


class ResearchAPI(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        researches = ResearchProject.objects.all()
        serializer = ResearchSerializer(researches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = ResearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(leader=member)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
