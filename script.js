const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = form.querySelector(".contact-submit");
    const formData = new FormData(form);

    button.disabled = true;
    button.textContent = "Sending...";

    status.textContent = "";
    status.className = "form-status";

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            status.textContent =
                "Thank you! Your message has been sent successfully.";

            status.classList.add("success");

            form.reset();
        } else {
            const data = await response.json();

            status.textContent =
                data.error ||
                "Sorry, there was a problem sending your message. Please try again.";

            status.classList.add("error");
        }
    } catch (error) {
        status.textContent =
            "Sorry, there was a problem sending your message. Please try again.";

        status.classList.add("error");
    }

    button.disabled = false;
    button.textContent = "Send Message";
});

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            mainNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";
        });

    });
}
