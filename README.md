# **Projet Pong Multijoueur - ft_transcendence**

## **Description**
Ce projet est un jeu Pong multijoueur en ligne, développé avec Django et basé sur une architecture microservices. Il inclut des fonctionnalités de jeu en temps réel avec WebSockets, un chat intégré, la gestion des utilisateurs via OAuth 2.0, et des mécanismes de sécurité tels que l'authentification à deux facteurs (2FA) et les tokens JWT. Le backend utilise **Server-Side Rendering (SSR)** pour améliorer les performances de rendu.

## **Modules Principaux**

### 1. **Backend avec Django** (1 module majeur)
   - **Description** : Le backend du projet est basé sur le framework Django. Il gère la logique métier principale, la gestion des utilisateurs, et les interactions avec la base de données.
   - **Technologie** : [Django](https://www.djangoproject.com/)

### 2. **Architecture Microservices** (1 module majeur)
   - **Description** : Le projet est conçu en microservices pour diviser la logique de l'application en services indépendants (authentification, gestion des matchs, chat, etc.).
   - **Technologie** : [Docker](https://www.docker.com/) pour containeriser chaque microservice et orchestrer l'ensemble avec **docker-compose**.

### 3. **PostgreSQL + OAuth 2.0 (Authentification externe)** (2 mineurs = 1 module majeur)
   - **Description** : 
     - **PostgreSQL** : Utilisé comme base de données relationnelle pour stocker les informations des utilisateurs, des parties de Pong, et des scores.
     - **OAuth 2.0** : Implémente l'authentification externe via des services comme l'API 42.
   - **Technologies** : [PostgreSQL](https://www.postgresql.org/), [Django OAuth Toolkit](https://django-oauth-toolkit.readthedocs.io/en/latest/)

### 4. **Joueurs distants (Multijoueur en ligne avec WebSockets)** (1 module majeur)
   - **Description** : Utilisation des WebSockets pour permettre des parties en temps réel entre plusieurs joueurs distants. Les mouvements des raquettes et de la balle sont synchronisés en temps réel via le serveur.
   - **Technologie** : [Django Channels](https://channels.readthedocs.io/en/stable/)

### 5. **Live Chat (via WebSockets)** (1 module majeur)
   - **Description** : Un chat intégré permet aux joueurs de communiquer en temps réel avant, pendant et après les parties de Pong.
   - **Technologie** : [Django Channels](https://channels.readthedocs.io/en/stable/)

### 6. **Sécurité (2FA et JWT)** (1 module majeur)
   - **Description** : L'application utilise l'authentification à deux facteurs (2FA) et des tokens JWT pour sécuriser les connexions et gérer les sessions utilisateurs.
   - **Technologie** : [Django Rest Framework SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)

### 7. **Server-Side Rendering (SSR)** (1 module majeur)
   - **Description** : Les pages web sont rendues côté serveur avec Django pour améliorer la performance, le SEO, et l’expérience utilisateur.
   - **Technologie** : [Django Templates](https://docs.djangoproject.com/en/stable/ref/templates/)

---

## **Installation**

### **Prérequis**
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)

### **Étapes d'installation**
1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Bilou0412/ft_transcendence
   cd ft_transcendence
   ```

2. Créez et démarrez les conteneurs Docker :
   ```bash
   docker-compose up --build
   ```

3. Accédez à l'application sur `http://localhost:8000`.

---

## **Utilisation**

1. **Inscription et connexion** : Les utilisateurs peuvent s'inscrire et se connecter via l'API 42 (OAuth 2.0).
2. **Jouer en ligne** : Les utilisateurs peuvent rejoindre ou créer des parties multijoueur en temps réel.
3. **Chat en temps réel** : Les joueurs peuvent discuter en temps réel pendant les parties.

---