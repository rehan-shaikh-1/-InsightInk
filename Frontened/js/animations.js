// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe grid items
document.querySelectorAll('.grid-item').forEach(item => {
    item.classList.add('fade-up');
    observer.observe(item);
});

// Observe scroll items
document.querySelectorAll('.scroll-item').forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
});

// Pause scroll animation on hover
const scrollContainer = document.querySelector('.scroll-container');
if (scrollContainer) {
    scrollContainer.addEventListener('mouseenter', () => {
        scrollContainer.style.animationPlayState = 'paused';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.style.animationPlayState = 'running';
    });
} 