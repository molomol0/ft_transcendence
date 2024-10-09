# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    display_name = models.CharField(max_length=30, unique=True)  # Contrainte unique
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # Permet les valeurs nulles
