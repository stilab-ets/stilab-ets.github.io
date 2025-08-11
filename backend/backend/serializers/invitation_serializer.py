from rest_framework import serializers

from backend.models import Invitation


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ["id", "email", "role", "sent_at", "status", "expires_at"]
