from django.urls import path
from .views import book_appointment, doctor_appointments, my_appointments

urlpatterns = [
    path('book/', book_appointment),
    path('doctor/', doctor_appointments ),
     path("my/", my_appointments),

]
