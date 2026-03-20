from django.db import models
from users.models import User

# Create your models here.
class Doctor(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    available_from = models.TimeField()
    available_to = models.TimeField()
    photo = models.ImageField(upload_to="doctor_photos/", null=True, blank=True)
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2, default=500)

    def __self__(self):
        return self.user.username 