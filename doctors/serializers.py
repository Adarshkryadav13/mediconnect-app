from rest_framework import serializers
from .models import Doctor


class DoctorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['specialization', 'available_from', 'available_to']


class DoctorSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "doctor_name",
            "specialization",
            "available_from",
            "available_to",
            "photo",
            "consultation_fee",
        ]
