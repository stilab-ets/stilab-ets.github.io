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
def courses_url():
    return reverse("courses")


@patch("backend.views.courses_view.CourseSerializer")
@patch("backend.views.courses_view.get_list_or_404")
def test_courses_get_success(mock_get_object, mock_serializer, courses_url):
    mock_course = MagicMock()
    mock_get_object.return_value = mock_course

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.data = [{"title": "Dev", "url": "Dev"}]
    mock_serializer.return_value = mock_serializer_instance

    response = client.get(courses_url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["title"] == "Dev"
    mock_get_object.assert_called_once()
    mock_serializer.assert_called_once_with(mock_course)
