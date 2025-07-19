import logging

import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient

from backend.models.award import Award
from backend.models.award_recipient import AwardRecipient
from backend.models.member import Member

LOGGER = logging.getLogger(__name__)


@pytest.mark.django_db
def test_get_awards_with_single_recipient():
    client = APIClient()

    user = User.objects.create_user(username="testuser", password="testpass")
    member = Member.objects.create(
        first_name="John",
        last_name="Doe",
        role="PRO",
        user=user,
    )

    award = Award.objects.create(
        url="http://TestAward",
        title="TestAward",
    )

    AwardRecipient.objects.create(member=member, award=award)

    url = reverse("awards")
    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert len(response.data) == 1
    assert response.data[0]["url"] == "http://TestAward"
    assert response.data[0]["title"] == "TestAward"
    assert "recipients" in response.data[0]
    assert len(response.data[0]["recipients"]) == 1
    assert response.data[0]["recipients"][0]["member"]["first_name"] == "John"


@pytest.mark.django_db
def test_get_awards_with_multiple_recipient():
    client = APIClient()

    user = User.objects.create_user(username="testuser", password="testpass")
    member = Member.objects.create(
        first_name="John",
        last_name="Doe",
        role="PRO",
        user=user,
    )

    user2 = User.objects.create_user(username="testuser2", password="testpass")
    member2 = Member.objects.create(
        first_name="John2",
        last_name="Doe2",
        role="PRO",
        user=user2,
    )

    award = Award.objects.create(
        url="http://TestAward",
        title="TestAward",
    )

    AwardRecipient.objects.create(member=member, award=award)

    AwardRecipient.objects.create(member=member2, award=award)

    url = reverse("awards")
    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert len(response.data) == 1
    assert response.data[0]["url"] == "http://TestAward"
    assert response.data[0]["title"] == "TestAward"
    assert "recipients" in response.data[0]
    assert len(response.data[0]["recipients"]) == 2
    assert response.data[0]["recipients"][1]["member"]["first_name"] == "John2"
