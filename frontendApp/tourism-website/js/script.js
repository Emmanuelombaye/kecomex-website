const navButtons = ["pri", "sec", "tri", "quad", "quint", "hex", "hept", "oct"];
const sectionIds = ["home", "events", "destinations", "trips", "about", "services", "conservation", "contact"];

function removeall() {
    $(".cir_border").css("border", "none");
}

navButtons.forEach((btnId, index) => {
    $(`#${btnId}`).on("click", function () {
        removeall();
        $(`#${btnId}`).css("border", "2px solid whitesmoke");
        $(`#${btnId}`).css("border-radius", "20px");
    });
});

// Light/Dark toggle
const checkbox = document.getElementById("checkbox");

function checkDarkMode() {
    if (
        localStorage.getItem("tourism_website_darkmode") !== null &&
        localStorage.getItem("tourism_website_darkmode") === "true"
    ) {
        document.body.classList.add("dark");
        checkbox.checked = true;
    }
}
checkDarkMode();

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.contains("dark")
        ? localStorage.setItem("tourism_website_darkmode", true)
        : localStorage.setItem("tourism_website_darkmode", false);
});

// scroll button

let mybutton = document.getElementById("upbtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Update Navbar While Scrolling
function updateNav() {
    const navLinks = document.querySelectorAll(".nav-links li a");
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section) => section !== null);

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const trigger = window.innerHeight * 0.25;

        if (rect.top <= trigger && rect.bottom > trigger) {
            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            if (navLinks[index]) {
                navLinks[index].classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", updateNav);
document.addEventListener("DOMContentLoaded", updateNav);

// Hero slider
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let sliderInterval;

function goToSlide(index) {
    slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === index);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === index);
    });
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

function startSlider() {
    sliderInterval = setInterval(nextSlide, 6500);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.slide);
        stopSlider();
        goToSlide(idx);
        startSlider();
    });
});

if (slides.length) {
    goToSlide(0);
    startSlider();
}
