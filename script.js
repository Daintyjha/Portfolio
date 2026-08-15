// =============================
// LOAD COMPONENTS
// =============================
function loadComponent(containerId, filePath, callback = null) {
    const container = document.getElementById(containerId);

    if (!container) return;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;

            // Run callback after component loads
            if (callback) callback();
        })
        .catch(error => {
            console.error(error);
        });
}

// =============================
// MOBILE MENU
// =============================
function initializeMobileMenu() {

    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav__menu");

    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        mobileMenu.textContent =
            navMenu.classList.contains("active")
                ? "✖"
                : "☰";
    });

    document.querySelectorAll(".nav__menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            mobileMenu.classList.remove("active");
            mobileMenu.textContent = "☰";

        });

    });
}

// =============================
// PAGE STARTUP
// =============================
document.addEventListener("DOMContentLoaded", () => {

    // Load navbar then activate menu
    loadComponent(
        "navbar-container",
        "navbar.html",
        initializeMobileMenu
    );

    // Load footer
    loadComponent(
        "footer-container",
        "footer.html"
    );

});
