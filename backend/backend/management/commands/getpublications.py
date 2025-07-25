import logging
import string
import time
import urllib.parse

import requests
from config.settings import BACKEND_URL, EMAIL_HOST_USER
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.core.management.base import BaseCommand
from django.template.loader import render_to_string
from scholarly import ProxyGenerator, scholarly

from backend.models import Member, Publication
from backend.services.publication_generator_service import PublicationGeneratorService

logger = logging.getLogger(__name__)

# This is the list of members of STIL as of july 2025: https://ouniali.github.io/members/
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

    def _get_lab_members(self):
        members = Member.objects.all()
        return [m.first_name + " " + m.last_name for m in members]

    def add_arguments(self, parser):
        parser.add_argument(
            "--fast",
            "-f",
            action="store_true",
            help="Will skip querying Google Scholar. Using this option has a high chance of returning incomplete data.",
        )

    def _notify_admins(self, publications_changed):
        User = get_user_model()
        superusers = User.objects.filter(is_superuser=True, is_active=True, email__isnull=False).exclude(email="")

        emails = [user.email for user in superusers]

        if not emails:
            logger.warning("No superusers with email found")
            return

        backend_url = f"{BACKEND_URL}/admin/backend/publication/"
        context = {"publications_changed": publications_changed, "backend_url": backend_url}

        text_content = render_to_string(
            "templates/emails/notify_admins.txt",
            context=context,
        )

        html_content = render_to_string(
            "templates/emails/notify_admins.html",
            context=context,
        )

        msg = EmailMultiAlternatives(
            "Publications need approval",
            text_content,
            EMAIL_HOST_USER,
            superusers,
        )

        msg.attach_alternative(html_content, "text/html")
        msg.send()

        logger.info("Email sent to admins.")

    def handle(self, *args, **options):
        skip_google_scholar = options["fast"]

        authors = self._get_lab_members()

        # Fallback if there are no members registered in the database
        if not authors:
            authors = ALL_AUTHORS

        blocked_by_google = False

        publications_changed = []
        for author in authors:
            logger.info(f"Gathering publications for {author}...")
            try:
                publications = self.get_all_openalex_publications(author)
            except ValueError:
                logger.info(f"Unable to retieve any publications for {author}. Skipping...")
                continue
            for publication in publications:
                publication_id = publication["id"]
                logger.info(f"Creating publication for '{publication["title"]}'")
                try:
                    obj = Publication.objects.get(id=publication_id)
                    if obj.is_approved:
                        logger.info(f"The publication '{publication["title"]}' is already in the database and is approved. Skipping...")
                        continue
                    else:
                        logger.info(f"The publication '{publication["title"]}' is already in the database but is not approved. Trying to update...")
                except Publication.DoesNotExist:
                    logger.info(f"The publication '{publication["title"]}' is not in the database. Creating new publication...")
                    pass

                pub_gen = PublicationGeneratorService()
                if skip_google_scholar:
                    logger.info("Getting publication data from OpenAlex...")
                    publication_tuple = pub_gen.generate_openalex_publication(publication)

                elif not blocked_by_google:
                    self._set_up_scholarly()
                    publication_cleaned_title = self._clean_title(publication["title"])
                    try:
                        logger.info("Getting publication data from Google Scholar...")
                        pub = scholarly.search_pubs(publication_cleaned_title)
                        p = scholarly.fill(next(pub))

                        # Scholarly needs these two fields to be able to generate a bibtex
                        p["bib"]["ENTRYTYPE"] = "DUMMY"
                        p["bib"]["ID"] = "DUMMY"

                        publication_tuple(pub_gen.generate_google_scholar_publication(p["bib"]))
                        time.sleep(3)  # Longer wait to not get blocked by google
                    except Exception:
                        logger.error("Cannot Fetch from Google Scholar.")
                        logger.warning("Falling back to OpenAlex API.")
                        logger.warning("Some data may be incomplete or missing.")

                        # Fall back to openalex
                        blocked_by_google = True
                        skip_google_scholar = True
                        publication_tuple = pub_gen.generate_openalex_publication(publication)
                try:
                    obj, created = Publication.objects.update_or_create(
                        id=publication_id,
                        defaults={
                            "entrytype": publication_tuple[0] if publication_tuple else None,
                            "citekey": publication_tuple[1] if publication_tuple else None,
                            "title": publication_tuple[2].get("title") if publication_tuple else None,
                            "author": publication_tuple[2].get("author") if publication_tuple else None,
                            "journal": publication_tuple[2].get("journal") if publication_tuple else None,
                            "booktitle": publication_tuple[2].get("booktitle") if publication_tuple else None,
                            "publisher": publication_tuple[2].get("publisher") if publication_tuple else None,
                            "year": publication_tuple[2].get("year") if publication_tuple else None,
                            "volume": publication_tuple[2].get("volume") if publication_tuple else None,
                            "number": publication_tuple[2].get("number") if publication_tuple else None,
                            "pages": publication_tuple[2].get("pages") if publication_tuple else None,
                            "url": publication_tuple[2].get("url") if publication_tuple else None,
                            "is_approved": False,
                        },
                    )
                    publications_changed.append({"id": urllib.parse.quote(obj.id, safe="").replace("%", "_"), "title": obj.title})
                except Exception as e:
                    logger.error(f"Error creating the publication '{publication["title"]}' - {e}")
                    continue
                if created:
                    logger.info(f"Publication '{publication["title"]}' created")
                else:
                    logger.info(f"Publication titled - '{publication["title"]}' was already in the database")
        if publications_changed:
            self._notify_admins(publications_changed)
            pass

    def get_all_openalex_publications(self, author_name):
        """Gather all publications of the author with the OpenAlex API. The results may be incomplete."""

        # Get the author OpenAlex ID
        res = requests.get("https://api.openalex.org/authors", params={"search": author_name})
        authors = res.json().get("results", [])
        if not authors:
            error = f"Unable to find author '{author_name}' with the OpenAlex API."
            logger.error(error)
            raise ValueError(error)

        author_id = authors[0]["id"]
        logger.info(f"Found author: {authors[0]['display_name']} — {author_id}")

        # Get all the author's publications available with the OpenAlex API
        publications_url = "https://api.openalex.org/works"
        cursor = "*"
        all_works = []
        logger.info("Fetching publications...")
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

            logger.info(f"Fetched {len(all_works)} / {data['meta']['count']} publications...")

            time.sleep(1)  # Wait to not get blocked by OpenAlex

        logger.info(f"Successfully fetched {len(all_works)} publications")
        return all_works
