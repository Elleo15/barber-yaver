# ✂️ Yavər Sərdarlı — Barber Website

Yavər Sərdarlının şəxsi bərbər saytı. Xalis HTML, CSS və JavaScript ilə yazılmışdır — heç bir framework lazım deyil.

---

## 📁 Fayl Strukturu

```
barber-yaver/
├── index.html      → Saytın əsas strukturu
├── style.css       → Bütün stillər və responsive dizayn
├── script.js       → JavaScript funksiyalar
├── yaver.png       → Əsas şəkil (nav avatar + favicon)
└── README.md       → Bu fayl
```

---

## 🚀 Necə İşlədim

Brauzerdə `index.html` faylını aç — qurtardı. Server, npm, heç nə lazım deyil.

---

## 🌐 Bölmələr

| Bölmə | ID | Açıqlama |
|---|---|---|
| Hero | `#hero` | Arxa fon videosu, ad, tagline, rezervasiya düyməsi |
| Haqqımda | `#about` | Bio, əlaqə məlumatları, iş saatları (canlı status) |
| Xidmətlər | `#services` | Xidmət siyahısı (qiymətlər dəyişdirilə bilər) |
| Qalereya | `#gallery` | 12 video, 4×3 grid, hover ilə oynayır |
| Rezervasiya | `#booking` | Form → WhatsApp-a avtomatik göndərir |
| Məhsullar | `#products` | Tezliklə — öz brend məhsulları üçün |

---

## ✏️ Ən Çox Dəyişdiriləcək Yerlər

### Qiymətləri dəyişmək
`index.html`-də `— AZN` yazan yerləri tap, rəqəm yaz:
```html
<span class="service-price">— AZN</span>
                              ↓
<span class="service-price">15 AZN</span>
```

### Yeni xidmət əlavə etmək
`index.html`-də `services-grid` div-inin içinə yeni kart əlavə et:
```html
<div class="service-card">
  <span class="service-name"
        data-az="Yeni xidmət"
        data-ru="Новая услуга"
        data-en="New Service">Yeni xidmət</span>
  <span class="service-price">20 AZN</span>
</div>
```

### Arxa fon videosunu dəyişmək
`index.html`-də bu sətri tap:
```html
src="https://res.cloudinary.com/daboan94r/video/upload/v1777292776/main_bg7jox.mp4"
```
Linki yeni Cloudinary linki ilə əvəz et.

### Qalereya videosu əlavə/dəyişmək
`index.html`-də `gallery-item` video `src`-lərini dəyiş:
```html
<video src="YENİ_CLOUDİNARY_LİNK" muted loop playsinline preload="metadata"></video>
```

### Məhsullar bölməsini doldurmaq
`index.html`-də `coming-soon-wrap` div-ini sil, yerinə məhsul kartları əlavə et.

---

## 🌍 Çoxdilli Sistem

Sayt AZ / RU / EN dillərini dəstəkləyir. Hər mətn elementi 3 dil atributu daşıyır:

```html
<p data-az="Azərbaycanca mətn"
   data-ru="Rusca mətn"
   data-en="English text">
  Azərbaycanca mətn
</p>
```

Yeni mətn əlavə edəndə həmişə 3 dilin hamısını yaz.

---

## 📱 Mobil

- Bütün bölmələr mobil üçün optimallaşdırılıb
- Nav → hamburger menyuya çevrilir (768px altı)
- Qalereya → mobil ekranda videolar avtomatik oynayır (hover yoxdur)
- Hero → şəkil yuxarı, mətn aşağı düzülür

---

## 📅 İş Saatları Məntiqi

`script.js`-dəki `setupWorkingHours()` funksiyası:
- Hər gün yaşıl `10:00 – 19:00` göstərir
- **Çərşənbə axşamı** (index 1) qırmızı `İstirahət` göstərir
- Bu günün sətri `accent` rəngi ilə vurğulanır
- Cari vaxta görə `🟢 İndi açıqdır` / `🔴 İndi bağlıdır` statusu göstərir
- İstirahət gününü dəyişmək üçün `script.js`-də `isOff = i === 1` sətirindəki rəqəmi dəyiş (0=B.E, 1=Ç.A, 2=Ç, 3=C.A, 4=C, 5=Ş, 6=B)

---

## 📬 Rezervasiya Formu

Form göndərildikdə WhatsApp açılır, avtomatik mesaj yazılır:
```
Salam! Rezervasiya etmək istəyirəm.

Ad: [ad]
Xidmət: [xidmət]
Tarix: [tarix]
Saat: [saat]
```

WhatsApp nömrəsini dəyişmək üçün `script.js`-də:
```javascript
const phone = "994559957549"; // ← bunu dəyiş
```

---

## 🎨 Rəng Dəyişkənləri

`style.css`-də `:root` içindəki dəyişkənlər:

```css
--accent: #c9a96e;       /* Qızılı accent rəngi */
--black: #080808;        /* Arxa fon */
--white: #f4f1ec;        /* Əsas mətn */
```

---

## ☁️ Cloudinary Videoları

Bütün videolar Cloudinary-də saxlanılır. Video silinərsə saytda da görünməz — silmə!

| Fayl | İstifadə |
|---|---|
| `main_bg7jox.mp4` | Arxa fon videosu (bütün səhifədə) |
| `video-1` → `video-12` | Qalereya (4×3 grid) |

---

## 👨‍💻 Developer

**Elvin Eyvazov** — [@e1vin.eyvazov](https://instagram.com/e1vin.eyvazov)
