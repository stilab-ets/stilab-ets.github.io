from django.db import transaction
from rest_framework import serializers

from ..models.member import Member
from ..models.project_participant import ProjectParticipant
from ..models.research_project import ResearchProject


class LeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchProject
        fields = ["id", "first_name", "last_name", "email"]


class ParticipantSerializer(serializers.Serializer):
    id = serializers.UUIDField()


class ResearchSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, required=False)
    end_date = serializers.DateField(required=False)
    project_url = serializers.URLField(required=False)
    github_url = serializers.URLField(required=False)

    class Meta:
        model = ResearchProject
        fields = [
            "id",
            "title",
            "start_date",
            "end_date",
            "description",
            "project_url",
            "github_url",
            "participants",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        participants = ProjectParticipant.objects.filter(project=instance).select_related("member")

        representation["participants"] = [
            {
                "id": p.member.id,
                "first_name": p.member.first_name,
                "last_name": p.member.last_name,
                "email": p.member.email,
                "role": p.member.role,
            }
            for p in participants
        ]

        leader = instance.leader
        representation["leader"] = {
            "id": leader.id,
            "first_name": leader.first_name,
            "last_name": leader.last_name,
            "email": leader.email,
            "role": leader.role,
        }

        return representation

    def create(self, validated_data):
        members_data = validated_data.pop("participants", [])
        with transaction.atomic():
            project = ResearchProject.objects.create(**validated_data)

            for member_data in members_data:
                member = Member.objects.get(id=member_data["id"])
                ProjectParticipant.objects.create(project=project, member=member)
        return project

    def update(self, instance, validated_data):
        members_data = validated_data.pop("participants", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        with transaction.atomic():
            instance.save()

            if members_data is not None:
                ProjectParticipant.objects.filter(project=instance).delete()

                for member_data in members_data:
                    member = Member.objects.get(id=member_data["id"])
                    ProjectParticipant.objects.create(project=instance, member=member)

        return instance
