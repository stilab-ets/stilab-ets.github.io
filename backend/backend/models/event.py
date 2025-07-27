import uuid

from django.contrib.postgres.fields import ArrayField
from django.db import models

from ..models.member import Member


class Event(models.Model):
    class EVENT_DOMAIN(models.TextChoices):
        SEMINAR = "SMN", "seminar"
        WORKSHOP = "WRK", "workshop"
        CONFERENCE = "CNF", "conference"
        DEFENSE = "DFN", "defense"
        MEETING = "MTG", "meeting"
        COLLOQUIUM = "CLL", "colloquium"
        MASTERCLASS = "MST", "masterclass"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    domain = models.CharField(max_length=3, choices=EVENT_DOMAIN, null=True)
    location = models.CharField(max_length=255, null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    description = models.TextField(null=True)
    speaker = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
    registration_url = models.URLField(null=True)
    capacity = models.PositiveIntegerField(null=True, blank=True)
    tags = ArrayField(models.CharField(max_length=50), default=list, blank=True, null=True)

    def __str__(self):
        return self.title
