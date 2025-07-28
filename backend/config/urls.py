"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from backend.views.auth_views import LoginView, RegisterView
from backend.views.awards_view import AwardsView
from backend.views.courses_view import CoursesView
from backend.views.events_view import EventsView
from backend.views.member_view import MemberListAPI
from backend.views.profile_views import ProfileView
from backend.views.publication_views import PublicationListAPI
from backend.views.research_views import ResearchAPI
from backend.views.run_getpublications_command_views import (
    RunGetPublicationsCommandAPIView,
)

schema_view = get_schema_view(
    openapi.Info(
        title="STIL API",
        default_version="v1",
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="swagger",
    ),
    path("admin/", admin.site.urls),
    path("api/register", RegisterView.as_view(), name="register"),
    path("api/login", LoginView.as_view(), name="login"),
    path("api/publications", PublicationListAPI.as_view(), name="publication-list"),
    path("api/profile", ProfileView.as_view(), name="profile"),
    path("api/members", MemberListAPI.as_view(), name="member-list"),
    path("api/awards", AwardsView.as_view(), name="awards"),
    path("api/researches", ResearchAPI.as_view(), name="research"),
    path(
        "run-getpublications-command",
        RunGetPublicationsCommandAPIView.as_view(),
        name="run-getpublications-command",
    ),
    path("api/courses", CoursesView.as_view(), name="courses"),
    path("api/events", EventsView.as_view(), name="events"),
]
