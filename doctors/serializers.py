from rest_framework import serializers
from .models import Doctor

class DoctorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['specialization', 'available_from', 'available_to']
