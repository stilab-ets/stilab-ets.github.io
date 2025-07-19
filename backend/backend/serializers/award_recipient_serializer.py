from rest_framework import serializers

from ..models.award_recipient import AwardRecipient
from ..serializers.member_serializer import MemberSerializer


class AwardRecipientSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)

    class Meta:
        model = AwardRecipient
        fields = "__all__"
