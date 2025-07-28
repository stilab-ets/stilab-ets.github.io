from rest_framework import serializers


class DeleteSerializer(serializers.Serializer):
    id = serializers.UUIDField()
