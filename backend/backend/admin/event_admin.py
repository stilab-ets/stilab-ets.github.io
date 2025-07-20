from django.contrib import admin

from backend.models import Event, EventParticipant


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    readonly_fields = ("event_summary",)

    def event_summary(self, obj):
        return str(obj)

    event_summary.short_description = "Event summary"


@admin.register(EventParticipant)
class EventParticipantAdmin(admin.ModelAdmin):
    readonly_fields = ("participant_summary",)

    def participant_summary(self, obj):
        return str(obj)

    participant_summary.short_description = "Participant summary"
