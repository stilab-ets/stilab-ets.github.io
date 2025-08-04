from django.db import transaction
from rest_framework import serializers

from ..models.award import Award
from ..models.award_recipient import AwardRecipient
from ..models.member import Member


class AwardRecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwardRecipient
        fields = ["member"]


class AwardSerializer(serializers.ModelSerializer):
    recipients = serializers.SerializerMethodField()

    def get_recipients(self, obj):
        recipients = AwardRecipient.objects.filter(award=obj)
        return AwardRecipientSerializer(recipients, many=True).data

    class Meta:
        model = Award
        fields = ["id", "url", "title", "recipients", "year", "organization"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        recipients = AwardRecipient.objects.filter(award=instance).select_related("member")
        representation["recipients"] = [
            {
                "id": r.member.id,
                "first_name": r.member.first_name,
                "last_name": r.member.last_name,
                "email": r.member.email,
                "role": r.member.role,
            }
            for r in recipients
        ]

        return representation

    def create(self, validated_data):
        with transaction.atomic():
            recipients_data = validated_data.pop("recipients", [])
            award = Award.objects.create(**validated_data)

            for recipient_data in recipients_data:
                member = Member.objects.get(id=recipient_data["id"])
                AwardRecipient.objects.create(award=award, member=member)

        return award

    def update(self, instance, validated_data):
        recipients_data = validated_data.pop("recipients", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        with transaction.atomic():
            instance.save()

            if recipients_data is not None:
                AwardRecipient.objects.filter(award=instance).delete()
                for recipient_data in recipients_data:
                    member = Member.objects.get(id=recipient_data["id"])
                    AwardRecipient.objects.create(award=instance, member=member)

        return instance
