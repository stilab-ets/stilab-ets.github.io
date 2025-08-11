import secrets

from config.settings import EMAIL_HOST_USER, FRONTEND_URL
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.models.invitation import Invitation
from backend.serializers.invitation_serializer import InvitationSerializer

from ..serializers.delete_serializer import (
    DeleteResponseSerializer,
)


class ValidateInvitationTokenInputSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField()


class SendMailInvitationInputSerializer(serializers.Serializer):
    email = serializers.EmailField()


class BooleanResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField(required=False)
    valid = serializers.BooleanField(required=False)


class ValidateInvitationTokenView(APIView):
    @swagger_auto_schema(
        request=ValidateInvitationTokenInputSerializer,
        responses=BooleanResponseSerializer,
        summary="Validate invitation token",
        tags=["Invitations"],
    )
    def post(self, request):
        serializer = ValidateInvitationTokenInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        token = serializer.validated_data["token"]

        try:
            invitation = Invitation.objects.get(email=email, token=token)
            valid = invitation.is_valid()
        except Invitation.DoesNotExist:
            valid = False

        return Response({"valid": valid})


class SendMailInvitationView(APIView):
    @swagger_auto_schema(
        request=SendMailInvitationInputSerializer,
        responses=BooleanResponseSerializer,
        summary="Send mail invitation",
        tags=["Invitations"],
    )
    def post(self, request):
        serializer = SendMailInvitationInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        token = secrets.token_urlsafe(32)
        expires_at = timezone.now() + timezone.timedelta(days=7)

        invitation = Invitation.objects.create(email=email, role="user", token=token, expires_at=expires_at)

        register_url = f"{FRONTEND_URL}/register?token={token}&email={email}"
        context = {"register_url": register_url}

        try:
            text_content = render_to_string(
                "templates/emails/invitation.txt",
                context=context,
            )

            html_content = render_to_string(
                "templates/emails/invitation.html",
                context=context,
            )

            msg = EmailMultiAlternatives(
                "You're Invited",
                text_content,
                EMAIL_HOST_USER,
                [email],
            )

            msg.attach_alternative(html_content, "text/html")
            msg.send()
            success = True
        except Exception:
            invitation.delete()
            success = False

        return Response({"success": success})


class InvitationAPIView(APIView):
    @swagger_auto_schema(
        responses=InvitationSerializer(many=True),
        summary="List invitations",
        tags=["Invitations"],
    )
    def get(self, request):
        invitations = Invitation.objects.all()
        serializer = InvitationSerializer(invitations, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        request=InvitationSerializer,
        responses={200: InvitationSerializer},
        summary="Update invitation",
        tags=["Invitations"],
    )
    def put(self, request, id=None):
        if id is None:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        invitation = Invitation.objects.filter(id=id).first()
        if not invitation:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = InvitationSerializer(invitation, data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        summary="Delete invitation",
        responses={204: DeleteResponseSerializer},
        tags=["Invitations"],
    )
    def delete(self, request, id=None):
        if id is None:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        invitation = Invitation.objects.filter(id=id).first()
        if not invitation:
            return Response(status=status.HTTP_404_NOT_FOUND)
        invitation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
