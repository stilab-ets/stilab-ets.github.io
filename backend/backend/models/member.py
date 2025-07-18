import uuid

from django.contrib.auth.models import User
from django.db import models


class Member(models.Model):
    class MemberStatus(models.TextChoices):
        CURRENT = ("CRT",)
        GRADUATED = "GRD"

    class MemberRole(models.TextChoices):
        PHD_STUDENT = ("PHD",)
        M_STUDENT = "MSC"
        PROFESSOR = "PRO"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    role = models.CharField(max_length=3, choices=MemberRole.choices, null=True)

    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    research_domain = models.CharField(max_length=255, blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    personal_website = models.URLField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=3, choices=MemberStatus.choices, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
