import threading

from django.core.management import call_command
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

# Lock to prevent concurrent execution
command_lock = threading.Lock()


def run_command_async():
    try:
        call_command("getpublications")
    finally:
        command_lock.release()


class GetPublicationsCommandSerializer(serializers.Serializer):
    status = serializers.CharField()
    message = serializers.CharField(required=False)


class RunGetPublicationsCommandAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_id="Get Publication Command (Member)",
        operation_description="Runs the `getpublications` Admin command. Authentication required (Bearer Token)",
        responses={
            202: GetPublicationsCommandSerializer,
            429: GetPublicationsCommandSerializer,
        },
        tags=["Publication"],
    )
    def post(self, request):
        if command_lock.locked():
            response_serializer = GetPublicationsCommandSerializer(
                {"status": "error", "message": "Command is already running."},
            )
            return Response(
                response_serializer.data,
                status=429,
            )

        command_lock.acquire()
        thread = threading.Thread(target=run_command_async)
        thread.start()

        response_serializer = GetPublicationsCommandSerializer({"status": "started"})
        return Response(response_serializer.data, status=202)
