from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..serializers.auth_serializer import LoginSerializer, RegisterSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            member = serializer.save()
            return Response(
                {"message": "User registered successfully", "member_id": member.id},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh_token": str(refresh),
                    "access_token": str(refresh.access_token),
                    "user": {
                        "id": str(user.id),
                        "username": user.username,
                        "email": user.email,
                    },
                }
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
