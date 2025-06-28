import uuid

from django.db import models

from .member import Member
from .research_project import ResearchProject


class ProjectParticipant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(ResearchProject, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.member} - {self.project}"
