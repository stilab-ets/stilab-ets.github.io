from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.member import Member
from ..serializers.member_serializer import CreateMemberSerializer, MemberSerializer


class MemberView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]

    @swagger_auto_schema(
        operation_id="Get Members",
        operation_description="Retrieves a list of all members",
        responses={200: MemberSerializer},
        tags=["Member"],
    )
    def get(self, request):
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="Create Member",
        operation_description="Creates a new member",
        responses={201: CreateMemberSerializer},
        tags=["Member"],
    )
    def post(self, request):
        serializer = CreateMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
