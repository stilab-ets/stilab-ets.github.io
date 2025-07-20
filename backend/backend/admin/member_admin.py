from django.contrib import admin

from backend.models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "role", "status", "email")
    search_fields = ("first_name", "last_name", "email")
    list_filter = ("role", "status")
    readonly_fields = ("user",)
