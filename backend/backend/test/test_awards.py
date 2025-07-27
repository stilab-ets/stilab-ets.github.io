import logging
from unittest.mock import MagicMock, patch

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

LOGGER = logging.getLogger(__name__)

pytestmark = pytest.mark.django_db
client = APIClient()

LOGGER = logging.getLogger(__name__)


@pytest.fixture
def awards_url():
    return reverse("awards")


@patch("backend.views.awards_view.AwardSerializer")
@patch("backend.views.awards_view.get_list_or_404")
def test_awards_get_success(mock_get_object, mock_serializer, awards_url):
    mock_award = MagicMock()
    mock_get_object.return_value = mock_award

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.data = [{"title": "Dev", "url": "Test", "year": 2025, "organization": "test"}]
    mock_serializer.return_value = mock_serializer_instance

    response = client.get(awards_url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["title"] == "Dev"
    mock_get_object.assert_called_once()
    mock_serializer.assert_called_once_with(mock_award, many=True)


@patch("backend.views.awards_view.AwardSerializer")
@patch("backend.views.awards_view.Award")
def test_awards_post_success(mock_award_model, mock_serializer, awards_url):
    mock_queryset_1 = MagicMock()
    mock_queryset_2 = MagicMock()
    mock_combined_queryset = MagicMock()

    # Each filter call returns a separate mock
    mock_award_model.objects.filter.side_effect = [mock_queryset_1, mock_queryset_2]

    # The OR operation between querysets returns a combined queryset mock
    mock_queryset_1.__or__.return_value = mock_combined_queryset
    mock_combined_queryset.exists.return_value = False

    mock_award_instance = MagicMock()
    mock_serializer_instance = MagicMock()

    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.save.return_value = mock_award_instance
    mock_serializer_instance.data = {"title": "Dev", "url": "Test", "year": 2025, "organization": "test"}
    mock_serializer.return_value = mock_serializer_instance

    mock_award_model.objects.create.return_value = mock_award_instance

    data = {"title": "Dev", "url": "Test", "year": 2025, "organization": "test"}

    client.force_authenticate(user=MagicMock())
    response = client.post(awards_url, data, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "Dev"

    assert mock_award_model.objects.filter.call_count == 2
    mock_combined_queryset.exists.assert_called_once()

    mock_serializer.assert_called_once_with(data=data)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.awards_view.AwardSerializer")
@patch("backend.views.awards_view.Award")
def test_awards_put_success(mock_award_model, mock_serializer, awards_url):
    mock_queryset_1 = MagicMock()
    mock_queryset_2 = MagicMock()
    mock_combined_queryset = MagicMock()

    mock_award_model.objects.filter.side_effect = [mock_queryset_1, mock_queryset_2]
    mock_queryset_1.__or__.return_value = mock_combined_queryset
    mock_combined_queryset.exists.return_value = True

    mock_award_instance = MagicMock()
    mock_combined_queryset.first.return_value = mock_award_instance

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.save.return_value = mock_award_instance
    mock_serializer_instance.data = {"title": "Dev", "url": "Test", "year": 2025, "organization": "test"}
    mock_serializer.return_value = mock_serializer_instance

    data = {"id": 1, "title": "Dev", "url": "Test", "year": 2025, "organization": "test"}

    client.force_authenticate(user=MagicMock())
    response = client.put(awards_url, data, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data["title"] == "Dev"

    assert mock_award_model.objects.filter.call_count == 2
    mock_combined_queryset.exists.assert_called_once()
    mock_combined_queryset.first.assert_called_once()

    mock_serializer.assert_called_once_with(instance=mock_award_instance, data=data)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.awards_view.get_object_or_404")
def test_awards_delete_success(mock_get_object_or_404, awards_url):
    mock_award_instance = MagicMock()
    mock_get_object_or_404.return_value = mock_award_instance

    data = {"id": "1", "title": "Dev", "url": "Test", "year": 2025, "organization": "test"}
    client.force_authenticate(user=MagicMock())
    response = client.delete(awards_url, data, format="json")

    assert response.status_code == status.HTTP_204_NO_CONTENT

    mock_get_object_or_404.assert_called_once()
    mock_award_instance.delete.assert_called_once()
