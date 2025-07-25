from rest_framework import serializers

from ..models.event import Event
from ..models.event_participant import EventParticipant


class EventParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventParticipant
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    def get_participants(self, obj):
        participants = EventParticipant.objects.filter(event=obj)
        return EventParticipantSerializer(participants, many=True).data

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "domain",
            "description",
            "date",
            "participants",
        ]
