# Utiliser l'image officielle de Python comme base
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de requirements dans l'image
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code de l'application dans l'image
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 8000

# Commande pour lancer le serveur Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
