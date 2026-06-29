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

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
