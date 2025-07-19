import uuid

from django.db import models


class Award(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    url = models.URLField(blank=True, null=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    organization = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.title
