from django.contrib import admin

from backend.models import ProjectParticipant, ResearchProject


@admin.register(ResearchProject)
class ResearchProjectAdmin(admin.ModelAdmin):
    readonly_fields = ("project_summary",)

    def project_summary(self, obj):
        return str(obj)

    project_summary.short_description = "Project summary"


@admin.register(ProjectParticipant)
class ProjectParticipantAdmin(admin.ModelAdmin):
    readonly_fields = ("participant_summary",)

    def participant_summary(self, obj):
        return str(obj)

    participant_summary.short_description = "Participant summary"
