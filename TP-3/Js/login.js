document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".btn-ingresar");
    const loginTickBox = document.getElementById("loginTickBox");
  
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
  
      // Mostrar el recuadro con la tilde y el texto "Bienvenido"
      loginTickBox.style.display = "block";
  
      // Esperar un momento (por ejemplo, 2 segundos) antes de redirigir
      setTimeout(function () {
        window.location.href = "home.html";
      }, 3000); // Cambia este valor según la duración deseada
    });
  });