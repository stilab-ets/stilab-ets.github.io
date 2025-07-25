# Generated by Django 5.2.1 on 2025-07-22 03:07

import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("backend", "0005_updating_research_project"),
    ]

    operations = [
        migrations.CreateModel(
            name="Course",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=255)),
                ("url", models.URLField(blank=True, null=True)),
                ("year", models.PositiveIntegerField(blank=True, null=True)),
                ("code", models.CharField(max_length=10)),
                ("level", models.CharField(choices=[("UGR", "Undergraduate"), ("GRD", "Graduate")], max_length=3, null=True)),
                ("semester", models.CharField(choices=[("F", "Fall"), ("S", "Summer"), ("W", "Winter")], max_length=1, null=True)),
                ("description", models.TextField(blank=True, null=True)),
                ("teacher", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="backend.member")),
            ],
        ),
    ]
