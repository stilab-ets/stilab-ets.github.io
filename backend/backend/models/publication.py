from django.db import models


class Publication(models.Model):
    ENTRY_TYPE_CHOICES = [
        ("article", "Article"),
        ("book", "Book"),
        ("booklet", "Booklet"),
        ("conference", "Conference"),
        ("inbook", "Inbook"),
        ("incollection", "Incollection"),
        ("inproceedings", "Inproceedings"),
        ("manual", "Manual"),
        ("mastersthesis", "Master's Thesis"),
        ("misc", "Miscellaneous"),
        ("phdthesis", "PhD Thesis"),
        ("proceedings", "Proceedings"),
        ("techreport", "Technical Report"),
        ("unpublished", "Unpublished"),
        ("online", "Online"),
        ("presentation", "Presentation"),
    ]
    id = models.CharField(max_length=255, unique=True, primary_key=True)
    entrytype = models.CharField(max_length=20, choices=ENTRY_TYPE_CHOICES)
    citekey = models.CharField(max_length=255)

    title = models.CharField(max_length=255, null=True, blank=True)
    author = models.CharField(max_length=2000, null=True, blank=True)
    journal = models.CharField(max_length=255, null=True, blank=True)
    booktitle = models.CharField(max_length=255, null=True, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    volume = models.CharField(max_length=255, null=True, blank=True)
    number = models.CharField(max_length=255, null=True, blank=True)
    pages = models.CharField(max_length=255, null=True, blank=True)
    url = models.CharField(max_length=255, null=True, blank=True)

    is_approved = models.BooleanField(default=False)

    def __str__(self):
        """This is the publication's Bibtex"""
        lines = [f"@{self.entrytype}{{{self.citekey},"]

        if self.title:
            lines.append(f"  title={{{self.title}}},")
        if self.author:
            lines.append(f"  author={{{self.author}}},")
        if self.journal:
            lines.append(f"  journal={{{self.journal}}},")
        if self.booktitle:
            lines.append(f"  booktitle={{{self.booktitle}}},")
        if self.publisher:
            lines.append(f"  publisher={{{self.publisher}}},")
        if self.year:
            lines.append(f"  year={{{self.year}}},")
        if self.volume:
            lines.append(f"  volume={{{self.volume}}},")
        if self.number:
            lines.append(f"  number={{{self.number}}},")
        if self.pages:
            lines.append(f"  pages={{{self.pages}}},")
        if self.url:
            lines.append(f"  url={{{self.url}}},")
        lines.append("}")
        return "\n".join(lines)
