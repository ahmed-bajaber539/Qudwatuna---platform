  AOS?.init?.({ duration: 700, once: true });

function copyQuote(btn) {
  const card = btn.closest('article');
  if (!card) return;

  const quote = card.querySelector('p')?.innerText?.trim() || '';
  const author = card.querySelector('span')?.innerText?.trim() || '';
  const text = `${quote} — ${author}`;

  navigator.clipboard.writeText(text).then(() => {
    const icon = btn.querySelector('i');
    if (!icon) return;

    icon.className = 'fa-solid fa-check text-white text-lg';

    //إرجاع الأيقونة الأصلية
    setTimeout(() => {
      icon.className = 'fa-regular fa-copy text-lg';
    }, 1500);
  });
}
 // تفعيل قائمة الموبايل
      (function () {
        const btn = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const mainMenu = document.getElementById("mainMenu");
        if (!btn || !mobileMenu || !mainMenu) return;

        btn.addEventListener("click", () => {
          const opened = !mobileMenu.classList.contains("hidden");
          mobileMenu.classList.toggle("hidden");
          btn.setAttribute("aria-expanded", String(!opened));
        });
      })();

      // تهيئة Swiper
      const swiper = new Swiper(".swiper", {
        effect: "coverflow",
        centeredSlides: true,
        grabCursor: true,
        loop: false,
        spaceBetween: 24,
        slidesPerView: 1,
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
        coverflowEffect: {
          rotate: 26,
          depth: 140,
          stretch: 0,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

// زر العودة للأعلى

(function () {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  const show = () => {
    btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  };
  const hide = () => {
    btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  };

  const getScrollTop = () =>
    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

  const onScroll = () => {
    const y = getScrollTop();
    // عتبة صغيرة لتجربة أفضل على الصفحات القصيرة
    if (y > 120) show(); else hide();
  };

  // تأكد أن الحالة الأولية صحيحة
  hide();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  document.addEventListener('DOMContentLoaded', onScroll);
})();
// فتح القصص من بطاقات قدواتنا في الرئيسية
(function () {
  const cards = document.querySelectorAll('[data-story-id]');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-story-id');
      if (id) window.location.href = `story.html?id=${encodeURIComponent(id)}`;
    });
  });
})();
