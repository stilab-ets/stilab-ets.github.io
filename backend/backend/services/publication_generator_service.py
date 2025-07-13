import re
import string


class PublicationGeneratorService:

    def __init__(self):
        self.fields = {}
        self.entrytype = ""
        self.citekey = ""

    def generate_google_scholar_publication(self, raw_data):
        """Given the data obtained from Google Scholar, generate the publication."""
        self.fields = self._google_scholar_to_fields_dict(raw_data)
        self.entrytype = self._get_entrytype()
        self.citekey = self._get_citekey()
        return self.entrytype, self.citekey, self.fields

    def generate_openalex_publication(self, raw_data):
        """Given the data obtained from OpenAlex, generate the publication's"""
        self.fields = self._openalex_to_fields_dict(raw_data)
        self.entrytype = self._get_entrytype()
        self.citekey = self._get_citekey()
        return self.entrytype, self.citekey, self.fields

    def _reorder_author_name(self, author_name):
        """Reorders the authors name to be the familly name first. Assumes the author's first name is only the first name in the string"""
        if not author_name or len(author_name) == 0 or author_name.isspace():
            return ""

        split_author_name = author_name.strip().split(" ")
        if len(split_author_name) >= 2:
            return f"{' '.join(split_author_name[1:]).strip()}, {split_author_name[0].strip()}"
        else:
            return split_author_name[0].strip()

    def _clean_title(self, publication_title):
        """Remove any illegal characters from the publication's title"""
        allowed = string.ascii_letters + string.digits + string.punctuation + string.whitespace
        return "".join(character for character in publication_title if character in allowed).strip()

    def _google_scholar_to_fields_dict(self, raw_bibtex):
        """Find the publication's fields from the bibtex obtained from Google Scholar"""

        # Remove first line with entry type and ID
        bibtex_body = re.sub(r"^@\w+{[^,]+,\s*", "", raw_bibtex.strip(), flags=re.DOTALL)
        # Remove the closing brace at the end
        bibtex_body = bibtex_body.rsplit("}", 1)[0]

        # Extract key-value pairs
        fields = dict(re.findall(r"(\w+)\s*=\s*{([^}]*)}", bibtex_body))

        # Clean up the dictionnary
        fields = {k.strip(): v.strip() for k, v in fields.items()}
        if "pub_year" in fields:
            fields["year"] = fields.pop("pub_year")
        if "author" in fields:
            fields["author"] = " and ".join([self._reorder_author_name(a) for a in fields["author"].split(" and ")])
        fields.pop("abstract", None)
        fields.pop("citation", None)

        return fields

    def _openalex_to_fields_dict(self, data):
        """Find the publication's fields from data obtained with the OpenAlex API"""

        # Reorder the names of all authors of this publication to be Lastname, Firstname
        authors = " and ".join([self._reorder_author_name(a["author"]["display_name"]) for a in data.get("authorships", [])])

        # Create the fields dictionnary
        title = self._clean_title(data.get("title", ""))

        biblio = data.get("biblio", {})
        primary_location = data.get("primary_location", {})
        journal_info = primary_location.get("source", {}) if primary_location else None
        journal = journal_info.get("display_name", "") if journal_info else None
        publisher = journal_info.get("publisher", "") if journal_info else None

        year = str(data.get("publication_year", ""))
        url = primary_location.get("landing_page_url", "") if primary_location else None

        first_page = biblio.get("first_page", "")
        last_page = biblio.get("last_page", "")
        page_range = f"{first_page}--{last_page}" if first_page and first_page != last_page else first_page

        volume = biblio.get("volume", "")
        number = biblio.get("issue", "")

        fields = {
            "author": authors,
            "title": title,
            "journal": (journal if journal and "Zenodo" not in journal else None),  # Zenodo seemed to give a lot of false positives
            "booktitle": (journal if "conference" in data.get("type", "").lower() else None),
            "publisher": publisher,
            "year": year,
            "volume": volume,
            "number": number,
            "pages": page_range,
            "url": url,
        }

        # Filter out empty or None fields before returning
        return {k: v for k, v in fields.items() if v}

    def _get_entrytype(self):
        """Guess the publication's entrytype (from https://www.bibtex.com/e/entry-types/)"""

        keys = {k.lower() for k in self.fields}

        if {"author", "title", "journal", "year"}.issubset(keys):
            return "article"

        if (
            {"author", "title", "publisher", "year", "chapter"}.issubset(keys)
            or {"author", "title", "publisher", "year", "pages"}.issubset(keys)
            or {"editor", "title", "publisher", "year", "chapter"}.issubset(keys)
            or {"editor", "title", "publisher", "year", "pages"}.issubset(keys)
        ):
            return "inbook"

        if {"author", "title", "booktitle", "publisher", "year"}.issubset(keys):
            return "incollection"

        if {"author", "title", "booktitle", "year"}.issubset(keys):
            return "inproceedings"

        if {"author", "title", "publisher", "year"}.issubset(keys) or {
            "editor",
            "title",
            "publisher",
            "year",
        }.issubset(keys):
            return "book"

        if {"editor", "title", "year"}.issubset(keys) and not {
            "author",
            "journal",
            "booktitle",
            "publisher",
        }.intersection(keys):
            return "proceedings"

        if {"author", "title", "school", "year"}.issubset(keys):
            return "phdthesis"

        if {"author", "title", "institution", "year"}.issubset(keys):
            return "techreport"

        if {"author", "title", "note"}.issubset(keys) and "year" not in keys:
            return "unpublished"

        if {"title"}.issubset(keys) and not {
            "journal",
            "publisher",
            "booktitle",
        }.intersection(keys):
            return "booklet"

        # Fallback: catch-all
        return "misc"

    def _get_citekey(self):
        """Creates a publication's citekey by taking the last name of the first author, the year and the first significant word of the title."""

        # A list of words that are not significant enough for the title.
        STOPWORDS = {
            "a",
            "an",
            "and",
            "the",
            "of",
            "on",
            "in",
            "to",
            "with",
            "for",
            "at",
            "by",
            "from",
            "about",
            "as",
            "into",
            "like",
            "through",
            "after",
            "over",
            "between",
            "out",
            "against",
            "during",
            "without",
            "before",
            "under",
            "around",
            "among",
            "up",
            "down",
            "off",
            "near",
        }

        year = self.fields.get("year", None)
        if (year and year.isspace()) or not year:
            year = "n.d."

        name_field = self.fields.get("author", None)
        last_name = name_field.split(" and ")[0].strip().split(" ")[0].replace(",", "") if name_field else "anonymous"

        first_title_word = "untitled"
        if self.fields.get("title", None):

            # Finds all words in the title
            words = re.findall(r"\b\w+\b", self.fields["title"])
            for word in words:
                if word.lower() not in STOPWORDS:
                    first_title_word = word
                    break

        return f"{last_name}{year}{first_title_word}".lower()

    def __str__(self):
        """Bibtex of the publication"""
        lines = [f"@{self.entrytype}{{{self.citekey},"]

        field_order = []
        if "title" in self.fields:
            field_order.append("title")
        if "author" in self.fields:
            field_order.append("author")
        if "journal" in self.fields:
            field_order.append("journal")
        if "volume" in self.fields:
            field_order.append("volume")
        if "number" in self.fields:
            field_order.append("number")
        if "pages" in self.fields:
            field_order.append("pages")
        if "year" in self.fields:
            field_order.append("year")

        remaining_fields = sorted(k for k in self.fields if k not in {"title", "author", "journal", "volume", "number", "pages", "year"})
        field_order.extend(remaining_fields)

        for key in field_order:
            value = self.fields[key]
            lines.append(f"  {key}={{{value}}},")
        lines.append("}")
        return "\n".join(lines)
