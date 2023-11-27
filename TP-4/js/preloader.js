document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";
        window.location.href = "index.html";
    }, 4000);

    let progressBar = document.querySelector(".loader-bar");
    let progressText = document.querySelector(".loader-text");

    let interval = setInterval(function () {
        if (progressBar.style.width === "100%") {
            clearInterval(interval);
        } else {
            let currentWidth = parseFloat(progressBar.style.width) || 0;
            let newWidth = Math.min(currentWidth + 10, 100);
            progressBar.style.width = newWidth + "%";
            progressText.textContent = "Cargando... " + Math.round(newWidth) + "%";
        }
    }, 200);
});