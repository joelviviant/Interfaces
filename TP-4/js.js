document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menuBtn");
    const menu = document.querySelector(".menu");
    const lines = document.querySelectorAll(".line");

    menuBtn.addEventListener("click", function() {
        menu.classList.toggle("show");

        lines.forEach(function(line, index) {
            line.classList.toggle(`line-${index + 1}-cross`);
        });

        menu.querySelectorAll("li").forEach(function(item, index) {
            item.style.transitionDelay = index * 0.1 + "s";
        });

        this.classList.toggle("cross");
    });
});