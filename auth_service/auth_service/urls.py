# auth_service/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),  # Interface d'administration
    path('api/auth/', include('users.urls')),  # Routes de l'application users
    path('', RedirectView.as_view(url='/api/auth/login/')),  # Rediriger vers la page de connexion
]
