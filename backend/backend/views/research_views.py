from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.member import Member
from ..models.research_project import ResearchProject
from ..serializers.delete_serializer import DeleteSerializer
from ..serializers.research_serializer import ResearchSerializer


class ResearchAPI(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    @swagger_auto_schema(
        operation_id="Get Research Projects",
        operation_description="Retrieves a list of all research projects.",
        responses={200: ResearchSerializer},
        tags=["Research"],
    )
    def get(self, request):
        researches = ResearchProject.objects.all()
        serializer = ResearchSerializer(researches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="Create Research Projects",
        operation_description="Creates a new research projects. Authentication required",
        responses={200: ResearchSerializer},
        tags=["Research"],
    )
    def post(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = ResearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(leader=member)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Update Research",
        operation_description="Update a research",
        responses={200: ResearchSerializer},
        tags=["Research"],
    )
    def put(self, request):
        existing = ResearchProject.objects.filter(id=request.data.get("id"))

        if not existing.exists():
            return Response(
                {"error": "The research you are trying to update does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        research = existing.first()
        serializer = ResearchSerializer(instance=research, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Delete research",
        operation_description="Deletes a research",
        responses={204: DeleteSerializer},
        tags=["Research"],
    )
    def delete(self, request):
        research = get_object_or_404(ResearchProject, id=request.data.get("id"))
        research.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
