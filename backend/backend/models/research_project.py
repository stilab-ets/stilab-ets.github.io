import uuid

from django.db import models

from ..models.member import Member


class ResearchProject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    leader = models.ForeignKey(Member, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    start_date = models.DateField()
    description = models.TextField()
    # Optional fields
    end_date = models.DateField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    project_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
