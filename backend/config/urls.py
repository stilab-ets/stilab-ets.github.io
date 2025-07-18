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

from backend.views.auth_views import LoginView, RegisterView
from backend.views.member_view import MemberListAPI
from backend.views.profile_views import ProfileView
from backend.views.publication_views import PublicationListAPI

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/register", RegisterView.as_view(), name="register"),
    path("api/login", LoginView.as_view(), name="login"),
    path("api/publications/", PublicationListAPI.as_view(), name="publication-list"),
    path("api/profile", ProfileView.as_view(), name="profile"),
    path("api/members", MemberListAPI.as_view(), name="member-list"),
]
