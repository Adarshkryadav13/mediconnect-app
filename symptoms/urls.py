from django.urls import path
from .views import check_symptoms

urlpatterns = [
    path('', check_symptoms),
]
