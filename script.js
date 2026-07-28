const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("[data-contact-form]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

menuToggle.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

mobileNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    body.classList.remove("menu-open");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  observer.observe(item);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const nome = formData.get("nome");
  const empresa = formData.get("empresa") || "Não informado";
  const servico = formData.get("servico");
  const mensagem = formData.get("mensagem") || "Gostaria de mais informações.";
  const texto = encodeURIComponent(`Olá! Vim pelo site da Extintores Santa Helena e gostaria de atendimento.

Nome: ${nome}
Empresa: ${empresa}
Serviço: ${servico}
Mensagem: ${mensagem}`);

  window.open(`https://wa.me/5564974003594?text=${texto}`, "_blank", "noopener");
});

const flipbook = document.querySelector("[data-flipbook]");

if (flipbook) {
  const totalPages = Number(flipbook.dataset.totalPages || 0);
  const currentImage = flipbook.querySelector("[data-book-current]");
  const nextImage = flipbook.querySelector("[data-book-next]");
  const turnImage = flipbook.querySelector("[data-book-turn]");
  const currentNumber = flipbook.querySelector("[data-book-current-number]");
  const progress = flipbook.querySelector("[data-book-progress]");
  const prevButton = flipbook.querySelector("[data-book-prev]");
  const nextButton = flipbook.querySelector("[data-book-next-button]");
  let currentPage = 1;
  let isTurning = false;

  const pageSource = (page) => `assets/images/portfolio/portfolio-page-${String(page).padStart(2, "0")}.png`;
  const turnDuration = 640;

  const preloadPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    const image = new Image();
    image.src = pageSource(page);
  };

  const paintBook = () => {
    const followingPage = currentPage === totalPages ? currentPage : currentPage + 1;
    currentImage.src = pageSource(currentPage);
    currentImage.alt = `Página ${currentPage} do portfólio Extintores Santa Helena`;
    nextImage.src = pageSource(followingPage);
    currentNumber.textContent = String(currentPage).padStart(2, "0");
    progress.style.width = `${(currentPage / totalPages) * 100}%`;
    prevButton.disabled = currentPage === 1 || isTurning;
    nextButton.disabled = currentPage === totalPages || isTurning;
    preloadPage(currentPage - 1);
    preloadPage(currentPage + 1);
  };

  const turnPage = (direction) => {
    const targetPage = currentPage + direction;

    if (isTurning || targetPage < 1 || targetPage > totalPages) {
      return;
    }

    isTurning = true;
    turnImage.src = pageSource(currentPage);
    currentPage = targetPage;
    paintBook();
    flipbook.classList.add(direction > 0 ? "is-forward" : "is-backward");

    window.setTimeout(() => {
      flipbook.classList.remove("is-forward", "is-backward");
      isTurning = false;
      paintBook();
    }, turnDuration);
  };

  prevButton.addEventListener("click", () => turnPage(-1));
  nextButton.addEventListener("click", () => turnPage(1));
  paintBook();
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
