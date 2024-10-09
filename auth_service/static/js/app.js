document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const responseDiv = document.getElementById('response');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Préparer la requête API pour la connexion
        fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la connexion');
            }
            return response.json(); // Récupère la réponse sous forme JSON
        })
        .then(data => {
            // Affiche les tokens JWT dans le front-end
            responseDiv.innerHTML = `
                <p>Connexion réussie!</p>
                <p>Access Token: ${data.access}</p>
                <p>Refresh Token: ${data.refresh}</p>
            `;

            // Stocker les tokens JWT dans le localStorage (ou autre mécanisme de stockage)
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
        })
        .catch(error => {
            // Affiche un message d'erreur si la connexion échoue
            responseDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
    });
});
