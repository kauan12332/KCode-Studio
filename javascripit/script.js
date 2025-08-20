document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((container) => {
    const wrapper = container.querySelector(".carousel-wrapper");
    const leftArrow = container.querySelector(".arrow-left");
    const rightArrow = container.querySelector(".arrow-right");

    const scrollAmount = 400; // Pixels por clique
    const autoPlay = false;   // Ativar autoplay automático
    const autoPlayDelay = 3000; // Tempo entre rolagens (ms)
    const infinite = true;   // Loop infinito ativado/desativado

    // --- Funções de rolagem ---
    const scrollLeft = () => {
      if (infinite && wrapper.scrollLeft <= 0) {
        wrapper.scrollTo({ left: wrapper.scrollWidth, behavior: "smooth" });
      } else {
        wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
      updateArrows();
    };

    const scrollRight = () => {
      if (
        infinite &&
        wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth
      ) {
        wrapper.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      updateArrows();
    };

    // --- Atualiza estado das setas ---
    const updateArrows = () => {
      if (!infinite) {
        leftArrow.disabled = wrapper.scrollLeft <= 0;
        rightArrow.disabled =
          wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth;
      }
    };

    // --- Eventos de clique nas setas ---
    leftArrow.addEventListener("click", scrollLeft);
    rightArrow.addEventListener("click", scrollRight);

    // --- Suporte a arrastar com mouse/touch ---
    let isDragging = false;
    let startX;
    let scrollStart;

    const startDrag = (e) => {
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      scrollStart = wrapper.scrollLeft;
      wrapper.classList.add("dragging");
    };

    const onDrag = (e) => {
      if (!isDragging) return;
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX) * 1.5; // Velocidade do arrasto
      wrapper.scrollLeft = scrollStart - walk;
    };

    const stopDrag = () => {
      isDragging = false;
      wrapper.classList.remove("dragging");
    };

    wrapper.addEventListener("mousedown", startDrag);
    wrapper.addEventListener("touchstart", startDrag);
    wrapper.addEventListener("mousemove", onDrag);
    wrapper.addEventListener("touchmove", onDrag);
    wrapper.addEventListener("mouseup", stopDrag);
    wrapper.addEventListener("mouseleave", stopDrag);
    wrapper.addEventListener("touchend", stopDrag);

    // --- Autoplay automático ---
    if (autoPlay) {
      setInterval(scrollRight, autoPlayDelay);
    }

    // Inicializa estado das setas
    updateArrows();
  });
});
