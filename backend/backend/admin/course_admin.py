from django.contrib import admin

from backend.models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    readonly_fields = ("course_summary",)

    def course_summary(self, obj):
        return str(obj)

    course_summary.short_description = "Course summary"
