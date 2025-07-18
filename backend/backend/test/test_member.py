from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient

import pytest

from backend.models.member import Member


@pytest.mark.django_db
def test_get_members_list():
    client = APIClient()

    # Create a test user and member
    user = User.objects.create_user(username="testuser", password="testpass")
    Member.objects.create(
        first_name="John",
        last_name="Doe",
        role="PRO",
        user=user,
    )

    url = reverse("member-list")
    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert len(response.data) == 1
    assert response.data[0]["first_name"] == "John"
    assert response.data[0]["last_name"] == "Doe"
    assert response.data[0]["role"] == "PRO"
    assert "user" in response.data[0]
    assert response.data[0]["user"]["username"] == "testuser"
