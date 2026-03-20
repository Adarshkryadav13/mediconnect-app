from django.urls import path
from .views import create_doctor_profile,doctor_list

urlpatterns = [
    path('', doctor_list), 
    path('create/', create_doctor_profile)
]
