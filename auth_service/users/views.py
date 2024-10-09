# users/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .serializers import RegisterSerializer  # Assurez-vous d'importer le serializer si vous l'utilisez

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response({'message': 'Inscription réussie.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Autre vue d'enregistrement (pour le formulaire HTML)
# users/views.py
# users/views.py
def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        display_name = request.POST.get('display_name')

        # Vérifier si le nom d'affichage existe déjà
        if CustomUser.objects.filter(display_name=display_name).exists():
            return render(request, 'users/register.html', {'error': 'Le nom d\'affichage est déjà pris.'})

        try:
            # Créer un nouvel utilisateur
            user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password,
                display_name=display_name
            )
            user.save()
            login(request, user)
            return redirect('login_view')  # Rediriger vers la vue de connexion

        except IntegrityError as e:
            return render(request, 'users/register.html', {'error': f'Erreur lors de la création de l\'utilisateur: {str(e)}'})

    return render(request, 'users/register.html')


# users/views.py
from django.shortcuts import render

def login_view(request):
    return render(request, 'users/login.html')  # Assurez-vous que login.html existe
