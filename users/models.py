from django.db import models
from django.contrib.auth.models  import AbstractUser 
from django.conf import settings
# Create your models here.
class User(AbstractUser):
    is_doctor = models.BooleanField(default=False)
    
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.FloatField()
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
