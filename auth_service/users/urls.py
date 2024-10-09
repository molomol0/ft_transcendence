# users/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_view, login_view  # Assurez-vous d'importer login_view

urlpatterns = [
    path('register/', register_view, name='register'),  # Route pour l'inscription
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # API pour obtenir le token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # API pour rafraîchir le token
    path('login_view/', login_view, name='login_view'),  # Route pour la vue de connexion
]
