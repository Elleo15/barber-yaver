/* ============================================
   YAVƏR SƏRDARLІ — BARBER WEBSITE
   script.js — Bütün JavaScript funksiyalar
   ============================================ */

/* ---- CARİ DİL ---- */
// Default dil Azərbaycanca
let currentLang = "az";

/* ============================================
   1. DİL SİSTEMİ
   Bütün data-az / data-ru / data-en atributlu
   elementləri tapıb mətnini dəyişir
   ============================================ */
function setLanguage(lang) {
  currentLang = lang;

  // Dil düymələrini yenilə
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // data-{lang} atributu olan bütün elementləri yenilə
  document.querySelectorAll(`[data-${lang}]`).forEach((el) => {
    const newText = el.getAttribute(`data-${lang}`);
    if (newText) {
      // Düymə və ya input deyilsə mətnini dəyiş
      if (el.tagName !== "INPUT" && el.tagName !== "SELECT") {
        el.textContent = newText;
      }
    }
  });

  // Input placeholder-larını yenilə
  document.querySelectorAll(`[data-placeholder-${lang}]`).forEach((el) => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });

  // Select option-larını yenilə
  document
    .querySelectorAll("select option[data-" + lang + "]")
    .forEach((option) => {
      option.textContent = option.getAttribute(`data-${lang}`);
    });

  // HTML lang atributunu yenilə
  document.documentElement.lang = lang;

  setupWorkingHours(); // ← bunu əlavə et
}

/* ============================================
   2. STICKY NAVİQASİYA
   Scroll edəndə nav arxa fonu dəyişir
   ============================================ */
function handleNavScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

/* ============================================
   3. ACTİVE SECTİON HİGHLİGHT
   Hansı bölmədə olduğunu nav-da göstərir
   ============================================ */
function handleActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPos = window.scrollY + 120; // Nav hündürlüyü + offset

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* ============================================
   4. FADE-IN ANİMASİYALAR
   Scroll edəndə elementlər görünür
   ============================================ */
function setupFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Bir dəfə görüngəndən sonra observer-i dayandır
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // %10 görünəndə işə düşür
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Bütün fade-in elementlərini izlə
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
}

/* ============================================
   5. QALEREYa VİDEO HOVER
   Hover-da video oynayır, çıxanda dayanır
   ============================================ */
function setupGalleryVideos() {
  const isMobile = window.innerWidth <= 768;
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Lazy load — video görünəndə yüklənir
  const lazyVideos = document.querySelectorAll('video[data-src]');
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.dataset.src;
        video.load();
        videoObserver.unobserve(video);
      }
    });
  }, { rootMargin: '200px' });

  lazyVideos.forEach(video => videoObserver.observe(video));

  galleryItems.forEach((item) => {
    const video = item.querySelector("video");
    if (!video) return;

    if (isMobile) {
      // Mobil — görünəndə oynayır (lazy load sonra)
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && video.src) {
            video.play().catch(() => {});
          }
        });
      });
      obs.observe(video);
      return;
    }
    // Lightbox - kliklədikdə açılır
item.addEventListener("click", () => {
  const src = video.src || video.dataset.src;
  if (!src) return;
  const lbVideo = document.getElementById("lightboxVideo");
  const lb = document.getElementById("lightbox");
  lbVideo.src = src;
  lbVideo.play();
  lb.classList.add("open");
});
    item.addEventListener("mouseenter", () => {
      video.play().catch(() => { video.muted = true; video.play(); });
    });

    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

/* ============================================
   6. MOBİL HAMBURGER MENYUSU
   ============================================ */
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Nav linkə klikləndə menyu bağlanır
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/* ============================================
   7. REZERVASİYA FORMU
   Məlumatları WhatsApp mesajına çevirir
   ============================================ */
function setupBookingForm() {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Səhifə yenilənməsin

    // Form məlumatlarını al
    const name = document.getElementById("clientName").value.trim();
    const service = document.getElementById("serviceSelect").value;
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;

    // Tarix formatını gözəlləşdir (YYYY-MM-DD → DD.MM.YYYY)
    let formattedDate = date;
    if (date) {
      const [y, m, d] = date.split("-");
      formattedDate = `${d}.${m}.${y}`;
    }

    // Dil seçiminə görə mesaj mətni
    let message = "";
    if (currentLang === "az") {
      message = `Salam! Rezervasiya etmək istəyirəm.\n\nAd: ${name}\nXidmət: ${service}\nTarix: ${formattedDate}\nSaat: ${time}`;
    } else if (currentLang === "ru") {
      message = `Здравствуйте! Хочу записаться.\n\nИмя: ${name}\nУслуга: ${service}\nДата: ${formattedDate}\nВремя: ${time}`;
    } else {
      message = `Hello! I'd like to book an appointment.\n\nName: ${name}\nService: ${service}\nDate: ${formattedDate}\nTime: ${time}`;
    }

    // Bərbərin WhatsApp nömrəsi (ölkə kodu ilə, + işarəsiz)
    const phone = "994559957549";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // WhatsApp-ı yeni tabda aç
    window.open(whatsappUrl, "_blank");
  });

  // Bugündən əvvəlki tarixləri seçilməz et
  const dateInput = document.getElementById("bookingDate");
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // Çərşənbə axşamı (istirahət günü) seçilməz et
  dateInput.addEventListener("change", () => {
    const selectedDate = new Date(dateInput.value);
    const dayOfWeek = selectedDate.getDay(); // 0=Bazar, 1=B.E, 2=Ç.A ...

    // 2 = Çərşənbə axşamı (istirahət günü)
    if (dayOfWeek === 4) {
      let msg = "";
      if (currentLang === "az")
        msg = "Çərşənbə axşamı istirahət günüdür. Başqa bir gün seçin.";
      else if (currentLang === "ru")
        msg = "Вторник — выходной. Пожалуйста, выберите другой день.";
      else msg = "Tuesday is a day off. Please select another day.";

      alert(msg);
      dateInput.value = "";
    }
  });
}

/* ============================================
   8. SCROLL EVENT LİSTENER
   Nav scroll + active section - birlikdə
   ============================================ */
function setupScrollListeners() {
  window.addEventListener(
    "scroll",
    () => {
      handleNavScroll();
      handleActiveSection();
    },
    { passive: true },
  ); // passive:true - performans üçün
}

/* ============================================
   9. DİL DÜYMƏLƏRİ
   ============================================ */
function setupLangButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

/* ============================================
   10. İŞ SAATLARI
   ============================================ */
function setupWorkingHours() {
  const days = {
    az: ["Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə","Bazar"],
    ru: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
    en: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
  };

  const now = new Date();
  const currentDay = (now.getDay() + 6) % 7;
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isOpen = currentHour >= 10 && currentHour < 19;

  const grid = document.getElementById("hoursGrid");
  const badge = document.getElementById("statusBadge");

  grid.innerHTML = days[currentLang].map((day, i) => {
    const isOff = i === 3;
    const isToday = i === currentDay;
    return `
      <div class="hours-row ${isToday ? "today" : ""}">
        <span class="hours-day">${day}</span>
        <span class="hours-time ${isOff ? "closed" : "open"}">
          ${isOff ? (currentLang === "az" ? "İstirahət" : currentLang === "ru" ? "Выходной" : "Day Off") : "10:00 – 19:00"}
        </span>
      </div>
    `;
  }).join("");

  const isOffToday = currentDay === 3;
  if (isOffToday) {
    badge.className = "status-badge closed";
    badge.textContent = currentLang === "az" ? "🔴 Bu gün istirahətdir" : currentLang === "ru" ? "🔴 Сегодня выходной" : "🔴 Closed today";
  } else if (isOpen) {
    badge.className = "status-badge open";
    badge.textContent = currentLang === "az" ? "🟢 İndi açıqdır" : currentLang === "ru" ? "🟢 Сейчас открыто" : "🟢 Open now";
  } else {
    badge.className = "status-badge closed";
    badge.textContent = currentLang === "az" ? "🔴 İndi bağlıdır" : currentLang === "ru" ? "🔴 Сейчас закрыто" : "🔴 Closed now";
  }
}


/* ============================================
   BAŞLANĞIC - Bütün funksiyaları işə sal
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  setupLangButtons();
  setupFadeIn();
  setupGalleryVideos();
  setupHamburger();
  setupBookingForm();
  setupScrollListeners();
  setupWorkingHours();
  handleNavScroll();
  handleActiveSection();

   // Lightbox bağla
document.getElementById("lightboxClose").addEventListener("click", () => {
  const lb = document.getElementById("lightbox");
  const lbVideo = document.getElementById("lightboxVideo");
  lb.classList.remove("open");
  lbVideo.pause();
  lbVideo.src = "";
});

// Arxa fona klikləndə bağla
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById("lightboxClose").click();
  }
});
  console.log("✂️ Yavər Sərdarlı — Barber Website Yükləndi");
});
