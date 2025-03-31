document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
        });

        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }

    const carrusel = () => {
        const slideContainer = document.querySelector('.carrusel-slide');
        const slides = document.querySelectorAll('.carrusel-slide img');
        const prevBtn = document.querySelector('.carrusel-btn.prev');
        const nextBtn = document.querySelector('.carrusel-btn.next');
        
        if (!slideContainer || slides.length === 0) return;

        let currentIndex = 0;
        const slideWidth = slides[0].clientWidth;
        const totalSlides = slides.length;

        slideContainer.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });

        function goToSlide(index) {
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            currentIndex = index;
            slideContainer.style.transform = `translateX(${-currentIndex * (100 / totalSlides)}%)`;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        window.nextSlide = nextSlide;
        window.prevSlide = prevSlide;

        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].clientWidth;
            slideContainer.style.transform = `translateX(${-currentIndex * (100 / totalSlides)}%)`;
        });
    };

    carrusel();

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector("header")?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});