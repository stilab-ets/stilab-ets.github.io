from django.contrib import admin

from backend.models import Publication


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):

    # Add a readonly field to display the bibtex.
    readonly_fields = ("bibtex",)

    def bibtex(self, obj):
        return str(obj)

    bibtex.short_description = "Bibtex of the publication"
