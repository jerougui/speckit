export function renderLoginScreen(root, { onSubmit }) {
  root.innerHTML = `
    <section class="auth-screen">
      <div class="auth-panel">
        <h2>Connexion</h2>
        <p>Connectez-vous pour accéder à l'organisateur d'albums.</p>
        <form id="login-form">
          <label for="login-username">Nom d'utilisateur</label>
          <input id="login-username" name="username" type="text" autocomplete="username" required />

          <label for="login-password">Mot de passe</label>
          <input id="login-password" name="password" type="password" autocomplete="current-password" required />

          <button type="submit">Se connecter</button>
        </form>
        <div id="login-error" class="auth-error" aria-live="polite"></div>
      </div>
    </section>
  `;

  const form = root.querySelector('#login-form');
  const errorElement = root.querySelector('#login-error');

  function setError(message) {
    errorElement.textContent = message || '';
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const username = root.querySelector('#login-username').value.trim();
    const password = root.querySelector('#login-password').value;
    setError('');
    onSubmit?.({ username, password, setError });
  });

  return {
    setError
  };
}
