from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.event import Event
from ..serializers.delete_serializer import DeleteSerializer
from ..serializers.event_serializer import EventSerializer


class EventsView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    @swagger_auto_schema(
        operation_id="Get Events",
        operation_description="Retrieves a list of all events",
        responses={200: EventSerializer},
        tags=["Events"],
    )
    def get(self, request):
        courses = get_list_or_404(Event)
        serializer = EventSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id="Create Events",
        operation_description="Creates a new event",
        responses={201: EventSerializer},
        tags=["Events"],
    )
    def post(self, request):
        existing = Event.objects.filter(id=request.data.get("id")) | Event.objects.filter(citekey=request.data.get("citekey"))

        if existing.exists():
            return Response(
                {"error": "An event with this ID or citekey already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Update Events",
        operation_description="Updates an event",
        responses={200: EventSerializer},
        tags=["Events"],
    )
    def put(self, request):
        existing = Event.objects.filter(id=request.data.get("id")) | Event.objects.filter(citekey=request.data.get("citekey"))

        if not existing.exists():
            return Response(
                {"error": "The event you are trying to update does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        event = existing.first()
        serializer = EventSerializer(instance=event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id="Delete events",
        operation_description="Deletes an event",
        responses={204: DeleteSerializer},
        tags=["Events"],
    )
    def delete(self, request):
        event = get_object_or_404(Event, id=request.data.get("id"))
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
