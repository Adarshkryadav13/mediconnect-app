from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor', 'date', 'time']

class DoctorAppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source="patient.username",
        read_only= True
    )
    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient_name",
            "date",
            "time",
        ]

class MyAppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(
        source="doctor.user.username",
        read_only=True
    )
    specialization = serializers.CharField(
        source="doctor.specialization",
        read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "doctor_name",
            "specialization",
            "date",
            "time",
        ]