/*
  CMS Admin Panel — tree-view content explorer & editor
  Reads from window.ROOMS and window.AUDIO_LIBRARY
  CSS prefix: .cms-
*/
(function () {
  "use strict";
  var _selectedItem = null;
  var _expandedNodes = {};
  var _searchQuery = "";
  var _changedItems = [];
  var _tagFilter = "";
  var _fileTreeOpen = false;

  /* ---------- file tree data ---------- */
  var _fileTree = {
    "js/": ["admin-cms.js","api.js","app.js","archive-hotspot-fix.js","archive-somayehrouhi.js","audio-library.js","auth.js","castbox_episodes_full.js","config.js","content.js","corner-content.js","explorer.js","games.js","games2.js","inject-audio.js","khaneh-yadgiri-desc.js","lobby.js","mahd-content.js","mahd-explorer-data.js","media.js","mini-player.js","music.js","orphan-fix.js","room-fixes.js","rooms.js","tags.js","task-board.js","tour.js","video-library.js","virtual-tour.js","yr-player.js","zwnj.js"],
    "css/": ["main.css","task-board.css","vt.css","yr-player.css"],
    "server/": ["index.js","package.json","start-all.js","telegram-bot.js"],
    "data/": ["config.json","istgah.html","panel.json","podcast-research.json","tasks.json","users.json"]
  };

  /* ---------- helpers ---------- */
  function esc(s) {
    if (!s) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function uid() { return "item-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7); }
  function nodeKey(parts) { return parts.join("||"); }
  function isExpanded(k) { return _expandedNodes[k] === true; }
  function toggle(k) { _expandedNodes[k] = !isExpanded(k); }
  function matchesSearch(text) { return !_searchQuery || (text || "").indexOf(_searchQuery) !== -1; }

  /* ---------- count helpers ---------- */
  function countItems(cat) { return (cat.items || []).length; }
  function countCats(hs) { return (hs.categories || []).reduce(function (s, c) { return s + countItems(c); }, 0); }
  function countHotspots(view) { return (view.hotspots || []).reduce(function (s, h) { return s + countCats(h); }, 0); }

  /* ---------- tree badge ---------- */
  function badge(n) { return '<span class="cms-badge">' + n + '</span>'; }

  /* ---------- tree node renderer ---------- */
  function buildTree() {
    var rooms = (typeof ROOMS !== "undefined") ? ROOMS : [];
    var h = '<div class="cms-search-wrap"><input id="cms-search" class="cms-search" placeholder="جستجو..." value="' + esc(_searchQuery) + '"></div><div class="cms-tree">';
    rooms.forEach(function (room, ri) {
      var rk = nodeKey(["r", ri]);
      var rOpen = isExpanded(rk);
      var totalItems = 0;
      Object.keys(room.views || {}).forEach(function (vk) { totalItems += countHotspots(room.views[vk]); });
      h += '<div class="cms-node">';
      h += '<div class="cms-node-header" data-nk="' + esc(rk) + '">';
      h += '<span class="cms-toggle">' + (rOpen ? "▾" : "▸") + '</span>';
      h += '<span class="cms-icon">' + esc(room.icon) + '</span>';
      h += '<span class="cms-label">' + esc(room.name) + '</span>';
      h += badge(totalItems);
      h += '</div>';
      if (rOpen) {
        h += '<div class="cms-children">';
        Object.keys(room.views || {}).forEach(function (vk) {
          var view = room.views[vk];
          var vkey = nodeKey(["v", ri, vk]);
          var vOpen = isExpanded(vkey);
          h += '<div class="cms-node">';
          h += '<div class="cms-node-header" data-nk="' + esc(vkey) + '">';
          h += '<span class="cms-toggle">' + (vOpen ? "▾" : "▸") + '</span>';
          h += '<span class="cms-icon">👁</span>';
          h += '<span class="cms-label">' + esc(view.label || vk) + '</span>';
          h += badge(countHotspots(view));
          h += '</div>';
          if (vOpen) {
            h += '<div class="cms-children">';
            (view.hotspots || []).forEach(function (hs, hi) {
              var hk = nodeKey(["h", ri, vk, hi]);
              var hOpen = isExpanded(hk);
              h += '<div class="cms-node">';
              h += '<div class="cms-node-header" data-nk="' + esc(hk) + '">';
              h += '<span class="cms-toggle">' + (hOpen ? "▾" : "▸") + '</span>';
              h += '<span class="cms-icon">📍</span>';
              h += '<span class="cms-label">' + esc(hs.title) + '</span>';
              h += badge(countCats(hs));
              h += '</div>';
              if (hOpen) {
                h += '<div class="cms-children">';
                (hs.categories || []).forEach(function (cat, ci) {
                  var ck = nodeKey(["c", ri, vk, hi, ci]);
                  var cOpen = isExpanded(ck);
                  h += '<div class="cms-node">';
                  h += '<div class="cms-node-header" data-nk="' + esc(ck) + '">';
                  h += '<span class="cms-toggle">' + (cOpen ? "▾" : "▸") + '</span>';
                  h += '<span class="cms-icon">📁</span>';
                  h += '<span class="cms-label">' + esc(cat.title) + '</span>';
                  h += badge(countItems(cat));
                  h += ' <button class="cms-add-btn" data-room="' + ri + '" data-view="' + vk + '" data-hs="' + hi + '" data-cat="' + ci + '">+ آیتم</button>';
                  h += '</div>';
                  if (cOpen) {
                    h += '<div class="cms-children cms-items">';
                    (cat.items || []).forEach(function (item, ii) {
                      if (_tagFilter && item.type !== _tagFilter) return;
                      var sel = _selectedItem && _selectedItem.ri === ri && _selectedItem.vk === vk && _selectedItem.hi === hi && _selectedItem.ci === ci && _selectedItem.ii === ii;
                      h += '<div class="cms-item' + (sel ? " cms-selected" : "") + '" draggable="true"';
                      h += ' data-ri="' + ri + '" data-vk="' + vk + '" data-hi="' + hi + '" data-ci="' + ci + '" data-ii="' + ii + '">';
                      h += '<span class="cms-item-icon">' + itemIcon(item.type) + '</span>';
                      h += '<span class="cms-item-title">' + esc(item.title) + '</span>';
                      h += '</div>';
                    });
                    h += '</div>';
                  }
                  h += '</div>';
                });
                h += '</div>';
              }
              h += '</div>';
            });
            h += '</div>';
          }
          h += '</div>';
        });
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
    h += buildFileTree();
    return h;
  }

  /* ---------- file tree section ---------- */
  function buildFileTree() {
    var h = '<div class="cms-filetree">';
    h += '<div class="cms-filetree-header" id="cms-filetree-toggle">';
    h += '<span class="cms-toggle">' + (_fileTreeOpen ? "▾" : "▸") + '</span>';
    h += '<span class="cms-icon">📂</span>';
    h += '<span class="cms-label">فایل‌های پروژه</span>';
    h += '</div>';
    if (_fileTreeOpen) {
      h += '<div class="cms-children">';
      Object.keys(_fileTree).forEach(function (folder) {
        var fk = "ft-" + folder;
        var fo = isExpanded(fk);
        h += '<div class="cms-node">';
        h += '<div class="cms-node-header cms-filetree-folder" data-nk="' + esc(fk) + '" data-folder="' + esc(folder) + '">';
        h += '<span class="cms-toggle">' + (fo ? "▾" : "▸") + '</span>';
        h += '<span class="cms-icon">📁</span>';
        h += '<span class="cms-label">' + esc(folder) + '</span>';
        h += '<span class="cms-badge">' + _fileTree[folder].length + '</span>';
        h += '</div>';
        if (fo) {
          h += '<div class="cms-children">';
          _fileTree[folder].forEach(function (f) {
            h += '<div class="cms-node cms-filetree-file" data-folder="' + esc(folder) + '" data-file="' + esc(f) + '">';
            h += '<span class="cms-icon">' + (f.endsWith("/") ? "📁" : "📄") + '</span>';
            h += '<span class="cms-label">' + esc(f) + '</span>';
            h += '</div>';
          });
          h += '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
    }
    h += '</div>';
    return h;
  }

  /* ---------- tag filter bar ---------- */
  var _tagChips = ["", "pdf", "video", "audio", "game", "activity"];
  var _tagLabels = { "": "همه", "pdf": "PDF", "video": "ویدیو", "audio": "صوت", "game": "بازی", "activity": "فعالیت" };
  function buildTagBar() {
    var h = '<div class="cms-tagbar">';
    _tagChips.forEach(function (t) {
      var active = _tagFilter === t;
      h += '<button class="cms-tagchip' + (active ? " cms-tagchip-active" : "") + '" data-tag="' + esc(t) + '">' + _tagLabels[t] + '</button>';
    });
    h += '</div>';
    return h;
  }

  function itemIcon(type) {
    var m = { pdf: "📄", activity: "🎨", game: "🎮", audio: "🎵", video: "🎬", link: "🔗" };
    return m[type] || "📋";
  }

  /* ---------- editor panel ---------- */
  function buildEditor() {
    if (!_selectedItem) {
      var h = '<div class="cms-editor">' + buildTagBar();
      h += '<div class="cms-empty">آیتمی انتخاب نشده است</div></div>';
      return h;
    }
    var it = _selectedItem;
    var rooms = (typeof ROOMS !== "undefined") ? ROOMS : [];
    var item = rooms[it.ri] && rooms[it.ri].views[it.vk] && rooms[it.ri].views[it.vk].hotspots[it.hi] &&
      rooms[it.ri].views[it.vk].hotspots[it.hi].categories[it.ci] &&
      rooms[it.ri].views[it.vk].hotspots[it.hi].categories[it.ci].items[it.ii];
    if (!item) return '<div class="cms-empty">آیتم یافت نشد</div>';
    var path = rooms[it.ri].name + " → " + (it.vk) + " → " + rooms[it.ri].views[it.vk].hotspots[it.hi].title +
      " → " + rooms[it.ri].views[it.vk].hotspots[it.hi].categories[it.ci].title;
    var h = '<div class="cms-editor">';
    h += buildTagBar();
    h += '<div class="cms-editor-path">' + esc(path) + '</div>';
    h += '<div class="cms-editor-fields">';
    var fields = [
      { key: "title", label: "عنوان", type: "text" },
      { key: "type", label: "نوع", type: "select", options: ["activity", "pdf", "game", "audio", "video", "link"] },
      { key: "desc", label: "توضیحات", type: "textarea" },
      { key: "category", label: "دسته‌بندی", type: "text" },
      { key: "url", label: "آدرس URL", type: "text" },
      { key: "audioUrl", label: "آدرس صدا", type: "text" },
      { key: "image", label: "تصویر", type: "text" },
      { key: "source", label: "منبع", type: "text" }
    ];
    fields.forEach(function (f) {
      h += '<label class="cms-field-label">' + esc(f.label) + '</label>';
      if (f.type === "textarea") {
        h += '<textarea class="cms-input" data-key="' + f.key + '">' + esc(item[f.key] || "") + '</textarea>';
      } else if (f.type === "select") {
        h += '<select class="cms-input" data-key="' + f.key + '">';
        f.options.forEach(function (o) {
          h += '<option value="' + o + '"' + (item[f.key] === o ? ' selected' : '') + '>' + o + '</option>';
        });
        h += '</select>';
      } else {
        h += '<input class="cms-input" data-key="' + f.key + '" value="' + esc(item[f.key] || "") + '">';
      }
    });

    /* audio library link */
    if (typeof AUDIO_LIBRARY !== "undefined" && AUDIO_LIBRARY.length) {
      h += '<label class="cms-field-label">انتخاب از کتابخانه صدا</label>';
      h += '<select class="cms-input cms-audio-picker"><option value="">-- انتخاب --</option>';
      AUDIO_LIBRARY.forEach(function (a) {
        h += '<option value="' + esc(a.audioUrl || "") + '">' + esc(a.title || a.id || "") + '</option>';
      });
      h += '</select>';
    }

    h += '</div>';
    h += '<div class="cms-editor-actions">';
    h += '<button class="cms-btn cms-btn-save" id="cms-save-btn">💾 ذخیره</button>';
    h += '<button class="cms-btn cms-btn-delete" id="cms-delete-btn">🗑 حذف آیتم</button>';
    h += '</div>';
    h += '</div>';
    return h;
  }

  /* ---------- deep write helpers ---------- */
  function findCatRef(ri, vk, hi, ci) {
    var rooms = (typeof ROOMS !== "undefined") ? ROOMS : [];
    return rooms[ri] && rooms[ri].views[vk] && rooms[ri].views[vk].hotspots[hi] &&
      rooms[ri].views[vk].hotspots[hi].categories[ci];
  }

  function findItemRef(ri, vk, hi, ci, ii) {
    var cat = findCatRef(ri, vk, hi, ci);
    return cat && cat.items[ii];
  }

  /* ---------- drag state ---------- */
  var _dragData = null;

  /* ---------- main render ---------- */
  window.renderCmsTab = function (body) {
    body.innerHTML = '<div class="cms-wrap">' +
      '<div class="cms-left" id="cms-left"></div>' +
      '<div class="cms-right" id="cms-right"></div></div>';
    var left = document.getElementById("cms-left");
    var right = document.getElementById("cms-right");
    left.innerHTML = buildTree();
    right.innerHTML = buildEditor();
    wireEvents(left, right);
  };

  /* ---------- event wiring ---------- */
  function wireEvents(left, right) {
    /* search */
    var si = left.querySelector("#cms-search");
    if (si) si.addEventListener("input", function () {
      _searchQuery = this.value.trim();
      left.innerHTML = buildTree();
      wireEvents(left, right);
    });

    /* tree toggle — skip toggle on label clicks so dblclick-rename works */
    left.querySelectorAll(".cms-node-header[data-nk]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".cms-add-btn")) return;
        if (e.target.closest(".cms-label")) return;
        toggle(this.dataset.nk);
        left.innerHTML = buildTree();
        wireEvents(left, right);
      });
    });

    /* item click */
    left.querySelectorAll(".cms-item[draggable]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".cms-add-btn")) return;
        _selectedItem = {
          ri: +el.dataset.ri, vk: el.dataset.vk, hi: +el.dataset.hi,
          ci: +el.dataset.ci, ii: +el.dataset.ii
        };
        left.innerHTML = buildTree();
        right.innerHTML = buildEditor();
        wireEvents(left, right);
      });
    });

    /* drag-drop */
    left.querySelectorAll(".cms-item[draggable]").forEach(function (el) {
      el.addEventListener("dragstart", function (e) {
        _dragData = { ri: +el.dataset.ri, vk: el.dataset.vk, hi: +el.dataset.hi, ci: +el.dataset.ci, ii: +el.dataset.ii };
        el.classList.add("cms-dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      el.addEventListener("dragend", function () { el.classList.remove("cms-dragging"); });
    });
    /* category drop zones */
    left.querySelectorAll(".cms-items").forEach(function (el) {
      el.addEventListener("dragover", function (e) { e.preventDefault(); el.classList.add("cms-drop-hover"); });
      el.addEventListener("dragleave", function () { el.classList.remove("cms-drop-hover"); });
      el.addEventListener("drop", function (e) {
        e.preventDefault();
        el.classList.remove("cms-drop-hover");
        if (!_dragData) return;
        /* find target category from closest .cms-node-header */
        var hdr = el.previousElementSibling;
        if (!hdr || !hdr.dataset.nk) return;
        var parts = hdr.dataset.nk.split("||");
        if (parts.length < 5) return;
        var tCat = findCatRef(+parts[1], parts[2], +parts[3], +parts[4]);
        var srcItem = findItemRef(_dragData.ri, _dragData.vk, _dragData.hi, _dragData.ci, _dragData.ii);
        if (!tCat || !srcItem) return;
        /* remove from source */
        var srcCat = findCatRef(_dragData.ri, _dragData.vk, _dragData.hi, _dragData.ci);
        if (srcCat) srcCat.items.splice(_dragData.ii, 1);
        /* insert at end of target */
        tCat.items.push(srcItem);
        _dragData = null;
        left.innerHTML = buildTree();
        wireEvents(left, right);
        if (_selectedItem) { right.innerHTML = buildEditor(); wireEvents(left, right); }
      });
    });

    /* add item */
    left.querySelectorAll(".cms-add-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var ri = +this.dataset.room, vk = this.dataset.view, hi = +this.dataset.hs, ci = +this.dataset.cat;
        var cat = findCatRef(ri, vk, hi, ci);
        if (!cat) return;
        var newItem = { title: "آیتم جدید", type: "activity", desc: "", category: cat.title };
        cat.items.push(newItem);
        _expandedNodes[nodeKey(["c", ri, vk, hi, ci])] = true;
        _selectedItem = { ri: ri, vk: vk, hi: hi, ci: ci, ii: cat.items.length - 1 };
        left.innerHTML = buildTree();
        right.innerHTML = buildEditor();
        wireEvents(left, right);
      });
    });

    /* delete item */
    var delBtn = right.querySelector("#cms-delete-btn");
    if (delBtn && _selectedItem) delBtn.addEventListener("click", function () {
      if (!confirm("آیتم حذف شود؟")) return;
      var it = _selectedItem;
      var cat = findCatRef(it.ri, it.vk, it.hi, it.ci);
      if (cat) cat.items.splice(it.ii, 1);
      _selectedItem = null;
      left.innerHTML = buildTree();
      right.innerHTML = buildEditor();
      wireEvents(left, right);
    });

    /* save all fields */
    var saveBtn = right.querySelector("#cms-save-btn");
    if (saveBtn && _selectedItem) saveBtn.addEventListener("click", function () {
      var it = _selectedItem;
      var item = findItemRef(it.ri, it.vk, it.hi, it.ci, it.ii);
      if (!item) return;
      right.querySelectorAll(".cms-input[data-key]").forEach(function (inp) {
        var k = inp.dataset.key;
        item[k] = inp.value;
      });
      /* try POST to server */
      var rooms = (typeof ROOMS !== "undefined") ? ROOMS : [];
      var payload = { roomId: rooms[it.ri].id, view: it.vk, hotspotIndex: it.hi, catIndex: it.ci, itemIndex: it.ii, data: item };
      fetch("/api/cms/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error(r.statusText); return r.json(); })
        .then(function () { saveBtn.textContent = "✅ ذخیره شد"; setTimeout(function () { saveBtn.textContent = "💾 ذخیره"; }, 1500); })
        .catch(function () { saveBtn.textContent = "❌ خطا"; setTimeout(function () { saveBtn.textContent = "💾 ذخیره"; }, 1500); });
      left.innerHTML = buildTree();
      wireEvents(left, right);
    });

    /* audio picker */
    var picker = right.querySelector(".cms-audio-picker");
    if (picker && _selectedItem) picker.addEventListener("change", function () {
      if (!this.value) return;
      var inp = right.querySelector('.cms-input[data-key="audioUrl"]');
      if (inp) inp.value = this.value;
    });

    /* --- FILE TREE events --- */
    var ftToggle = left.querySelector("#cms-filetree-toggle");
    if (ftToggle) ftToggle.addEventListener("click", function () {
      _fileTreeOpen = !_fileTreeOpen;
      left.innerHTML = buildTree();
      wireEvents(left, right);
    });
    left.querySelectorAll(".cms-filetree-folder[data-nk]").forEach(function (el) {
      el.addEventListener("click", function () {
        toggle(this.dataset.nk);
        left.innerHTML = buildTree();
        wireEvents(left, right);
      });
    });
    left.querySelectorAll(".cms-filetree-file").forEach(function (el) {
      el.addEventListener("click", function () {
        _selectedItem = null;
        var folder = el.dataset.folder, file = el.dataset.file;
        right.innerHTML = '<div class="cms-editor">' + buildTagBar() +
          '<div class="cms-editor-path">' + esc(folder) + esc(file) + '</div>' +
          '<div class="cms-file-info"><h3>📄 ' + esc(file) + '</h3>' +
          '<p>پوشه: ' + esc(folder) + '</p>' +
          '<p>نوع: ' + (file.endsWith("/") ? "پوشه" : "فایل") + '</p>' +
          '<p>پسوند: ' + esc(file.split(".").pop() || "—") + '</p></div></div>';
        wireEvents(left, right);
      });
    });

    /* --- DOUBLE-CLICK RENAME on tree node labels --- */
    left.querySelectorAll(".cms-node-header .cms-label").forEach(function (lbl) {
      lbl.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        var hdr = this.closest(".cms-node-header");
        if (!hdr || !hdr.dataset.nk) return;
        var nk = hdr.dataset.nk;
        var parts = nk.split("||");
        var oldName = this.textContent;
        var input = document.createElement("input");
        input.type = "text";
        input.value = oldName;
        input.className = "cms-rename-input";
        this.replaceWith(input);
        input.focus();
        input.select();
        function commitRename() {
          var val = input.value.trim() || oldName;
          /* update data model based on node type prefix */
          var rooms = (typeof ROOMS !== "undefined") ? ROOMS : [];
          if (parts[0] === "r") {
            rooms[+parts[1]].name = val;
          } else if (parts[0] === "v") {
            rooms[+parts[1]].views[parts[2]].label = val;
          } else if (parts[0] === "h") {
            rooms[+parts[1]].views[parts[2]].hotspots[+parts[3]].title = val;
          } else if (parts[0] === "c") {
            rooms[+parts[1]].views[parts[2]].hotspots[+parts[3]].categories[+parts[4]].title = val;
          }
          left.innerHTML = buildTree();
          right.innerHTML = buildEditor();
          wireEvents(left, right);
        }
        input.addEventListener("keydown", function (ke) {
          if (ke.key === "Enter") { ke.preventDefault(); commitRename(); }
          if (ke.key === "Escape") {
            left.innerHTML = buildTree();
            wireEvents(left, right);
          }
        });
        input.addEventListener("blur", commitRename);
      });
    });

    /* --- TAG FILTER BAR events --- */
    right.querySelectorAll(".cms-tagchip[data-tag]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        _tagFilter = this.dataset.tag;
        /* filter items in left tree: expand only categories with matching items */
        if (_tagFilter) {
          var rooms = (typeof ROOMS !== "undefined") ? ROOMS : [];
          rooms.forEach(function (room, ri) {
            Object.keys(room.views || {}).forEach(function (vk) {
              (room.views[vk].hotspots || []).forEach(function (hs, hi) {
                (hs.categories || []).forEach(function (cat, ci) {
                  var hasMatch = (cat.items || []).some(function (it) { return it.type === _tagFilter; });
                  if (hasMatch) _expandedNodes[nodeKey(["c", ri, vk, hi, ci])] = true;
                });
              });
            });
          });
        }
        left.innerHTML = buildTree();
        right.innerHTML = buildEditor();
        wireEvents(left, right);
      });
    });
  }
})();
