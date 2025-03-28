const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

let index = 0;
const slides = document.querySelector(".carrusel-slide");
const images = document.querySelectorAll(".carrusel-slide img");

function showSlide(i) {
    if (i >= images.length) {
        index = 0;
    } else if (i < 0) {
        index = images.length - 1;
    } else {
        index = i;
    }
    slides.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

