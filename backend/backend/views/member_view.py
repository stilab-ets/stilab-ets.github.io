from rest_framework.generics import ListAPIView

from backend.models.member import Member
from backend.serializers.member_serializer import MemberSerializer


class MemberListAPI(ListAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
