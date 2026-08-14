/* ---------- نمایش دسته‌بندی محتوای اتاق (بخش ۶: screen-content) ---------- */
let _contentRoom = null;

function openContentForRoom(roomId) {
  const room = (typeof ROOMS !== "undefined") && ROOMS.find(r => r.id === roomId);
  if (!room) return;
  _contentRoom = room;
  showScreen("screen-content");

  const titleEl = document.getElementById("content-title");
  const zonesEl = document.getElementById("content-zones");
  if (titleEl) titleEl.textContent = room.icon + " " + room.name + " — محتوای آموزشی";

  // استخراج تمام آیتمها از views (بدون تکرار بر اساس عنوان+نوع)
  const seen = new Set();
  const views = Object.keys(room.views || {});
  const sections = [];

  views.forEach(viewKey => {
    const view = room.views[viewKey];
    const label = (view && view.label) || VIEW_LABELS[viewKey] || viewKey;
    const hotspots = (view && view.hotspots) || [];
    const items = [];
    hotspots.forEach(h => {
      (h.categories || []).forEach(cat => {
        (cat.items || []).forEach(it => {
          const key = (it.title || "") + "|" + (it.type || "");
          if (seen.has(key)) return;
          seen.add(key);
          items.push(Object.assign({}, it, { _zone: h.title, _cat: cat.title }));
        });
      });
    });
    if (items.length) sections.push({ label, items });
  });

  if (!sections.length) {
    zonesEl.innerHTML = '<div style="text-align:center;color:#7a6b55;padding:3rem;">محتوایی برای این اتاق ثبت نشده است.</div>';
    return;
  }

  zonesEl.innerHTML = sections.map(sec => {
    const cards = sec.items.map(it => {
      const typeIcon = { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯", story: "📖", song: "🎵", craft: "✂️", image: "🖼️" }[it.type] || "🎯";
      const meta = [it._cat, it.age].filter(Boolean).join(" • ");
      const thumb = it.image
        ? '<img class="content-card-thumb" src="' + it.image + '" loading="lazy" onerror="this.style.display=\'none\'" />'
        : '<div class="content-card-thumb content-card-thumb-empty">' + typeIcon + '</div>';
      return '<div class="content-card" onclick="openMediaModal(' + JSON.stringify(it).replace(/"/g, "&quot;") + ')">' +
        thumb +
        '<div class="content-card-body">' +
          '<div class="content-card-title">' + (it.title || "") + '</div>' +
          (meta ? '<div class="content-card-meta">' + meta + '</div>' : '') +
        '</div></div>';
    }).join("");
    return '<div class="content-section">' +
      '<h3 class="content-section-title">' + sec.label + ' <span class="content-section-count">(' + sec.items.length + ')</span></h3>' +
      '<div class="content-card-grid">' + cards + '</div></div>';
  }).join("");
}

(function bindContentBack() {
  const back = document.getElementById("content-back-room");
  if (back) back.addEventListener("click", () => {
    if (_contentRoom) openRoom(_contentRoom.id);
    else showScreen("screen-map");
  });
})();
