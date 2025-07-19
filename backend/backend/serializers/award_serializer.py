from rest_framework import serializers

from ..models.award import Award
from ..models.award_recipient import AwardRecipient
from ..serializers.award_recipient_serializer import AwardRecipientSerializer


class AwardSerializer(serializers.ModelSerializer):
    recipients = serializers.SerializerMethodField()

    def get_recipients(self, obj):
        recipients = AwardRecipient.objects.filter(award=obj)
        return AwardRecipientSerializer(recipients, many=True).data

    class Meta:
        model = Award
        fields = ["id", "url", "title", "recipients"]
