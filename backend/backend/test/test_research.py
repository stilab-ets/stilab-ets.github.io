import uuid
from datetime import date
from unittest.mock import ANY, MagicMock, patch

import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from backend.serializers.research_serializer import ResearchSerializer

pytestmark = pytest.mark.django_db
client = APIClient()


@pytest.fixture
def research_url():
    return reverse("research")


@patch("backend.views.research_views.ResearchSerializer")
@patch("backend.views.research_views.ResearchProject.objects.all")
def test_research_get_success(mock_all, mock_serializer, research_url):
    mock_projects = [MagicMock()]
    mock_all.return_value = mock_projects

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.data = [{"title": "Project 1"}]
    mock_serializer.return_value = mock_serializer_instance

    response = client.get(research_url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data == [{"title": "Project 1"}]
    mock_all.assert_called_once()
    mock_serializer.assert_called_once_with(mock_projects, many=True)


@patch("backend.views.research_views.ResearchSerializer")
@patch("backend.views.research_views.get_object_or_404")
def test_research_post_success(mock_get_member, mock_serializer, research_url):
    mock_member = MagicMock()
    mock_get_member.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = True
    mock_serializer_instance.data = {"title": "New Project"}
    mock_serializer.return_value = mock_serializer_instance

    user = MagicMock()
    client.force_authenticate(user=user)

    response = client.post(research_url, {"title": "New Project"}, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "New Project"
    mock_get_member.assert_called_once_with(ANY, user=user)
    mock_serializer_instance.save.assert_called_once_with(leader=mock_member)


@patch("backend.views.research_views.ResearchSerializer")
@patch("backend.views.research_views.get_object_or_404")
def test_research_post_invalid_data(mock_get_member, mock_serializer, research_url):
    mock_member = MagicMock()
    mock_get_member.return_value = mock_member

    mock_serializer_instance = MagicMock()
    mock_serializer_instance.is_valid.return_value = False
    mock_serializer_instance.errors = {"title": ["This field is required."]}
    mock_serializer.return_value = mock_serializer_instance

    client.force_authenticate(user=MagicMock())

    response = client.post(research_url, {}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "title" in response.data
    mock_serializer_instance.save.assert_not_called()


@patch("backend.serializers.research_serializer.Member.objects.get")
@patch("backend.serializers.research_serializer.ProjectParticipant.objects.create")
@patch("backend.serializers.research_serializer.ResearchProject.objects.create")
def test_research_serializer_create_with_participants(mock_project_create, mock_participant_create, mock_member_get):
    mock_member = MagicMock()
    mock_member_get.return_value = mock_member

    mock_project = MagicMock()
    mock_project_create.return_value = mock_project

    participant_id = uuid.uuid4()

    data = {
        "title": "AI Research",
        "start_date": date.today(),
        "description": "Deep learning models",
        "participants": [{"id": participant_id}],
    }

    serializer = ResearchSerializer()
    instance = serializer.create(data)

    mock_project_create.assert_called_once_with(
        title="AI Research",
        start_date=data["start_date"],
        description="Deep learning models",
    )
    mock_member_get.assert_called_once_with(id=participant_id)
    mock_participant_create.assert_called_once_with(project=mock_project, member=mock_member)
    assert instance == mock_project


@patch("backend.serializers.research_serializer.ResearchProject.objects.create")
def test_research_serializer_create_without_participants(mock_project_create):
    mock_project = MagicMock()
    mock_project_create.return_value = mock_project

    data = {
        "title": "Solo Project",
        "start_date": date.today(),
        "description": "Independent research",
        "participants": [],
    }

    serializer = ResearchSerializer()
    instance = serializer.create(data)

    mock_project_create.assert_called_once()
    assert instance == mock_project


@patch("backend.serializers.research_serializer.ProjectParticipant.objects.filter")
def test_research_serializer_to_representation(mock_participant_filter):
    member = MagicMock(id=uuid.uuid4(), first_name="Alice", last_name="Smith", email="a@example.com", role="PI")
    project = MagicMock(id=uuid.uuid4(), title="Test", start_date=date.today(), description="desc", leader=member)

    mock_participant = MagicMock()
    mock_participant.member = member
    mock_participant_filter.return_value.select_related.return_value = [mock_participant]

    serializer = ResearchSerializer()
    result = serializer.to_representation(project)

    assert result["leader"]["first_name"] == "Alice"
    assert result["participants"][0]["email"] == "a@example.com"
