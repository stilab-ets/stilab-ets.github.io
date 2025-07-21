from unittest.mock import MagicMock, patch

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from backend.views.run_getpublications_command_views import RunGetPublicationsCommandAPIView

factory = APIRequestFactory()


def test_unauthenticated_user_cannot_access():
    request = factory.post("run-getpublications-command")
    response = RunGetPublicationsCommandAPIView.as_view()(request)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_authenticated_user_can_start_command():
    request = factory.post("run-getpublications-command")
    mock_user = MagicMock()
    mock_user.is_authenticated = True

    force_authenticate(request, user=mock_user)

    with patch("backend.views.run_getpublications_command_views.call_command") as mock_command:
        response = RunGetPublicationsCommandAPIView.as_view()(request)
        assert response.status_code == status.HTTP_202_ACCEPTED
        mock_command.assert_called_once()


def test_second_request_returns_429_while_running():
    request = factory.post("run-getpublications-command")
    mock_user = MagicMock()
    mock_user.is_authenticated = True

    force_authenticate(request, user=mock_user)

    with patch("backend.views.run_getpublications_command_views.call_command") as mock_command:
        with patch("backend.views.run_getpublications_command_views.command_lock") as mock_lock:

            mock_lock.locked.side_effect = [False, True]

            # First request
            response1 = RunGetPublicationsCommandAPIView.as_view()(request)
            assert response1.status_code == status.HTTP_202_ACCEPTED

            # Second request
            request2 = factory.post("run-getpublications-command")
            force_authenticate(request2, user=mock_user)
            response2 = RunGetPublicationsCommandAPIView.as_view()(request2)
            assert response2.status_code == status.HTTP_429_TOO_MANY_REQUESTS

            mock_command.assert_called_once()
