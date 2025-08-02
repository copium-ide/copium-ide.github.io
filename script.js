document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('.scroll-fade');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each section
    sections.forEach(section => {
        observer.observe(section);
    });

});