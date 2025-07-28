from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.member import Member
from ..serializers.member_serializer import MemberSerializer, ProfileUpdateSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="Get Profile (Member)",
        operation_description="Get the profile information of the authenticated user",
        responses={200: MemberSerializer},
        tags=["Profile"],
    )
    def get(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = MemberSerializer(member)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_id="Partial Profile Update (Member)",
        operation_description="Partial profile update of the authenticated user",
        request_body=ProfileUpdateSerializer,
        responses={200: MemberSerializer},
        tags=["Profile"],
    )
    def put(self, request):
        return self.patch(request)

    @swagger_auto_schema(
        operation_id="Partial Profile Update (Member)",
        operation_description="Partial profile update of the authenticated user",
        request_body=ProfileUpdateSerializer,
        responses={200: MemberSerializer},
        tags=["Profile"],
    )
    def patch(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
