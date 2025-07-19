from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.award import Award
from ..serializers.award_serializer import AwardSerializer


class AwardsView(APIView):
    def get(self, request):
        awards = Award.objects.all()
        serializer = AwardSerializer(awards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
