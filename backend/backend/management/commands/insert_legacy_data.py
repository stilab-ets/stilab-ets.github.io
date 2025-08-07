import logging

from django.core.management.base import BaseCommand

from backend.models import Award, AwardRecipient, Course, Member

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def add_arguments(self, parser):
        return

    def handle(self, *args, **options):
        self.insert_members()
        self.insert_awards()
        self.insert_courses()

    def insert_members(self):
        members = self.get_members(MEMBERS)
        for member in members:
            try:
                obj, created = Member.objects.update_or_create(
                    first_name=member["first_name"],
                    last_name=member["last_name"],
                    defaults={
                        "role": member["role"],
                        "status": member["status"],
                        "email": member["email"] or None,
                        "phone": None,
                        "biography": member["biography"] or None,
                        "research_domain": None,
                        "image_url": None,
                        "github_url": None,
                        "linkedin_url": None,
                        "stackoverflow_url": None,
                        "twitter_x_url": None,
                        "google_scholar_url": None,
                        "dblp_url": None,
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

    def insert_awards(self):
        for award in AWARDS:
            try:
                obj, created = Award.objects.update_or_create(
                    title=award["title"],
                    defaults={
                        "url": award["url"],
                        "year": award["year"],
                        "organization": award["organization"],
                    },
                )

            except Exception as e:
                print(f"Error creating the award '{award}' - {e}")
                logger.error(f"Error creating the award '{award}' - {e}")
                continue
            if created:
                logger.info(f"Award '{Award}' created")
                for recipient in award["award_recipients"]:
                    name = recipient.strip().split(",")

                    try:
                        member = Member.objects.get(first_name=name[0].strip(), last_name=name[1].strip())

                        recipient, created = AwardRecipient.objects.update_or_create(
                            award=obj,
                            member=member,
                            defaults={},
                        )
                    except Member.DoesNotExist:
                        continue
                    except Exception as e:
                        print(f"Error creating the award recipient '{recipient}' - {e}")
                        logger.error(f"Error creating the award recipient '{recipient}'")
                        continue

            else:
                logger.info(f"Award '{Award}' not created")

    def insert_courses(self):
        for course in COURSES:
            try:
                name = course["teacher"].strip().split(",")
                teacher = Member.objects.get(first_name=name[0].strip(), last_name=name[1].strip())

                obj, created = Course.objects.update_or_create(
                    title=course["title"],
                    year=course["year"],
                    semester=course["semester"],
                    defaults={
                        "url": course["url"],
                        "title": course["title"],
                        "teacher": teacher,
                        "code": course["code"],
                        "level": course["level"],
                        "description": course["description"],
                    },
                )
            except Exception as e:
                print(f"Error creating the award '{course}' - {e}")
                logger.error(f"Error creating the award '{course}' - {e}")
                continue

            if created:
                logger.info(f"Course '{course}' created")
            else:
                logger.info(f"Course '{course}' not created")
        return

    def get_members(self, data_strings):
        members = []
        for person_string in data_strings:
            parts = person_string.strip().split(",", 5)
            member = {"first_name": parts[0], "last_name": parts[1], "role": parts[2], "email": parts[3], "status": parts[4], "biography": parts[5]}
            members.append(member)
        return members


MEMBERS = [
    "Ali,Ouni,PRO,ali.ouni@etsmtl.ca,CRT,Ali Ouni is a passionate software "
    "engineering researcher and educator. He is a Full Professor in the "
    "Department of Software Engineering and IT at École de technologie "
    "superieure (ÉTS Montréal), University of Quebec, where he leads the "
    "Software Technology and Intelligence Research Lab (STIL). He is the "
    "recipient of several prestigeous awards including the CS-Can/Info-Can "
    "Outstanding Early Career Computer Science Researcher Award, in 2023, the "
    "Research Ecellence Award (Releve) of the University of Quebec in 2023, "
    "the Research Ecellence Award-Emerging Researcher from ÉTS Montreal in "
    "2021. He obtained his PhD degree in computer science from the University "
    "of Montreal where he was awarded the J. Armand Bombardier Research "
    "Excellence Award. Before joining ETS Montreal, he has been an assistant "
    "professor at Osaka University, Japan, and UAE University. He has served "
    "as a visiting researcher at Missouri University of Science and "
    "Technology, and University of Michigan. He has developed pioneering "
    "research work in the area of software engineering, software maintenance "
    "and evolution, software quality, and empirical software engineering. He "
    "leverages advanced artificial intelligence techniques to address "
    "challenges related to software products, processes, and stakeholders. "
    "His research work has repeatedly published in top venues in software "
    "engineering. He is the recipient of over 10 Best Paper awards at "
    "top-tier conferences (ICSOC 2024, MSR 2024 Mining Track, SIGCSE 2024, "
    "ICSOC 2022, MSR 2021 Mining Track, ICGSE 2020, ICSR 2020, IWoR 2019, "
    "Energies 2018, ICWS 2016) and has been done in collaboration with and/or "
    "adopted by major industrial software companies. He won the 10-year Most "
    "Influential Paper Award (MIP) at IEEE ICPC 2021. He is a member of the "
    "IEEE.",
    "Mahi,Begoug,PHD,mahi.begoug.1@ens.etsmtl.ca,CRT,",
    "Jassem,Khelifi,PHD,jasem.khelifi.1@ens.etsmtl.ca,CRT,",
    "Syrine,Khelifi,PHD,syrine.khelifi.1@ens.etsmtl.ca,CRT,",
    "Issam,Oukhay,MSC,issam.oukhay.1@ens.etsmtl.ca,CRT,",
    "Narjess,Bessghaier,PHD,,GRD,",
    "Moataz,Chouchen,PHD,,GRD,",
]

AWARDS = [
    {
        "title": (
            "Ranked among the Most Impactful and Most Active Early Stage "
            "Researchers worldwide in Software Engineering. W. E. Wong, N. "
            "Mittas, E. M. Arvanitou, Y. Li, A Bibliometric Assessment of "
            "Software Engineering Scholars and Institutions (2013-2020), "
            "Journal of Systems and Software (JSS), Elsevier, 2021."
        ),
        "url": "https://doi.org/10.1016/j.jss.2021.111029",
        "award_recipients": ["Ali, Ouni"],
        "year": "2021",
        "organization": "Journal of Systems and Software (JSS)",
    },
    {
        "title": (
            "Ranked among TOP-3 researchers in the field of search-based "
            "software refactoring. Thaina Mariani, Silvia Regina Vergilio, A "
            "systematic review on search-based refactoring, Journal of "
            "Information and Software Technology (IST), Elsevier, 2016."
        ),
        "url": "http://dx.doi.org/10.1016/j.infsof.2016.11.00",
        "award_recipients": ["Ali, Ouni"],
        "year": "2016",
        "organization": "Journal of Information and Software Technology (IST)",
    },
    {
        "title": (
            "CS-Can/Info-Can Outstanding Early Career Computer Science "
            "Researcher Award, Canada’s national Computer Science academic "
            "organization (CS-Can/Info-Can), 2023"
        ),
        "url": "https://cscan-infocan.ca/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2023",
        "organization": "CS-Can/Info-Can",
    },
    {
        "title": (
            "Research Ecellence Award (Releve) of the University of Quebec, "
            "2023. Award from all disciplines in natural sciences, engineering, "
            "and health sciences."
        ),
        "url": "https://reseau.uquebec.ca/fr/a-propos/prix-et-distinctions/prix-dexcellence",
        "award_recipients": ["Ali, Ouni"],
        "year": "2023",
        "organization": "University of Quebec",
    },
    {
        "title": ("Early Career Research Ecellence Award, ETS Montreal, 2021."),
        "url": "https://www.etsmtl.ca/ets/a-propos/prix-et-distinctions",
        "award_recipients": ["Ali, Ouni"],
        "year": "2021",
        "organization": "ÉTS Montreal",
    },
    {
        "title": (
            "PhD Outstanding Research Award, FESP, University of Montreal, 2014. "
            "The highest University honor that PhD students engaged in research "
            "can receive."
        ),
        "url": None,
        "award_recipients": ["Ali, Ouni"],
        "year": "2014",
        "organization": "FESP, University of Montreal",
    },
    {
        "title": ("PhD Research Excellence Award, J. Armand Bombardier Foundation, " "Canada, 2014."),
        "url": "https://www.fondationbombardier.ca/en/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2014",
        "organization": "J. Armand Bombardier Foundation",
    },
    {
        "title": (
            "Outstanding Graduate student excellence award, Department of "
            "Computer Science and Operations Research (DIRO), University of "
            "Montreal, 2013. The highest departmental Award for excellent "
            "graduate students."
        ),
        "url": "http://diro.umontreal.ca/accueil/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2013",
        "organization": "Department of Computer Science and Operations Research (DIRO), University of Montreal",
    },
    {
        "title": ("Excellence Doctoral Scholarship Award, MESR, Government of Tunisia " "(2011-2014)."),
        "url": "http://www.mesrst.tn/anglais/index.htm",
        "award_recipients": ["Ali, Ouni"],
        "year": "2014",
        "organization": "MESR, Government of Tunisia",
    },
    {
        "title": ("10-Year Most Influential Paper Award at the 29th IEEE/ACM " "International Conference on Program Comprehension (ICPC) 2021."),
        "url": "https://conf.researchr.org/home/icpc-2021",
        "award_recipients": ["Ali, Ouni"],
        "year": "2021",
        "organization": "IEEE/ACM International Conference on Program Comprehension (ICPC)",
    },
    {
        "title": ("Best Paper Award, 55th ACM Technical Symposium on Computer Science " "Education (SIGCSE), 2024."),
        "url": "https://sigcse2024.sigcse.org/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2024",
        "organization": "ACM Technical Symposium on Computer Science Education (SIGCSE)",
    },
    {
        "title": ("Distinguished Paper Award, 20th International Conference on " "Service-Oriented Computing (ICSOC), 2022."),
        "url": "https://icsoc2022.spilab.es/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2022",
        "organization": "International Conference on Service-Oriented Computing (ICSOC)",
    },
    {
        "title": ("Best Paper Award, ACM International Conference on Mining Software " "Repositories (MSR) 2022, Mining Challenge track."),
        "url": "https://conf.researchr.org/home/msr-2022",
        "award_recipients": ["Ali, Ouni"],
        "year": "2022",
        "organization": "ACM International Conference on Mining Software Repositories (MSR)",
    },
    {
        "title": ("Best Paper Award Finalist, 19th International Conference on " "Software and Systems Reuse (ICSR), 2020."),
        "url": "https://icsr2020.wordpress.com/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2020",
        "organization": "International Conference on Software and Systems Reuse (ICSR)",
    },
    {
        "title": ("ACM SIGSOFT Best Paper Award, the 15th ACM/IEEE International " "Conference on Global Software Engineering (ICGSE), 2020."),
        "url": "https://conf.researchr.org/home/icgse-2020",
        "award_recipients": ["Ali, Ouni"],
        "year": "2020",
        "organization": "ACM/IEEE International Conference on Global Software Engineering (ICGSE)",
    },
    {
        "title": ("Best Paper Award, Journal of Energies, 2019."),
        "url": "https://www.mdpi.com/journal/energies/awards/621",
        "award_recipients": ["Ali, Ouni"],
        "year": "2019",
        "organization": "Journal of Energies",
    },
    {
        "title": ("Best Paper Award, the IEEEInternational Workshop on Refactoring " "(IWoR@ICSE), 2019."),
        "url": "https://iwor.github.io/iwor2019/",
        "award_recipients": ["Ali, Ouni"],
        "year": "2019",
        "organization": "IEEE International Workshop on Refactoring (IWoR@ICSE)",
    },
    {
        "title": ("Best Paper Award Runner-up, IEEE International Conference on Web " "Services (ICWS), 2016."),
        "url": "https://www.computer.org/csdl/proceedings/icws/2016/12OmNyQ7G5O",
        "award_recipients": ["Ali, Ouni"],
        "year": "2016",
        "organization": "IEEE International Conference on Web Services (ICWS)",
    },
]

COURSES = [
    {
        "title": "Advanced Topics in Software Desgin",
        "url": "https://www.etsmtl.ca/etudes/cours/MGL843",
        "year": "2019",
        "semester": "F",
        "teacher": "Ali,Ouni",
        "code": "MGL843",
        "level": "GRD",
        "description": "",
    },
    {
        "title": "Programming in Software Engineering",
        "url": "https://www.etsmtl.ca/etudes/cours/LOG100",
        "year": "2020",
        "semester": "W",
        "teacher": "Ali,Ouni",
        "code": "LOG100",
        "level": "UGR",
        "description": "",
    },
    {
        "title": "Software Reegineering",
        "url": "https://www.etsmtl.ca/etudes/cours/LOG530",
        "year": "2021",
        "semester": "W",
        "teacher": "Ali,Ouni",
        "code": "LOG530",
        "level": "UGR",
        "description": "",
    },
    {
        "title": "Software Maintenance",
        "url": "https://www.etsmtl.ca/etudes/cours/MGL804",
        "year": "2021",
        "semester": "W",
        "teacher": "Ali,Ouni",
        "code": "MGL804",
        "level": "GRD",
        "description": "",
    },
]
