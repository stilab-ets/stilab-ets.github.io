import string
import time

import requests
from django.core.management.base import BaseCommand
from scholarly import ProxyGenerator, scholarly

from backend.models import Publication
from backend.services.publication_generator_service import PublicationGeneratorService

ALL_AUTHORS = [
    "Ali Ouni",
    "Syrine Khelifi",
    "Amina Bouaziz",
    "Mahi Begoug",
    "Mohamed Amine Batoun",
    "Narjes Bessghaier",
    "Jasem Khelifi",
    "Chemseddine Mebarki",
    "Nathan Babaka Kinalendele",
    "Jack Rayane Djapa Tchagwo",
    "Yassine Rabbouh",
    "Francener Alezy",
    "Alaa Ajjel",
    "Nour Bousrih",
    "Issam Oukhay",
    "Moataz Chouchen",
    "Nuri Almarimi",
    "Islem Saidani",
    "Marwa Daagi",
    "Wilfried Nkouekam Mbouga",
    "Hinda Abassi",
    "Lea Charara",
    "Mohamad Kredly",
    "Abdelkerim Haroun Ibrahim",
    "Bayes Diarra",
    "Mohamed Larbi Skalli",
    "Mahar Benmesbah",
    "Massiwen Akrour",
    "Moulay Taieb Alaoui Harouni",
    "Soufiane Alami",
    "Mustapha Felfoul",
    "Richardson Alexandre",
    "Oumayma Hamdi",
    "Ilyas Chahid",
    "Aurélien Jefferson Olongo Onana Noah",
    "Francener Alezy",
    "Miguel Gonzales Hernandez",
    "Yacine Thabet",
    "Moataz Chouchen",
    "Safouane Bani",
    "Sabrine Boukharata",
    "Bechir Jebali",
    "Naoya Ujihara",
    "Farah Hachicha",
    "Jouhaina Nasri",
    "Jasem Khelifi",
    "Fatma Beji",
]


class Command(BaseCommand):
    help = "Updates the publications for all members of the lab."

    def _set_up_scholarly(self):
        """Creates and activates the proxy used by scholarly."""
        pg = ProxyGenerator()
        pg.FreeProxies()
        scholarly.use_proxy(pg)

    def _clean_title(self, publication_title):
        """Remove any illegal characters from the publication's title"""
        allowed = string.ascii_letters + string.digits + string.punctuation + string.whitespace
        return "".join(character for character in publication_title if character in allowed).strip()

    def add_arguments(self, parser):
        parser.add_argument(
            "--fast",
            "-f",
            action="store_true",
            help="Will skip querying Google Scholar. Using this option has a high chance of returning incomplete data.",
        )

    def handle(self, *args, **options):
        skip_google_scholar = options["fast"]

        # TODO: Gather all authors from the DB instead of hard coding the list.
        authors = ALL_AUTHORS

        blocked_by_google = False
        for author in authors:
            try:
                publications = self.get_all_openalex_publications(author)
            except ValueError:
                print(f"Unable to retieve any publications for {author}")
                continue
            for publication in publications:
                publication_id = publication["id"]

                try:
                    obj = Publication.objects.get(id=publication_id)
                    if obj.is_approved:
                        print(f"The publication '{publication["title"]}' is already in the database and is approved... Skipping.")
                        continue
                except Publication.DoesNotExist:
                    pass  # Creating new publication

                pub_gen = PublicationGeneratorService()
                if skip_google_scholar:
                    publication_tuple = pub_gen.generate_openalex_publication(publication)

                elif not blocked_by_google:
                    self._set_up_scholarly()
                    publication_cleaned_title = self._clean_title(publication["title"])
                    try:
                        pub = scholarly.search_pubs(publication_cleaned_title)
                        p = scholarly.fill(next(pub))

                        # Scholarly needs these two fields to be able to generate a bibtex
                        p["bib"]["ENTRYTYPE"] = "DUMMY"
                        p["bib"]["ID"] = "DUMMY"

                        publication_tuple(pub_gen.generate_google_scholar_publication(p["bib"]))
                        time.sleep(3)  # Longer wait to not get blocked by google
                    except Exception as e:
                        if e == "Cannot Fetch from Google Scholar.":
                            print("Cannot Fetch from Google Scholar.")
                            print("Falling back to OpenAlex API.")
                            print("Some data may be incomplete or missing.")
                            blocked_by_google = True
                            # Fall back to openalex
                            skip_google_scholar = True
                try:
                    obj, created = Publication.objects.update_or_create(
                        id=publication_id,
                        defaults={
                            "entrytype": publication_tuple[0] or None,
                            "citekey": publication_tuple[1] or None,
                            "title": publication_tuple[2].get("title") or None,
                            "author": publication_tuple[2].get("author") or None,
                            "journal": publication_tuple[2].get("journal") or None,
                            "booktitle": publication_tuple[2].get("booktitle") or None,
                            "publisher": publication_tuple[2].get("publisher") or None,
                            "year": publication_tuple[2].get("year") or None,
                            "volume": publication_tuple[2].get("volume") or None,
                            "number": publication_tuple[2].get("number") or None,
                            "pages": publication_tuple[2].get("pages") or None,
                            "url": publication_tuple[2].get("url") or None,
                            "is_approved": False,
                        },
                    )
                except Exception as e:
                    print(f"Error creating the publication '{publication_tuple[2].get("title")}' - {e}")
                if created:
                    print(f"Publication '{publication_tuple[2].get("title")}' created")
                else:
                    print(f"Publication titled - '{publication_tuple[2].get("title")}' was already in the database")

    def get_all_openalex_publications(self, author_name):
        """Gather all publications of the author with the OpenAlex API. The results may be incomplete."""

        # Get the author OpenAlex ID
        res = requests.get("https://api.openalex.org/authors", params={"search": author_name})
        authors = res.json().get("results", [])
        if not authors:
            error = f"Unable to find author '{author_name}' with the OpenAlex API."
            print(error)
            raise ValueError(error)

        author_id = authors[0]["id"]
        print(f"Found author: {authors[0]['display_name']} — {author_id}")

        # Get all the author's publications available with the OpenAlex API
        publications_url = "https://api.openalex.org/works"
        cursor = "*"
        all_works = []

        while True:
            params = {
                "filter": f"author.id:{author_id}",
                "per-page": 100,
                "cursor": cursor,
            }
            response = requests.get(publications_url, params=params)
            data = response.json()

            all_works.extend(data["results"])

            cursor = data["meta"].get("next_cursor")
            if not cursor:
                break

            print(f"Fetched {len(all_works)} / {data['meta']['count']}")

            time.sleep(1)  # Wait to not get blocked by OpenAlex

        return all_works
