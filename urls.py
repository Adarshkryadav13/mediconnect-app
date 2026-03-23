
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView
from users.views import login_view
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("Backend is running 🚀")

urlpatterns = [
    path('', home),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/auth/login/', TokenObtainPairView.as_view()),
    path('api/auth/login/', login_view),
    path('api/auth/', include('users.urls')),
    path('api/doctors/', include('doctors.urls')),
    path('api/appointments/', include('appointments.urls')),
    path('api/symptoms/', include('symptoms.urls')),
    path('api/', include('users.urls')),
    

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

