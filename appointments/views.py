from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import AppointmentSerializer,DoctorAppointmentSerializer,MyAppointmentSerializer
from users.permissions import IsPatient, IsDoctor
from .models import Appointment

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsPatient])
def book_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(patient=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsDoctor])
def doctor_appointments(request):
    appointments = Appointment.objects.filter( doctor__user=request.user)
    serializer = DoctorAppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsPatient])
def my_appointments(request):
    appointments = Appointment.objects.filter(patient=request.user)
    serializer = MyAppointmentSerializer(appointments, many=True)
    return Response(serializer.data)