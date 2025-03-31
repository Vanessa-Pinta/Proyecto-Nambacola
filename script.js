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

    document.querySelector(".next").addEventListener("click", () => showSlide(index + 1));
    document.querySelector(".prev").addEventListener("click", () => showSlide(index - 1));

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop -50, 
                    behavior: "smooth"
                });
            }
        });
    });
});
