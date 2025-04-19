document.addEventListener('DOMContentLoaded', function() {
  // Función para mostrar/ocultar la contraseña
  window.togglePassword = function() {
      const passwordInput = document.getElementById('contrasena');
      const toggleIcon = document.getElementById('togglePassword');
      
      if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleIcon.textContent = '🔒';
      } else {
          passwordInput.type = 'password';
          toggleIcon.textContent = '👁️';
      }
  };

  // No event listener for form submit, so form submits normally to backend PHP
});
