from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models.award import Award
from ..serializers.award_serializer import AwardSerializer


class AwardsView(APIView):
    @swagger_auto_schema(
        operation_id="Get Awards",
        operation_description="Retrieves a list of all awards",
        responses={200: AwardSerializer},
        tags=["Award"],
    )
    def get(self, request):
        awards = Award.objects.all()
        serializer = AwardSerializer(awards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
