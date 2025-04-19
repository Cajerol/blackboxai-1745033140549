// js/login.js
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
  
  // Capturar el envío del formulario
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault(); // Evitar el envío tradicional del formulario
          
          // Obtener los datos del formulario
          const formData = new FormData(loginForm);
          
          // Mostrar indicador de carga
          const mensajeError = document.getElementById('mensaje-error');
          mensajeError.textContent = 'Procesando...';
          mensajeError.style.display = 'block';
          
          // Enviar solicitud AJAX
          fetch('auth/auth.php', {
              method: 'POST',
              body: formData,
              headers: {
                  'X-Requested-With': 'XMLHttpRequest'
              }
          })
          .then(response => {
              // Verificar si la respuesta es JSON válido
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                  return response.json();
              } else {
                  // Si no es JSON, muestra el error como texto
                  throw new Error('La respuesta del servidor no es JSON válido');
              }
          })
          .then(data => {
              if (data.exito) {
                  // Si la autenticación fue exitosa, redirigir a home.html
                  window.location.href = 'views/home.html';
              } else {
                  // Mostrar mensaje de error
                  mensajeError.textContent = data.mensaje;
                  mensajeError.style.display = 'block';
              }
          })
          .catch(error => {
              console.error('Error:', error);
              mensajeError.textContent = 'Error de conexión con el servidor. Verifica que el servidor esté funcionando correctamente.';
              mensajeError.style.display = 'block';
          });
      });
  }
  
  // Verificar si hay un mensaje de error en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const errorMsg = urlParams.get('error');
  if (errorMsg) {
      const mensajeError = document.getElementById('mensaje-error');
      mensajeError.textContent = decodeURIComponent(errorMsg);
      mensajeError.style.display = 'block';
  }
});