from unittest.mock import MagicMock, patch

import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db

client = APIClient()


@pytest.fixture
def register_url():
    return reverse("register")


@pytest.fixture
def login_url():
    return reverse("login")


# Register Tests


@patch("backend.serializers.auth_serializer.User.objects.create_user")
@patch("backend.models.Member.objects.create")
def test_register_success(mock_member_create, mock_user_create, register_url):
    mock_user = MagicMock(spec=User)
    mock_user.username = "dev"
    mock_user.email = "dev@example.com"
    mock_user_create.return_value = mock_user

    mock_member = MagicMock()
    mock_member.id = "some-uuid"
    mock_member_create.return_value = mock_member

    data = {
        "username": "dev",
        "email": "dev@example.com",
        "password": "StrongPass123",
        "first_name": "dev",
        "last_name": "dev",
        "role": "developer",
    }

    response = client.post(register_url, data, format="json")
    assert response.status_code == 201
    assert response.data["message"] == "User registered successfully"
    assert response.data["member_id"] == mock_member.id


@patch("backend.serializers.auth_serializer.User.objects.filter")
def test_register_username_taken(mock_user_filter, register_url):
    mock_user_filter.return_value.exists.return_value = True

    data = {"username": "dev", "email": "dev2@example.com", "password": "StrongPass123"}
    response = client.post(register_url, data, format="json")
    assert response.status_code == 400
    assert "username" in response.data


# Login Tests


@patch("backend.serializers.auth_serializer.authenticate")
@patch("backend.serializers.auth_serializer.User.objects.filter")
def test_login_success_email(mock_user_filter, mock_authenticate, login_url):
    mock_user = MagicMock(spec=User)
    mock_user.username = "dev"
    mock_user.email = "dev@example.com"
    mock_user.id = "some-uuid"
    mock_user.first_name = "dev"
    mock_user.last_name = "dev"
    mock_user.role = "developer"

    mock_authenticate.return_value = mock_user

    data = {
        "username_or_email": "dev@example.com",
        "password": "StrongPass123",
    }

    response = client.post(login_url, data, format="json")
    assert response.status_code == 200
    assert response.data["user"]["username"] == mock_user.username
    assert "access_token" in response.data
    assert "refresh_token" in response.data


@patch("backend.serializers.auth_serializer.authenticate")
@patch("backend.serializers.auth_serializer.User.objects.filter")
def test_login_success_username(mock_user_filter, mock_authenticate, login_url):
    mock_user = MagicMock(spec=User)
    mock_user.username = "dev"
    mock_user.email = "dev@example.com"
    mock_user.id = "some-uuid"
    mock_user.first_name = "dev"
    mock_user.last_name = "dev"
    mock_user.role = "developer"

    mock_authenticate.return_value = mock_user

    data = {
        "username_or_email": "dev",
        "password": "StrongPass123",
    }

    response = client.post(login_url, data, format="json")
    assert response.status_code == 200
    assert response.data["user"]["username"] == mock_user.username
    assert "access_token" in response.data
    assert "refresh_token" in response.data


@patch("backend.serializers.auth_serializer.authenticate")
@patch("backend.serializers.auth_serializer.User.objects.filter")
def test_login_invalid_credentials(mock_user_filter, mock_authenticate, login_url):
    mock_authenticate.return_value = None

    data = {
        "username_or_email": "unknownuser",
        "password": "badpass",
    }

    response = client.post(login_url, data, format="json")
    assert response.status_code == 400
    assert "non_field_errors" in response.data or "detail" in response.data
