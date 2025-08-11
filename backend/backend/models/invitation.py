import uuid

from django.db import models
from django.utils import timezone


class Invitation(models.Model):
    STATUS_PENDING = "pending"
    STATUS_EXPIRED = "expired"
    STATUS_REGISTERED = "registered"
    STATUS_CANCELED = "canceled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_EXPIRED, "Expired"),
        (STATUS_REGISTERED, "Registered"),
        (STATUS_CANCELED, "Canceled"),
    ]

    email = models.EmailField()
    role = models.CharField(max_length=50)
    token = models.CharField(max_length=64, unique=True, default=uuid.uuid4().hex)
    sent_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)

    def is_valid(self):
        return self.status == self.STATUS_PENDING and self.expires_at > timezone.now()

    def __str__(self):
        return f"Invitation({self.email}, {self.status})"
