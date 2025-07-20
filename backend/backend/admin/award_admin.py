from django.contrib import admin

from backend.models import Award


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):

    readonly_fields = ("award_summary",)

    def award_summary(self, obj):
        return str(obj)

    award_summary.short_description = "Award summary"
