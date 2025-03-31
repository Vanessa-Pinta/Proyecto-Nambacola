document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    let index = 0;
    const slides = document.querySelector(".carrusel-slide");
    const images = document.querySelectorAll(".carrusel-slide img");
    const totalSlides = images.length;

    function showSlide(i) {
        index = (i + totalSlides) % totalSlides; 
        slides.style.transition = "transform 0.5s ease-in-out"; 
        slides.style.transform = `translateX(${-index * 100}%)`;
    }

    document.getElementById("next-btn").addEventListener("click", () => showSlide(index + 1));
    document.getElementById("prev-btn").addEventListener("click", () => showSlide(index - 1));

    setInterval(() => showSlide(index + 1), 3000);

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector("header")?.offsetHeight || 0; // Ajusta si hay una barra fija
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
