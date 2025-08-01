import logging
from unittest.mock import MagicMock, patch

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db
client = APIClient()

LOGGER = logging.getLogger(__name__)


@pytest.fixture
def events_url():
    return reverse("events")


@patch("backend.views.events_view.EventSerializer")
@patch("backend.views.events_view.get_list_or_404")
def test_events_get_success(mock_get_object, mock_serializer, events_url):
    mock_event = MagicMock()
    mock_get_object.return_value = mock_event

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.data = [{"title": "Dev", "domain": "Test"}]
    mock_serializer.return_value = mock_serializer_instance

    response = client.get(events_url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["title"] == "Dev"
    mock_get_object.assert_called_once()
    mock_serializer.assert_called_once_with(mock_event, many=True)


@patch("backend.views.events_view.EventSerializer")
@patch("backend.views.events_view.Event")
def test_events_post_success(mock_event_model, mock_serializer, events_url):
    mock_event_model.objects.filter.return_value.exists.return_value = False

    mock_event_instance = MagicMock()
    mock_serializer_instance = MagicMock()

    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.save.return_value = mock_event_instance
    mock_serializer_instance.data = {
        "title": "New Event",
        "domain": "Test",
        "date": "2025-01-01",
        "description": "desc",
        "participants": [],
    }
    mock_serializer.return_value = mock_serializer_instance

    data = {
        "title": "New Event",
        "domain": "Test",
        "date": "2025-01-01",
        "description": "desc",
        "participants": [],
    }

    client.force_authenticate(user=MagicMock())
    response = client.post(events_url, data, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "New Event"

    mock_event_model.objects.filter.assert_called_once_with(id=None)
    mock_serializer.assert_called_once_with(data=data)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.events_view.EventSerializer")
@patch("backend.views.events_view.Event")
def test_events_put_success(mock_event_model, mock_serializer, events_url):
    mock_queryset_1 = MagicMock()
    mock_queryset_2 = MagicMock()
    mock_combined_queryset = MagicMock()

    mock_event_model.objects.filter.side_effect = [mock_queryset_1, mock_queryset_2]
    mock_queryset_1.__or__.return_value = mock_combined_queryset
    mock_combined_queryset.exists.return_value = True

    mock_event_instance = MagicMock()
    mock_combined_queryset.first.return_value = mock_event_instance

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.save.return_value = mock_event_instance
    mock_serializer_instance.data = {"title": "Updated Event", "domain": "Test", "date": "2025-01-01", "description": "desc"}
    mock_serializer.return_value = mock_serializer_instance

    data = {"id": 1, "title": "Updated Event", "domain": "Test", "date": "2025-01-01", "description": "desc"}

    client.force_authenticate(user=MagicMock())
    response = client.put(events_url, data, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data["title"] == "Updated Event"

    assert mock_event_model.objects.filter.call_count == 2
    mock_combined_queryset.exists.assert_called_once()
    mock_combined_queryset.first.assert_called_once()

    mock_serializer.assert_called_once_with(instance=mock_event_instance, data=data)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.events_view.get_object_or_404")
def test_events_delete_success(mock_get_object_or_404, events_url):
    mock_event_instance = MagicMock()
    mock_get_object_or_404.return_value = mock_event_instance

    data = {"id": "1", "title": "Event", "domain": "Test", "date": "2025-01-01", "description": "desc"}
    client.force_authenticate(user=MagicMock())
    response = client.delete(events_url, data, format="json")

    assert response.status_code == status.HTTP_204_NO_CONTENT

    mock_get_object_or_404.assert_called_once()
    mock_event_instance.delete.assert_called_once()
