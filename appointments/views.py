from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import AppointmentSerializer
from users.permissions import IsPatient

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsPatient])
def book_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(patient=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

