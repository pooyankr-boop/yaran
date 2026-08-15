/*
  پخش‌کننده محتوا — PDF / ویدیو / صوت + کتابخوان تصویری
  باز شدن از بایگانی / جستجو / منوی شیشه‌ای / کاوشگر
*/

/* ---------- Enhanced Media Modal ---------- */
function openMediaModal(item) {
  // If has image → open as image reader
  if (item.image && item.type === "pdf") {
    openMediaReader(item);
    return;
  }
  // If activity with instructions → show details
  if (item.type === "activity" || item.type === "game") {
    showItemDetails(item, "");
    return;
  }

  const modal = document.getElementById("media-modal");
  const header = document.getElementById("media-header");
  const body = document.getElementById("media-body");
  const actions = document.getElementById("media-actions");

  header.innerHTML = '<span>' + getTypeIcon(item.type) + '</span> — ' + item.title;

  if (item.type === "pdf") {
      // فایلهای صوتی/تصویری که pdf تگ شدهاند (تزریق MAHD) → مینیپلیر
      if (/\.(mp4|webm|m4a|mp3|ogg|wav)(\?|#|$)/i.test(item.url || "")) {
        if (typeof openMiniPlayer === "function") {
          openMiniPlayer(item);
          modal.classList.add("hidden");
          modal.classList.remove("active");
          return;
        }
      }
      const canProxy = APP_API_ONLINE; // فقط وقتی سرور بالاست پراکسی تلاش کن
    body.innerHTML =
      '<div class="pdfjs-wrap">' +
      (canProxy
        ? '<div id="pdfjs-status">در حال بارگذاری PDF...</div><canvas id="pdfjs-canvas"></canvas>'
        : '<div class="pdf-iframe-wrap"><iframe src="' + item.url + '#toolbar=1&view=FitH" class="media-iframe" title="' + item.title + '"></iframe></div>') +
      '</div>';
    actions.innerHTML = '<a href="' + item.url + '" target="_blank" class="pill-btn" download>📥 دانلود</a>';
    if (canProxy) loadPdfIntoCanvas(item.url);
  } else if (item.type === "video") {
      // ویدیوی محلی → مینیپلیر؛ ویدیوی خارجی (یوتیوب/امبد) → iframe
      if (/\.(mp4|webm)(\?|#|$)/i.test(item.url || "")) {
        if (typeof openMiniPlayer === "function") {
          openMiniPlayer(item);
          modal.classList.add("hidden");
          modal.classList.remove("active");
          return;
        }
      }
      body.innerHTML = '<div class="media-iframe-wrap"><iframe src="' + item.url + '" class="media-iframe" allowfullscreen title="' + item.title + '"></iframe></div>';
      actions.innerHTML = '<a href="' + item.url + '" target="_blank" class="pill-btn" download>📥 دانلود</a>';
    } else if (item.type === "audio") {
    // Route audio items to the real in-page mini player so the file actually plays.
    if (typeof openMiniPlayer === "function") {
      openMiniPlayer(item);
      modal.classList.add("hidden");
      modal.classList.remove("active");
    } else {
      body.innerHTML = '<div style="padding:2rem;text-align:center"><a href="' + item.url + '" target="_blank" class="pill-btn">▶ پخش در کستباکس</a></div>';
    }
    return;
  }

  modal.classList.remove("hidden");
  modal.classList.add("active");
}

/* ---------- Image Reader (Book-style for somayehrouhi) ---------- */
let readerImages = [];
let readerIndex = 0;
let readerItem = null;

function openMediaReader(item) {
  readerItem = item;
  readerIndex = 0;

  // Build image list: item.image + any additional images from ARCHIVE_DATA
  readerImages = [];
  if (item.image) {
    readerImages.push({ url: item.image, desc: item.desc || "", title: item.title });
  }
  // If item has images array
  if (item.images && item.images.length > 0) {
    item.images.forEach(img => {
      if (img.url && !readerImages.find(r => r.url === img.url)) {
        readerImages.push({ url: img.url, desc: img.desc || "", title: img.title || item.title });
      }
    });
  }

  // Use modal
  const modal = document.getElementById("media-modal");
  const header = document.getElementById("media-header");
  const body = document.getElementById("media-body");
  const actions = document.getElementById("media-actions");

  header.innerHTML = '<span>📖</span> — ' + item.title;

  renderReaderPage(body, actions);

  modal.classList.remove("hidden");
  modal.classList.add("active");
}

function renderReaderPage(body, actions) {
  if (readerImages.length === 0) {
    body.innerHTML = '<div style="text-align:center;padding:3rem;color:#999;">تصویری موجود نیست</div>';
    actions.innerHTML = '';
    return;
  }

  const img = readerImages[readerIndex];
  const total = readerImages.length;
  const hasMultiple = total > 1;

  // Build description HTML
  let descHtml = '';
  if (img.desc) {
    descHtml = '<h4>' + (img.title || readerItem.title) + '</h4>';
    descHtml += '<div style="white-space:pre-wrap;line-height:2;">' + img.desc + '</div>';
  } else {
    descHtml = '<h4>' + readerItem.title + '</h4>';
    descHtml += '<div style="color:#999;text-align:center;padding:2rem;">توضیحی موجود نیست</div>';
  }

  // Source link
  if (readerItem.page) {
    descHtml += '<div class="desc-source">منبع: <a href="' + readerItem.page + '" target="_blank">samayehrouhi.ir</a></div>';
  }

  // Navigation
  let navHtml = '';
  if (hasMultiple) {
    navHtml = '<div class="media-reader-nav">';
    navHtml += '<button onclick="readerPrev()">◀</button>';
    navHtml += '<span style="color:#fff;font-size:.85rem;padding:0 8px;">' + (readerIndex + 1) + ' / ' + total + '</span>';
    navHtml += '<button onclick="readerNext()">▶</button>';
    navHtml += '</div>';
  }

  body.innerHTML =
    '<div class="media-reader">' +
    '<div class="media-reader-images">' +
    '<img class="media-reader-img" src="' + img.url + '" alt="' + (img.title || readerItem.title) + '" />' +
    navHtml +
    '</div>' +
    '<div class="media-reader-desc">' + descHtml + '</div>' +
    '</div>';

  // Actions
  let actionsHtml = '';
  if (readerItem.url) {
    actionsHtml += '<a href="' + readerItem.url + '" target="_blank" class="pill-btn" download>📥 دانلود PDF</a>';
  }
  actionsHtml += '<button class="pill-btn" onclick="readerPrint()">🖨️ پرینت</button>';
  if (readerItem.page) {
    actionsHtml += '<a href="' + readerItem.page + '" target="_blank" class="pill-btn">🔗 مشاهده در سایت</a>';
  }
  if (hasMultiple) {
    actionsHtml += '<button class="pill-btn" onclick="readerZoom()">🔍 بزرگ‌نمایی</button>';
  }
  actions.innerHTML = actionsHtml;
}

function readerNext() {
  if (readerIndex < readerImages.length - 1) {
    readerIndex++;
    const body = document.getElementById("media-body");
    const actions = document.getElementById("media-actions");
    renderReaderPage(body, actions);
  }
}

function readerPrev() {
  if (readerIndex > 0) {
    readerIndex--;
    const body = document.getElementById("media-body");
    const actions = document.getElementById("media-actions");
    renderReaderPage(body, actions);
  }
}

function readerPrint() {
  const img = readerImages[readerIndex];
  if (!img) return;
  const w = window.open("", "_blank");
  w.document.write('<html><head><title>' + readerItem.title + '</title>');
  w.document.write('<style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;}img{max-width:100%;max-height:90vh;}@media print{img{max-width:100%;}}</style>');
  w.document.write('</head><body>');
  w.document.write('<img src="' + img.url + '" />');
  w.document.write('</body></html>');
  w.document.close();
  w.print();
}

function readerZoom() {
  const img = readerImages[readerIndex];
  if (!img) return;
  window.open(img.url, "_blank");
}

function getTypeIcon(type) {
  return { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯" }[type] || "🎯";
}

/* ---------- PDF.js — نمایش زنده‌ی PDF از طریق پراکسی سرور (فاز ۳) ---------- */
let pdfDoc = null;
let pdfPageNum = 1;

async function loadPdfIntoCanvas(url) {
  pdfDoc = null;
  pdfPageNum = 1;
  const statusEl = document.getElementById("pdfjs-status");
  if (typeof pdfjsLib === "undefined") {
    if (statusEl) statusEl.textContent = "امکان نمایش زنده‌ی PDF فراهم نیست (کتابخانه‌ی PDF.js لود نشد). از دکمه‌ی دانلود استفاده کنید.";
    return;
  }
  const proxyUrl = API_BASE.replace("/api", "") + "/api/pdf-proxy?url=" + encodeURIComponent(url) + "&tenant=" + API_TENANT;
  try {
    const loadingTask = pdfjsLib.getDocument(proxyUrl);
    pdfDoc = await loadingTask.promise;
    await renderPdfPage(pdfPageNum);
  } catch (e) {
    console.warn("PDF.js failed to load:", e);
    if (statusEl) statusEl.textContent = "نمایش زنده‌ی این فایل ممکن نشد؛ از دکمه‌ی دانلود استفاده کنید.";
  }
}

async function renderPdfPage(num) {
  if (!pdfDoc) return;
  const page = await pdfDoc.getPage(num);
  const canvas = document.getElementById("pdfjs-canvas");
  if (!canvas) return;
  const containerWidth = (canvas.parentElement && canvas.parentElement.clientWidth) || 700;
  const unscaled = page.getViewport({ scale: 1 });
  const scale = Math.max(0.4, Math.min(2.2, containerWidth / unscaled.width));
  const viewport = page.getViewport({ scale });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;
  const statusEl = document.getElementById("pdfjs-status");
  if (statusEl) statusEl.style.display = "none";
  const ind = document.getElementById("pdf-page-indicator");
  if (ind) ind.textContent = pdfPageNum + " / " + pdfDoc.numPages;
}

// دلگیت‌شده روی document چون دکمه‌های prev/next هر بار داخل مدال دوباره ساخته می‌شوند
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "pdf-prev") {
    if (pdfDoc && pdfPageNum > 1) { pdfPageNum--; renderPdfPage(pdfPageNum); }
  } else if (e.target && e.target.id === "pdf-next") {
    if (pdfDoc && pdfPageNum < pdfDoc.numPages) { pdfPageNum++; renderPdfPage(pdfPageNum); }
  }
});
