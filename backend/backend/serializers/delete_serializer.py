from rest_framework import serializers


class DeleteRequestSerializer(serializers.Serializer):
    id = serializers.UUIDField()


class DeleteResponseSerializer(serializers.Serializer):
    status = serializers.CharField()
