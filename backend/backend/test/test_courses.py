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
    mock_serializer_instance.data = [{"title": "Dev", "url": "Test"}]
    mock_serializer.return_value = mock_serializer_instance

    response = client.get(courses_url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]["title"] == "Dev"
    mock_get_object.assert_called_once()
    mock_serializer.assert_called_once_with(mock_course, many=True)


@patch("backend.views.courses_view.CourseSerializer")
@patch("backend.views.courses_view.Course")
def test_courses_post_success(mock_course_model, mock_serializer, courses_url):
    mock_queryset_1 = MagicMock()
    mock_queryset_2 = MagicMock()
    mock_combined_queryset = MagicMock()

    # Each filter call returns a separate mock
    mock_course_model.objects.filter.side_effect = [mock_queryset_1, mock_queryset_2]

    # The OR operation between querysets returns a combined queryset mock
    mock_queryset_1.__or__.return_value = mock_combined_queryset
    mock_combined_queryset.exists.return_value = False

    mock_course_instance = MagicMock()
    mock_serializer_instance = MagicMock()

    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.save.return_value = mock_course_instance
    mock_serializer_instance.data = {"title": "Dev", "url": "Test"}
    mock_serializer.return_value = mock_serializer_instance

    mock_course_model.objects.create.return_value = mock_course_instance

    data = {"title": "Dev", "url": "Test", "year": 2025, "organization": "test"}

    client.force_authenticate(user=MagicMock())
    response = client.post(courses_url, data, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "Dev"

    assert mock_course_model.objects.filter.call_count == 2
    mock_combined_queryset.exists.assert_called_once()

    mock_serializer.assert_called_once_with(data=data)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.courses_view.CourseSerializer")
@patch("backend.views.courses_view.Course")
def test_courses_put_success(mock_course_model, mock_serializer, courses_url):
    mock_queryset_1 = MagicMock()
    mock_queryset_2 = MagicMock()
    mock_combined_queryset = MagicMock()

    mock_course_model.objects.filter.side_effect = [mock_queryset_1, mock_queryset_2]
    mock_queryset_1.__or__.return_value = mock_combined_queryset
    mock_combined_queryset.exists.return_value = True

    mock_course_instance = MagicMock()
    mock_combined_queryset.first.return_value = mock_course_instance

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.save.return_value = mock_course_instance
    mock_serializer_instance.data = {"title": "Dev", "url": "Test"}
    mock_serializer.return_value = mock_serializer_instance

    data = {"id": 1, "title": "Dev", "url": "Test"}

    client.force_authenticate(user=MagicMock())
    response = client.put(courses_url, data, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert response.data["title"] == "Dev"

    assert mock_course_model.objects.filter.call_count == 2
    mock_combined_queryset.exists.assert_called_once()
    mock_combined_queryset.first.assert_called_once()

    mock_serializer.assert_called_once_with(instance=mock_course_instance, data=data)
    mock_serializer_instance.is_valid.assert_called_once()
    mock_serializer_instance.save.assert_called_once()


@patch("backend.views.courses_view.get_object_or_404")
def test_courses_delete_success(mock_get_object_or_404, courses_url):
    mock_course_instance = MagicMock()
    mock_get_object_or_404.return_value = mock_course_instance

    data = {"id": "1", "title": "Dev", "url": "Test"}
    client.force_authenticate(user=MagicMock())
    response = client.delete(courses_url, data, format="json")

    assert response.status_code == status.HTTP_204_NO_CONTENT

    mock_get_object_or_404.assert_called_once()
    mock_course_instance.delete.assert_called_once()
