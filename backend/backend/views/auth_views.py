from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..serializers.auth_serializer import (
    LoginResponseSerializer,
    LoginSerializer,
    RegisterSerializer,
)


class RegisterView(APIView):
    @swagger_auto_schema(
        operation_description="Register as a new user and member",
        request_body=RegisterSerializer,
        responses={201: RegisterSerializer},
    )
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
    @swagger_auto_schema(
        operation_description="Login with username or email and password",
        request_body=LoginSerializer,
        responses={200: LoginResponseSerializer},
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            response_data = {
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token),
                "user": user,
            }
            response_serializer = LoginResponseSerializer(response_data)
            return Response(response_serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
