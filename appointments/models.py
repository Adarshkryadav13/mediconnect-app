from django.db import models
from users.models  import User 
from doctors.models import Doctor

# Create your models here.
class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'pending'),
        ('confirmed','confirmed'),
        ('cancelled', 'cancelled')
    ]

    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=20 , choices=STATUS_CHOICES, default='pending')
