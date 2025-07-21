from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from ..models.member import Member
from ..serializers.member_serializer import MemberSerializer


class MemberListAPI(ListAPIView):
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
