
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const wrapper = container.querySelector('.carousel-wrapper');
        const leftArrow = container.querySelector('.arrow-left');
        const rightArrow = container.querySelector('.arrow-right');

        const scrollAmount = 400;

        leftArrow.addEventListener('click', () => {
            wrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            wrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
});
