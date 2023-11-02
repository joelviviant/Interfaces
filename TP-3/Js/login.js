document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".btn-ingresar");
    const loginTickBox = document.getElementById("loginTickBox");
  
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      loginTickBox.style.display = "block";
      setTimeout(function () {
        window.location.href = "home.html";
      }, 3000); 
    });
  });