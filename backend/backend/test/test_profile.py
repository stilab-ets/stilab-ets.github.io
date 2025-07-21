from unittest.mock import MagicMock, patch

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db
client = APIClient()


@pytest.fixture
def profile_url():
    return reverse("profile")


@patch("backend.views.profile_views.MemberSerializer")
@patch("backend.views.profile_views.get_object_or_404")
def test_profile_get_success(mock_get_object, mock_serializer, profile_url):
    mock_member = MagicMock()
    mock_get_object.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.data = {"first_name": "Dev", "last_name": "Dev"}
    mock_serializer.return_value = mock_serializer_instance

    client.force_authenticate(user=MagicMock())
    response = client.get(profile_url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"first_name": "Dev", "last_name": "Dev"}
    mock_get_object.assert_called_once()
    mock_serializer.assert_called_once_with(mock_member)


@patch("backend.views.profile_views.MemberSerializer")
@patch("backend.views.profile_views.get_object_or_404")
def test_profile_patch_success(mock_get_object, mock_serializer, profile_url):
    mock_member = MagicMock()
    mock_get_object.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.data = {"first_name": "Updated"}
    mock_serializer.return_value = mock_serializer_instance

    client.force_authenticate(user=MagicMock())
    response = client.patch(profile_url, {"first_name": "Updated"}, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"first_name": "Updated"}
    mock_serializer.assert_called_once_with(mock_member, data={"first_name": "Updated"}, partial=True)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.profile_views.MemberSerializer")
@patch("backend.views.profile_views.get_object_or_404")
def test_profile_patch_invalid_data(mock_get_object, mock_serializer, profile_url):
    mock_member = MagicMock()
    mock_get_object.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = False
    mock_serializer_instance.errors = {"first_name": ["This field is required."]}
    mock_serializer.return_value = mock_serializer_instance

    client.force_authenticate(user=MagicMock())
    response = client.patch(profile_url, {"first_name": ""}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "first_name" in response.data


@patch("backend.views.profile_views.MemberSerializer")
@patch("backend.views.profile_views.get_object_or_404")
def test_profile_put_success(mock_get_object, mock_serializer, profile_url):
    mock_member = MagicMock()
    mock_get_object.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.data = {"first_name": "Updated"}
    mock_serializer.return_value = mock_serializer_instance

    client.force_authenticate(user=MagicMock())
    response = client.put(profile_url, {"first_name": "Updated"}, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"first_name": "Updated"}
    mock_serializer.assert_called_once_with(mock_member, data={"first_name": "Updated"}, partial=True)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.profile_views.MemberSerializer")
@patch("backend.views.profile_views.get_object_or_404")
def test_profile_put_invalid_data(mock_get_object, mock_serializer, profile_url):
    mock_member = MagicMock()
    mock_get_object.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = False
    mock_serializer_instance.errors = {"first_name": ["This field is required."]}
    mock_serializer.return_value = mock_serializer_instance

    client.force_authenticate(user=MagicMock())
    response = client.put(profile_url, {"first_name": ""}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "first_name" in response.data
