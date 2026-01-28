from django.urls import path
from .views import create_doctor_profile

urlpatterns = [
    path('create/', create_doctor_profile)
]
