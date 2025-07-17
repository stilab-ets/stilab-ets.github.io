from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.member import Member
from ..serializers.member_serializer import MemberSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = MemberSerializer(member)
        return Response(serializer.data)

    def put(self, request):
        return self.patch(request)

    def patch(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = MemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
