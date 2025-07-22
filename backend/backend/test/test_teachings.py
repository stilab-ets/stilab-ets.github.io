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
def teachings_url():
    return reverse("teachings")


@patch("backend.views.teachings_view.TeachingSerializer")
@patch("backend.views.teachings_view.get_list_or_404")
def test_teachings_get_success(mock_get_object, mock_serializer, teachings_url):
    mock_teaching = MagicMock()
    mock_get_object.return_value = mock_teaching

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.data = [{"title": "Dev", "url": "Dev"}]
    mock_serializer.return_value = mock_serializer_instance

    response = client.get(teachings_url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["title"] == "Dev"
    mock_get_object.assert_called_once()
    mock_serializer.assert_called_once_with(mock_teaching)
