from unittest.mock import patch

import pytest

from backend.services.publication_generator_service import PublicationGeneratorService


@pytest.fixture
def service():
    return PublicationGeneratorService()


@pytest.mark.parametrize(
    "method_name, dict_method_name",
    [
        ("generate_google_scholar_publication", "_google_scholar_to_fields_dict"),
        ("generate_openalex_publication", "_openalex_to_fields_dict"),
    ],
)
def test_generate_publication_methods(service, method_name, dict_method_name):
    raw_input = "raw input"
    mocked_fields = {"author": "Smith, John", "title": "Something for Something", "journal": "The Journal", "year": "2024"}

    with patch.object(service, dict_method_name, return_value=mocked_fields):
        result = getattr(service, method_name)(raw_input)

    assert service.fields == mocked_fields
    assert service.entrytype == "article"
    assert service.citekey == "smith2024something"
    assert result == ("article", "smith2024something", mocked_fields)


@pytest.mark.parametrize(
    "input_name,expected_output",
    [
        ("John Smith", "Smith, John"),
        ("John Robert Smith", "Robert Smith, John"),
        ("John", "John"),
        ("  John   Smith  ", "Smith, John"),
        ("", ""),
        ("John-Robert Smith", "Smith, John-Robert"),
        ("  ", ""),
        (None, ""),
    ],
)
def test_reorder_author_name(service, input_name, expected_output):
    assert service._reorder_author_name(input_name) == expected_output


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
def test_clean_title(service, input_title, expected_output):
    assert service._clean_title(input_title) == expected_output


@pytest.mark.parametrize(
    "raw_bibtex,expected_dict",
    [
        (
            """@article{example2020,
                title={Something for Something},
                author={John Smith and Alice Brown},
                journal={The Journal},
                pub_year={2020},
                abstract={This is the abstract},
                citation={Some citation}
            }""",
            {"title": "Something for Something", "author": "Smith, John and Brown, Alice", "journal": "The Journal", "year": "2020"},
        ),
        (
            """@book{example2020,
        title={Something for Something},
        author={John Smith},
        pub_year={2020}
    }""",
            {"title": "Something for Something", "author": "Smith, John", "year": "2020"},
        ),
        (
            """@misc{id123,
        title={Something for Something}
    }""",
            {"title": "Something for Something"},
        ),
        (
            """@article{extraSpaces,
        title =   {Something for Something} ,
        author={John Smith and Alice Brown} ,
        pub_year = {2020}
    }""",
            {"title": "Something for Something", "author": "Smith, John and Brown, Alice", "year": "2020"},
        ),
        (
            """@article{empty,
            }""",
            {},
        ),
    ],
)
def test_google_scholar_to_fields_dict(service, raw_bibtex, expected_dict):
    result = service._google_scholar_to_fields_dict(raw_bibtex)
    assert result == expected_dict


@pytest.mark.parametrize(
    "input_data,expected_fields",
    [
        (
            {
                "title": "Something for Something",
                "authorships": [{"author": {"display_name": "Alice Smith"}}, {"author": {"display_name": "Bob Jones"}}],
                "biblio": {"first_page": "101", "last_page": "110", "volume": "42", "issue": "2"},
                "primary_location": {
                    "landing_page_url": "https://example.com/article",
                    "source": {"display_name": "The Journal", "publisher": "The Publisher"},
                },
                "type": "journal-article",
                "publication_year": 2023,
            },
            {
                "author": "Smith, Alice and Jones, Bob",
                "title": "Something for Something",
                "journal": "The Journal",
                "publisher": "The Publisher",
                "year": "2023",
                "volume": "42",
                "number": "2",
                "pages": "101--110",
                "url": "https://example.com/article",
            },
        ),
        (
            {
                "title": "Something for Something",
                "authorships": [],
                "biblio": {},
                "primary_location": {
                    "landing_page_url": "https://example.com/confpaper",
                    "source": {"display_name": "Conference on Something", "publisher": "The Publisher"},
                },
                "type": "Conference Paper",
                "publication_year": 2023,
            },
            {
                "title": "Something for Something",
                "booktitle": "Conference on Something",
                "journal": "Conference on Something",
                "publisher": "The Publisher",
                "year": "2023",
                "url": "https://example.com/confpaper",
            },
        ),
        (
            {
                "title": "Something for Something",
                "authorships": [],
                "primary_location": {"source": {"display_name": "Zenodo", "publisher": "Zenodo Org"}},
                "type": "journal-article",
                "publication_year": 2023,
            },
            {"title": "Something for Something", "publisher": "Zenodo Org", "year": "2023"},
        ),
    ],
)
def test_openalex_to_fields_dict(service, input_data, expected_fields):
    result = service._openalex_to_fields_dict(input_data)
    assert result == expected_fields


@pytest.mark.parametrize(
    "fields,expected_type",
    [
        ({"author": "A", "title": "T", "journal": "J", "year": "2020"}, "article"),
        ({"author": "A", "title": "T", "publisher": "P", "year": "2020"}, "book"),
        ({"editor": "E", "title": "T", "publisher": "P", "year": "2020"}, "book"),
        ({"author": "A", "title": "T", "booktitle": "BT", "publisher": "P", "year": "2020"}, "incollection"),
        ({"author": "A", "title": "T", "booktitle": "BT", "year": "2020"}, "inproceedings"),
        ({"editor": "E", "title": "T", "year": "2020"}, "proceedings"),
        ({"author": "A", "title": "T", "publisher": "P", "year": "2020", "chapter": "1"}, "inbook"),
        ({"author": "A", "title": "T", "publisher": "P", "year": "2020", "pages": "12-20"}, "inbook"),
        ({"editor": "E", "title": "T", "publisher": "P", "year": "2020", "chapter": "2"}, "inbook"),
        ({"editor": "E", "title": "T", "publisher": "P", "year": "2020", "pages": "5-10"}, "inbook"),
        ({"author": "A", "title": "T", "school": "S", "year": "2020"}, "phdthesis"),
        ({"author": "A", "title": "T", "institution": "I", "year": "2020"}, "techreport"),
        ({"author": "A", "title": "T", "note": "N"}, "unpublished"),
        ({"title": "T"}, "booklet"),
        ({}, "misc"),
    ],
)
def test_get_entrytype(service, fields, expected_type):
    service.fields = fields
    assert service._get_entrytype() == expected_type


@pytest.mark.parametrize(
    "fields,expected_citekey",
    [
        ({"author": "Smith, John and Alice Brown", "year": "2020", "title": "Something for Something"}, "smith2020something"),
        ({"author": "Brown Alice", "year": "2019", "title": "An Introduction to Something for Something"}, "brown2019introduction"),
        ({"author": "Smith, John", "year": "2018", "title": "A Study on Something"}, "smith2018study"),
        ({"author": "John", "year": "", "title": "Something for Something"}, "johnn.d.something"),
        ({"author": "", "year": "2021", "title": "Something for Something"}, "anonymous2021something"),
        ({"author": "O'Connor, John", "year": "2022", "title": "On the Effects of Something for Something"}, "o'connor2022effects"),
        ({"author": "Smith, John", "year": "2023", "title": "The"}, "smith2023untitled"),
        ({"author": "Johnson", "year": "2020", "title": ""}, "johnson2020untitled"),
        ({"author": "Johnson", "year": "2020"}, "johnson2020untitled"),
        ({"title": "Something for Something", "year": "2019"}, "anonymous2019something"),
        ({"author": "Smith, John", "title": "In and Out", "year": "2024"}, "smith2024untitled"),
    ],
)
def test_get_citekey(service, fields, expected_citekey):
    service.fields = fields
    assert service._get_citekey() == expected_citekey


@pytest.mark.parametrize(
    "entrytype, citekey, fields, expected_lines",
    [
        (
            "article",
            "smith2020something",
            {
                "title": "Something for Something",
                "author": "Smith, John",
                "journal": "The Journal",
                "volume": "10",
                "number": "2",
                "pages": "100--110",
                "year": "2020",
            },
            [
                "@article{smith2020something,",
                "  title={Something for Something},",
                "  author={Smith, John},",
                "  journal={The Journal},",
                "  volume={10},",
                "  number={2},",
                "  pages={100--110},",
                "  year={2020},",
                "}",
            ],
        ),
        (
            "book",
            "johnson2018learning",
            {"title": "Learning Handbook", "author": "Johnson, John", "publisher": "Tech Books", "year": "2018"},
            [
                "@book{johnson2018learning,",
                "  title={Learning Handbook},",
                "  author={Johnson, John},",
                "  year={2018},",
                "  publisher={Tech Books},",
                "}",
            ],
        ),
        (
            "misc",
            "anonnduntitled",
            {"title": "Untitled Document", "note": "To be published", "year": "n.d."},
            ["@misc{anonnduntitled,", "  title={Untitled Document},", "  year={n.d.},", "  note={To be published},", "}"],
        ),
        (
            "misc",
            "anonnduntitled",
            {"note": "To be published", "year": "n.d."},
            ["@misc{anonnduntitled,", "  year={n.d.},", "  note={To be published},", "}"],
        ),
        (
            "misc",
            "anonnduntitled",
            {
                "note": "To be published",
            },
            ["@misc{anonnduntitled,", "  note={To be published},", "}"],
        ),
    ],
)
def test_bibentry_str(service, entrytype, citekey, fields, expected_lines):
    service.entrytype = entrytype
    service.citekey = citekey
    service.fields = fields
    result = str(service)
    result_lines = result.splitlines()

    assert result_lines == expected_lines
