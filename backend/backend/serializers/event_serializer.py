from datetime import date

from rest_framework import serializers

from ..models.event import Event
from ..models.event_participant import EventParticipant
from ..models.member import Member
from ..serializers.member_serializer import MemberSerializer


class EventParticipantSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)

    class Meta:
        model = EventParticipant
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField(read_only=True)
    speaker = MemberSerializer(read_only=True)
    speaker_id = serializers.PrimaryKeyRelatedField(queryset=Member.objects.all(), source="speaker", write_only=True)
    is_upcoming = serializers.SerializerMethodField(read_only=True)

    def get_participants(self, obj):
        participants = EventParticipant.objects.filter(event=obj)
        return EventParticipantSerializer(participants, many=True).data

    def get_domain(self, obj):
        return obj.get_domain_display() if obj.domain else None

    def get_is_upcoming(self, obj):
        return obj.date and obj.date > date.today()

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "domain",
            "description",
            "date",
            "participants",
            "location",
            "time",
            "speaker",
            "speaker_id",
            "registration_url",
            "capacity",
            "tags",
            "is_upcoming",
        ]
