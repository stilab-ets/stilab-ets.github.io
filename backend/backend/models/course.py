import uuid

from django.db import models

from .member import Member


class Course(models.Model):
    class TEACHINGLEVEL(models.TextChoices):
        UNDERGRADUATE = ("UGR",)
        GRADUATE = "GRD"

    class SEMESTER(models.TextChoices):
        FALL = "F"
        SUMMER = "S"
        WINTER = "W"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    url = models.URLField(blank=True, null=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    teacher = models.ForeignKey(Member, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    level = models.CharField(max_length=3, choices=TEACHINGLEVEL.choices, null=True)
    semester = models.CharField(max_length=1, choices=SEMESTER.choices, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
