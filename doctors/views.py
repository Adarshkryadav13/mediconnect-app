from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import DoctorCreateSerializer
from .models import Doctor
from users.permissions import IsDoctor
from .serializers import DoctorSerializer


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsDoctor])

def create_doctor_profile(request):
    if not request.user.is_doctor:
        return Response({"error":"only doctors allowed"}, status=403)
    
    serializer = DoctorCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"message": "Doctor profile created"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def doctor_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)