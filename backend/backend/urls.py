from django.urls import path
from .views.publication_views import PublicationListAPI

urlpatterns = [
    path("api/publications/", PublicationListAPI.as_view(), name="stil-publication-list"),
]
