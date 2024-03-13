// toggle menu
/////////////////////////////////////////// navBar toggle
export function navToggle() {
  //   const menuToggle = document.querySelector(".hamb");
  document.addEventListener("click", (e) => {
    const el = e.target;

    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav");
    if (el.classList.contains("hamb")) {
      const navContainerHeight = navContainer.getBoundingClientRect().height;

      const navLinksHeight = navLinks.getBoundingClientRect().height;

      if (navContainerHeight === 0) {
        navContainer.style.height = `${navLinksHeight}px`;
      } else {
        navContainer.style.height = 0;
      }
    }

    if (!el.classList.contains("hamb")) {
      navContainer.style.height = 0;
    }
  });
}

navToggle();
