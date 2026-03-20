from django.urls import path
from .views import register,me, login_view
from .views import cart
urlpatterns = [
    path('register/', register),
    path("me/", me),
    path('cart/', cart),
    path('login/', login_view),
]
