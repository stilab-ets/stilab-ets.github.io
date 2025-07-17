import logging

from django.core.management.base import BaseCommand

from backend.models import Member

logger = logging.getLogger(__name__)

# first_name,last_name,role,email,start_date,end_date
CURRENT_PROFESSOR = []
CURRENT_PHD = [
    "Syrine,Khelifi,PhD,,2024,",
    "Amina,Bouaziz,PhD,,2024,",
    "Mahi,Begoug,PhD,,2023,",
    "Mohamed,Amine Batoun,PhD,,2022,",
    "Narjes,Bessghaier,PhD,,2020,",
    "Jasem,Khelifi,M.Sc,,2024,",
    "Chemseddine,Mebarki,M.Ing.,,2023,",
    "Nathan,Babaka Kinalendele,M.Ing.,,2023,",
    "Jack,Rayane Djapa Tchagwo,M.Ing.,,2022,",
    "Yassine Rabbouh,M.Ing.,,2022,",
    "Francener,Alezy,M.Sc.,,2021,",
]

# CURRENT_MASTER = [
#
#     "Syrine Khelifi,PhD,2024 - current",
#     "Amina Bouaziz,PhD,2024 - current (co-supervided with Dr. Saied, Univ. Laval)",
#     "Mahi Begoug,PhD,2023 - current",
#     "Mohamed Amine Batoun,PhD,2022 - current (co-supervided with Dr. Sayagh)",
#     "Narjes Bessghaier,PhD,2020 - current (co-supervided with Dr. Sayagh)",
#     "Jasem Khelifi,M.Sc,2024 - current",
#     "Chemseddine Mebarki,M.Ing.,2023 - current",
#     "Nathan Babaka Kinalendele,M.Ing.,2023 - current",
#     "Jack Rayane Djapa Tchagwo,M.Ing.,2022 - current",
#     "Yassine Rabbouh,M.Ing.,2022 - current",
#     "Francener Alezy,M.Sc.,2021 - current"
# ]
#
#
# CURRENT_INTERN = [
#     "Alaa Ajjel,MSc,Summer 2024",
#     "Nour Bousrih,MSc,Summer 2024",
#     "Issam Oukhay,MsC,Summer 2024"
# ]
#
# PAST_MEMBERS = [
#     "Moataz Chouchen,PhD,2024, Now Assistant Professor at Concordia University",
#     "Nuri Almarimi,PhD,2023. Now Postdoctoral researcher at the University of Saskatchewan.",
#     "Islem Saidani,PhD,2022. Now Data engineer at LGS, an IBM Company",
#     "Marwa Daagi,PhD,2021. Now Assistant Professor at CESI engineering school, Pau, France.",
#     "Wilfried Nkouekam Mbouga,M.Ing.,2022. Now Software Engineer at Famic Technologies",
#     "Hinda Abassi,M.Ing.,2022.",
#     "Lea Charara,M.Ing.,2022. Now Full Stack Developer at Hubelia",
#     "Mohamad Kredly,M.Ing.,2022",
#     "Abdelkerim Haroun Ibrahim,M.Ing.,2022. Now software engineer at ABB Canada",
#     "Bayes Diarra,M.Ing.,2021. Now Software developer at Ministère de la santé et des services sociaux (MSSS), Quebec",
#     "Mohamed Larbi Skalli,M.Ing.,2021. Now Software developer at COGITO Coatching",
#     "Mahar Benmesbah,M.Ing.,2020. Now Software engineer at Berger-Levrault North America",
#     "Massiwen Akrour,M.Ing.,2021. Now Software engineer at Intact Insurance",
#     "Moulay Taieb Alaoui Harouni,M.Ing.,2021. Now Data Engineer at Bombardier",
#     "Soufiane Alami,M.Ing.,2021. Now Software Analyst at Desjardins",
#     "Mustapha Felfoul,M.Ing.,2022. Now Software analyst at Purkinje",
#     "Richardson Alexandre,M.Ing.,2022. Now Full Stack Developer at Ordigraphe inc.",
#     "Oumayma Hamdi,MSc.,2021. Now Software engineer at ALTEN Canada",
#     "Ilyas Chahid,M.Ing.,2021. Now Full Stack developer at Koolskools",
#     "Aurélien Jefferson Olongo Onana Noah,M.Ing.,2021.",
#     "Francener Alezy,M.Ing. 2020,Now Senior Software Web Developer at Cubeler Business Hub",
#     "Miguel Gonzales Hernandez,M.Ing. 2020. Now software analyst at TELUS.",
#     "Yacine Thabet,M.Ing. 2019,Now PhD student.",
#     "Moataz Chouchen,M.Sc. 2019,Now PhD student at ETS Montreal",
#     "Safouane Bani,M.Ing. 2019,Now Web designer at 8P Design.",
#     "Sabrine Boukharata,MSc,2019. Now Software Analyst at GIRO",
#     "Bechir Jebali,M.Ing. 2019,Now software analyst at the Ministry of MIDI, Quebec.",
#     "Naoya Ujihara,M.Eng.,2016. Now Software analyst at NTT Japan",
#     "Farah Hachicha,M.Sc.,Summer 2023",
#     "Jouhaina Nasri,M.Sc.,Summer 2023",
#     "Jasem Khelifi,Undergad,Summer 2023",
#     "Fatma Beji,Undergad,Summer 2023"
# ]


class Command(BaseCommand):
    def add_arguments(self, parser):
        return

    def handle(self, *args, **options):
        members = self.get_members(CURRENT_PHD)
        for member in members:
            if member["email"] == "":
                member["email"] = None
            try:
                obj, created = Member.objects.update_or_create(
                    email=member["email"],
                    defaults={
                        "first_name": member["first_name"],
                        "last_name": member["last_name"],
                        "role": member["role"],
                        "phone": None,
                        "biography": None,
                        "research_domain": None,
                        "image_url": None,
                        "github_url": None,
                        "linkedin_url": None,
                        "personal_website": None,
                        "user": None,
                    },
                )
            except Exception as e:
                print(f"Error creating the member '{member}' - {e}")
                logger.error(f"Error creating the member '{member}' - {e}")
                continue
            if created:
                logger.info(f"Member '{member}' created")
            else:
                logger.info(f"Member '{member}' not created")

    def get_members(self, data_strings):
        people = []
        for person_string in data_strings:
            parts = person_string.strip().split(",")
            if len(parts) == 6:
                person = {
                    "first_name": parts[0],
                    "last_name": parts[1],
                    "role": parts[2],
                    "email": parts[3],
                    "start_date": parts[4],
                    "end_date": parts[5],
                }
                people.append(person)
        return people
