import logging
from unittest.mock import MagicMock, patch

import pytest

from backend.management.commands.getpublications import Command


@pytest.mark.parametrize(
    "input_title,expected_output",
    [
        ("Valid Title 123", "Valid Title 123"),  # nothing to clean
        ("Title!@#$%^&*()_+", "Title!@#$%^&*()_+"),  # all valid punctuation
        ("含有中文的标题", ""),  # non-ASCII characters removed
        ("Title🚀WithEmoji", "TitleWithEmoji"),  # emojis removed
        ("  Clean Me Up!  ", "Clean Me Up!"),  # trims outer whitespace
        ("\tTab\nNewline Title", "Tab\nNewline Title"),  # keeps whitespace
        ("", ""),  # empty string
        ("     ", ""),  # only spaces
    ],
)
def test_clean_title(input_title, expected_output):
    command = Command()
    assert command._clean_title(input_title) == expected_output


@pytest.mark.django_db
@patch("backend.management.commands.getpublications.Member")
def test_get_lab_members(mock_member):
    mock_member1 = MagicMock(first_name="John", last_name="Doe")
    mock_member2 = MagicMock(first_name="Jane", last_name="Smith")

    mock_member.objects.all.return_value = [mock_member1, mock_member2]

    obj = Command()
    result = obj._get_lab_members()

    assert result == ["John Doe", "Jane Smith"]


@pytest.fixture(autouse=True)
def disable_django_logging():
    logging.disable(logging.CRITICAL)
    yield
    logging.disable(logging.NOTSET)


@pytest.mark.parametrize(
    "author_name, mock_author_results, mock_pages, expected_publications, expected_exception",
    [
        (
            "John Doe",
            [{"id": "https://openalex.org/A123", "display_name": "John Doe"}],
            [
                {"results": [{"id": "work1"}], "meta": {"next_cursor": "*", "count": 2}},
                {"results": [{"id": "work2"}], "meta": {"next_cursor": None, "count": 2}},
            ],
            [{"id": "work1"}, {"id": "work2"}],
            None,
        ),
        # Author not found
        (
            "John Doesn't exist",
            [],
            [],
            None,
            ValueError,
        ),
    ],
)
@patch("management.commands.getpublications.requests.get")
@patch("management.commands.getpublications.time.sleep", return_value=None)  # prevent actual sleeping
def test_get_all_openalex_publications(
    mock_sleep,
    mock_get,
    author_name,
    mock_author_results,
    mock_pages,
    expected_publications,
    expected_exception,
):
    # Mocks the author search response
    author_response = MagicMock()
    author_response.json.return_value = {"results": mock_author_results}

    # Mocks each paginated publications response
    paginated_responses = []
    for page in mock_pages:
        page_mock = MagicMock()
        page_mock.json.return_value = page
        paginated_responses.append(page_mock)

    # Combine mocks into one response stream
    mock_get.side_effect = [author_response] + paginated_responses

    command = Command()

    if expected_exception:
        with pytest.raises(expected_exception):
            command.get_all_openalex_publications(author_name)
    else:
        result = command.get_all_openalex_publications(author_name)
        assert result == expected_publications
        assert len(result) == len(expected_publications)
