document.addEventListener("DOMContentLoaded", function() {
    // Tema oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
        });

        // Cargar preferencia guardada
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }

    // Carrusel de imágenes
    const initCarousel = () => {
        const slideContainer = document.querySelector('.carrusel-slide');
        const slides = document.querySelectorAll('.carrusel-slide img');
        const prevBtn = document.querySelector('.carrusel-btn.prev');
        const nextBtn = document.querySelector('.carrusel-btn.next');
        
        if (!slideContainer || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Configuración inicial
        slideContainer.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });

        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            slideContainer.style.transform = `translateX(${-currentIndex * (100 / totalSlides)}%)`;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Autoplay
        let autoplay = setInterval(nextSlide, 5000);
        slideContainer.addEventListener('mouseenter', () => clearInterval(autoplay));
        slideContainer.addEventListener('mouseleave', () => {
            autoplay = setInterval(nextSlide, 5000);
        });

        // Hacer funciones accesibles globalmente
        window.nextSlide = nextSlide;
        window.prevSlide = prevSlide;
    };

    initCarousel();

    // Navegación suave
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerOffset = document.querySelector("header")?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerOffset,
                    behavior: "smooth"
                });
            }
        });
    });
});