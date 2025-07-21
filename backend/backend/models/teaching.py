import uuid

from django.db import models

from ..models import Member


class Teaching(models.Model):
    class TeachingLevel(models.TextChoices):
        UNDERGRADUATE = ("UGR",)
        GRADUATE = "GRD"

    class SEMESTER(models.TextChoices):
        FALL = ("FALL",)
        SUMMER = ("SMMR",)
        WINTER = "WNTR"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    url = models.URLField(blank=True, null=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    teacher = models.ForeignKey(Member, on_delete=models.CASCADE)
    code = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.title
