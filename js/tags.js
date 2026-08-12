/**
 * tags.js — Tag management for YARAN kindergarten content
 */
var Tags = (function() {
  var CATEGORIES = {
    age: { label: 'گروه سنی', values: ['۲-۳ سال','۳-۴ سال','۴-۵ سال','۵-۶ سال','همه سنین'] },
    growth: { label: 'جنبه رشد', values: ['شناختی','عاطفی','حرکتی','زبانی','اجتماعی','هنری','علمی','ریاضی'] },
    type: { label: 'نوع محتوا', values: ['کاربرگ','بازی','ویدیو','صوت','فعالیت','کاردستی','قصه'] },
    source: { label: 'منبع', values: [] },
    room: { label: 'اتاق', values: [] }
  };
  var TYPE_MAP = { pdf: 'کاربرگ', activity: 'فعالیت', video: 'ویدیو', game: 'بازی', audio: 'صوت', craft: 'کاردستی', story: 'قصه' };
  var CAT_GROWTH = {
    'شناخت رنگ': ['شناختی','هنری'], 'شناخت طبیعت': ['شناختی','علمی'], 'شناخت اعداد': ['شناختی','ریاضی'],
    'شناخت حروف': ['شناختی','زبانی'], 'شناخت شکل': ['شناختی','ریاضی'], 'مهارت شناختی': ['شناختی'],
    'مهارت عاطفی': ['عاطفی'], 'مهارت زندگی': ['اجتماعی'], 'بهداشت شخصی': ['اجتماعی'],
    'کاربرگ چاپی': ['شناختی'], 'بازی': ['اجتماعی','شناختی'], 'کاردستی': ['هنری','حرکتی']
  };
  function getAgeTag(item) {
    if (!item.ageMin && !item.ageMax) return 'همه سنین';
    var avg = ((item.ageMin || 3) + (item.ageMax || 5)) / 2;
    if (avg <= 2.5) return '۲-۳ سال';
    if (avg <= 3.5) return '۳-۴ سال';
    if (avg <= 4.5) return '۴-۵ سال';
    return '۵-۶ سال';
  }
  function getTags(item) {
    var tags = [getAgeTag(item)];
    if (item.type && TYPE_MAP[item.type]) tags.push(TYPE_MAP[item.type]);
    var growth = CAT_GROWTH[item.category];
    if (growth) growth.forEach(function(g) { if (tags.indexOf(g) === -1) tags.push(g); });
    if (item.category && tags.indexOf(item.category) === -1) tags.push(item.category);
    return tags;
  }
  function filterByTags(items, sel) {
    if (!sel || sel.length === 0) return items;
    return items.filter(function(it) { var t = getTags(it); return sel.every(function(s) { return t.indexOf(s) !== -1; }); });
  }
  function getAllTags(items) {
    var all = {};
    items.forEach(function(it) { getTags(it).forEach(function(t) { all[t] = (all[t] || 0) + 1; }); });
    return all;
  }
  function buildDynamicCategories(items) {
    var sources = {}, rooms = {};
    items.forEach(function(it) { if (it.source) sources[it.source] = true; if (it.room) rooms[it.room] = true; });
    CATEGORIES.source.values = Object.keys(sources).sort();
    CATEGORIES.room.values = Object.keys(rooms).sort();
  }
  return { CATEGORIES: CATEGORIES, getTags: getTags, filterByTags: filterByTags, getAllTags: getAllTags, buildDynamicCategories: buildDynamicCategories };
})();
