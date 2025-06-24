from rest_framework import serializers
from ..models.publication import Publication

class PublicationSerializer(serializers.ModelSerializer):
    bibtex = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = [
            "id",
            "entrytype",
            "citekey",
            "title",
            "author",
            "journal",
            "booktitle",
            "publisher",
            "year",
            "volume",
            "number",
            "pages",
            "url",
            "is_approved",
            "bibtex",
        ]

    def get_bibtex(self, obj):
        return str(obj)

