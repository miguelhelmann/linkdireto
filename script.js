/**
 * LINK DIRETO — SCRIPT PRINCIPAL
 * Interações leves, acessíveis e focadas em conversão.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initContactAssistant();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.style.backgroundColor = 'rgba(10, 11, 13, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      header.style.backgroundColor = 'rgba(10, 11, 13, 0.85)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-overlay .btn');

  if (!toggleBtn || !overlay) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !overlay.classList.contains('open');
    toggleBtn.classList.toggle('active', isOpen);
    overlay.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fecha ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   3. ASSISTENTE DE CONTATO DIRETO (WHATSAPP & E-MAIL)
   -------------------------------------------------------------------------- */
function initContactAssistant() {
  const typeSelect = document.getElementById('contact-type');
  const nameInput = document.getElementById('contact-name');
  const detailsInput = document.getElementById('contact-details');
  const btnWhatsapp = document.getElementById('btn-contact-whatsapp');
  const btnEmail = document.getElementById('btn-contact-email');
  const copyFeedback = document.getElementById('copy-feedback');

  if (!btnWhatsapp || !btnEmail) return;

  const buildMessage = () => {
    const solution = typeSelect ? typeSelect.value : 'quero conversar sobre um site';
    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '';
    const details = detailsInput && detailsInput.value.trim() ? detailsInput.value.trim() : '';

    let greeting = name ? `Olá! Me chamo ${name}.` : 'Olá!';
    let body = `Visitei o site da Link Direto e ${solution}.`;
    if (details) {
      body += ` Detalhes: "${details}".`;
    }
    body += ' Como podemos iniciar a conversa?';
    return `${greeting} ${body}`;
  };

  btnWhatsapp.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = buildMessage();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  btnEmail.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = buildMessage();
    const mailtoUrl = `mailto:contato@linkdireto.com.br?subject=${encodeURIComponent('Contato — Link Direto')}&body=${encodeURIComponent(msg)}`;
    window.location.href = mailtoUrl;
  });

  // Suporte a copiar a mensagem formatada para a área de transferência
  const btnCopy = document.getElementById('btn-contact-copy');
  if (btnCopy) {
    btnCopy.addEventListener('click', async (e) => {
      e.preventDefault();
      const msg = buildMessage();
      try {
        await navigator.clipboard.writeText(msg);
        if (copyFeedback) {
          copyFeedback.style.display = 'block';
          copyFeedback.textContent = 'Mensagem copiada para a área de transferência!';
          setTimeout(() => {
            copyFeedback.style.display = 'none';
          }, 3500);
        }
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. ANIMAÇÕES SUAVES DE SCROLL (REVEAL)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback caso não suporte
    animatedElements.forEach((el) => el.classList.add('visible'));
  }
}
