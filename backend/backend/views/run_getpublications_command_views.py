import threading

from django.core.management import call_command
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


class RunGetPublicationsCommandAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if command_lock.locked():
            return Response({"status": "error", "message": "Command is already running."}, status=429)

        command_lock.acquire()
        thread = threading.Thread(target=run_command_async)
        thread.start()

        return Response({"status": "started"}, status=202)
