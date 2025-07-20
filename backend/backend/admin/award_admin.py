from django.contrib import admin

from backend.models import Award, AwardRecipient


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):

    readonly_fields = ("award_summary",)

    def award_summary(self, obj):
        return str(obj)

    award_summary.short_description = "Award summary"


@admin.register(AwardRecipient)
class AwardRecipientAdmin(admin.ModelAdmin):
    readonly_fields = ("recipient_summary",)

    def recipient_summary(self, obj):
        return str(obj)

    recipient_summary.short_description = "Recipient summary"
