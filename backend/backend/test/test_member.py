import uuid

import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from backend.models.member import Member

pytestmark = pytest.mark.django_db


@pytest.fixture
def member_url():
    return reverse("member-list")


@pytest.mark.django_db
def test_get_members_list(member_url):
    client = APIClient()
    user = User.objects.create_user(username="testuser", password="testpass")
    Member.objects.create(
        first_name="John",
        last_name="Doe",
        role="PRO",
        user=user,
    )

    response = client.get(member_url)

    assert response.status_code == 200
    assert isinstance(response.data, list)
    assert len(response.data) == 1
    assert response.data[0]["first_name"] == "John"
    assert response.data[0]["last_name"] == "Doe"
    assert response.data[0]["role"] == "PRO"
    assert "user" in response.data[0]
    assert response.data[0]["user"]["username"] == "testuser"


@pytest.mark.django_db
def test_member_post_success(member_url):
    admin_user = User.objects.create_superuser(username="admin", email="admin@example.com", password="adminpass")
    client = APIClient()
    client.force_authenticate(user=admin_user)
    data = {
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "phone": "1234567890",
        "biography": "Researcher in AI.",
        "research_domain": "Artificial Intelligence",
        "image_url": "https://example.com/photo.jpg",
        "github_url": "https://github.com/janedoe",
        "linkedin_url": "https://linkedin.com/in/janedoe",
        "stackoverflow_url": "https://stackoverflow.com/users/123456/janedoe",
        "twitter_x_url": "https://x.com/janedoe",
        "google_scholar_url": "https://scholar.google.ca/citations?user=ASFF153etgf=en",
        "dblp_url": "https://dblp.org/pid/73/6919-1.html",
        "personal_website": "https://janedoe.dev",
        "role": "MSC",
        "status": "CRT",
    }

    response = client.post(member_url, data, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert Member.objects.filter(email="jane.doe@example.com").exists()
    member = Member.objects.get(email="jane.doe@example.com")
    assert member.first_name == "Jane"
    assert member.role == "MSC"


@pytest.mark.django_db
def test_admin_can_delete_member(member_url):
    admin_user = User.objects.create_user(username="admin", password="admin123", is_staff=True)
    client = APIClient()
    client.force_authenticate(user=admin_user)

    member = Member.objects.create(
        id=uuid.uuid4(),
        first_name="John",
        last_name="Doe",
        role=Member.MemberRole.PHD_STUDENT,
        status=Member.MemberStatus.CURRENT,
    )

    response = client.delete(member_url, data={"id": str(member.id)}, format="json")

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Member.objects.filter(id=member.id).exists()


@pytest.mark.django_db
def test_member_put_success(member_url):
    admin_user = User.objects.create_user(username="admin", password="adminpass", is_staff=True)
    member = Member.objects.create(
        first_name="John",
        last_name="Doe",
        email="john@example.com",
    )
    client = APIClient()
    client.force_authenticate(user=admin_user)

    payload = {
        "id": str(member.id),
        "last_name": "Smith",
        "phone": "456-789-1234",
        "biography": "biography test",
        "status": "GRD",
    }

    response = client.put(member_url, payload, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data["first_name"] == "John"
    assert response.data["last_name"] == "Smith"
    assert response.data["email"] == "john@example.com"
    assert response.data["phone"] == "456-789-1234"
    assert response.data["biography"] == "biography test"
    assert response.data["status"] == "GRD"


@pytest.mark.django_db
def test_member_put_missing_id(member_url):
    admin_user = User.objects.create_user(username="admin", password="adminpass", is_staff=True)
    client = APIClient()
    client.force_authenticate(user=admin_user)

    response = client.put(member_url, {"first_name": "No ID"}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "id" in response.data["error"].lower()


@pytest.mark.django_db
def test_member_put_unauthorized(member_url):
    client = APIClient()
    member = Member.objects.create(first_name="John", last_name="Doe")
    response = client.put(member_url, {"id": str(member.id), "first_name": "Updated"}, format="json")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
