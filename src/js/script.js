  AOS?.init?.({ duration: 700, once: true });
// زر النسخ الاقتباس
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
      // فلترة + بحث + باجنيشن

(function () {
        const grid = document.getElementById("storiesGrid");
        const filterEl = document.getElementById("groupFilter");
        const searchEl = document.getElementById("storiesSearch");
        const searchBtn = document.getElementById("storiesSearchBtn");
        const pagination = document.getElementById("storiesPagination");
        const emptyMsg = document.getElementById("storiesEmpty");
        const live = document.getElementById("storiesLive");
        if (!grid) return;

        const cards = Array.from(grid.children);
        let state = { group: "all", q: "", page: 1, perPage: getPerPage() };

        function getPerPage() {
          const w = window.innerWidth;
          if (w >= 1024) return 9; // 3×3
          if (w >= 640) return 6; // 2×3
          return 6; // 1×6
        }

        function filtered() {
          const q = state.q.trim().toLowerCase();
          return cards.filter((c) => {
            const g = (c.getAttribute("data-group") || "").toLowerCase();
            const title = (c.getAttribute("data-title") || "").toLowerCase();
            const text = (c.getAttribute("data-text") || "").toLowerCase();
            const gOk = state.group === "all" || g === state.group;
            const qOk = !q || title.includes(q) || text.includes(q);
            return gOk && qOk;
          });
        }

        function render() {
          const list = filtered();
          const total = list.length;
          const pages = Math.max(1, Math.ceil(total / state.perPage));
          if (state.page > pages) state.page = pages;

          // أخفِ جميع البطاقات
          cards.forEach((c) => c.classList.add("hidden"));

          if (total === 0) {
            emptyMsg.classList.remove("hidden");
            pagination.innerHTML = "";
            if (live) live.textContent = "لا توجد نتائج.";
            return;
          } else {
            emptyMsg.classList.add("hidden");
          }

          // اعرض شريحة الصفحة
          const start = (state.page - 1) * state.perPage;
          list
            .slice(start, start + state.perPage)
            .forEach((c) => c.classList.remove("hidden"));

          // بنِ الباجنيشن
          buildPagination(pages);

          // live region
          if (live) {
            const firstIndex = start + 1;
            const lastIndex = Math.min(start + state.perPage, total);
            live.textContent = `عرض ${firstIndex}–${lastIndex} من ${total}. صفحة ${state.page}/${pages}.`;
          }
        }

        function buildPagination(pages) {
          pagination.innerHTML = "";
          const makeBtn = (label, onClick, classes, disabled = false) => {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = label;
            b.className = classes;
            if (disabled) {
              b.disabled = true;
              b.classList.add("opacity-50", "cursor-not-allowed");
            } else b.addEventListener("click", onClick);
            return b;
          };
          const base =
            "px-3 sm:px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-[#B5964D] hover:text-white transition";
          const num =
            "w-9 h-9 sm:w-10 sm:h-10 rounded-md transition font-semibold";

          // السابق
          pagination.appendChild(
            makeBtn(
              "السابق",
              () => {
                state.page--;
                render();
                grid.scrollIntoView({ behavior: "smooth", block: "start" });
              },
              base,
              state.page === 1
            )
          );

          // نافذة أرقام
          const win = 5;
          let s = Math.max(1, state.page - Math.floor(win / 2));
          let e = Math.min(pages, s + win - 1);
          if (e - s + 1 < win) s = Math.max(1, e - win + 1);

          for (let i = s; i <= e; i++) {
            const active = i === state.page;
            pagination.appendChild(
              makeBtn(
                String(i),
                () => {
                  state.page = i;
                  render();
                  grid.scrollIntoView({ behavior: "smooth", block: "start" });
                },
                active
                  ? `${num} bg-[#B5964D] text-white`
                  : `${num} bg-gray-700 text-white hover:bg-[#B5964D]`
              )
            );
          }

          // التالي
          pagination.appendChild(
            makeBtn(
              "التالي",
              () => {
                state.page++;
                render();
                grid.scrollIntoView({ behavior: "smooth", block: "start" });
              },
              base,
              state.page === pages
            )
          );
        }

        // Events
        filterEl.addEventListener("change", () => {
          state.group = filterEl.value;
          state.page = 1;
          render();
        });
        let t;
        const doSearch = () => {
          state.q = searchEl.value;
          state.page = 1;
          render();
        };
        searchEl.addEventListener("input", () => {
          clearTimeout(t);
          t = setTimeout(doSearch, 300);
        });
        searchBtn.addEventListener("click", doSearch);

        // إعادة حساب perPage عند تغيير العرض
        window.addEventListener("resize", () => {
          const n = getPerPage();
          if (n !== state.perPage) {
            state.perPage = n;
            state.page = 1;
            render();
          }
        });

        // بدء
        render();
      })();


