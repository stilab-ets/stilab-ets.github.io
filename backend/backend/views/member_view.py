from rest_framework.generics import ListAPIView

from ..models.member import Member
from ..serializers.member_serializer import MemberSerializer


class MemberListAPI(ListAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
