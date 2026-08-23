/* ZWNJ auto-fixer v3 — طبق رسم‌الخط درست فارسی:
   - ها/های: به هر حرفی می‌چسبند (به‌جز چند کلمه‌ی استثنا که تصادفاً به این الگو ختم می‌شوند)
   - ام/ای: فقط بعد از «ه» ساکن نیم‌فاصله می‌گیرند (خسته‌ام، نه نام/تمام/نمای/راهنمای)
   - ات: هرگز نیم‌فاصله نمی‌گیرد (توضیحات، احساسات و مشابه همیشه یک‌جا نوشته می‌شوند) */
(function(){
  var Z='\u200c';
  // کلماتی که تصادفاً به «ها»/«های» ختم می‌شوند ولی جمع نیستند — نباید جدا شوند
  var PLURAL_EXCEPTIONS = {
    'تنها':1, 'رها':1, 'بها':1, 'گواها':1, 'شاها':1, 'ماها':0 // ماها واقعاً جمع «ما»ست، جدا بماند
  };
  delete PLURAL_EXCEPTIONS['ماها'];
  var WORD_RE = /[\u0600-\u06FF]+/g;
  function splitWord(word){
    if (PLURAL_EXCEPTIONS[word]) return word;
    var m;
    if ((m = /^(.+?)(های)$/.exec(word)) && m[1].length >= 1) return m[1] + Z + 'های';
    if ((m = /^(.+?)(ها)$/.exec(word)) && m[1].length >= 1) return m[1] + Z + 'ها';
    // ام/ای فقط بعد از «ه» ساکن — طبق رسم‌الخط، نه بعد از هر حرفی
    if ((m = /^(.*ه)(ام|ای)$/.exec(word))) return m[1] + Z + m[2];
    return word;
  }
  function fix(t){
    if(!t||typeof t!=='string')return t;
    if(t.indexOf(Z)>=0)return t;
    var r = t.replace(WORD_RE, splitWord);
    r = r.replace(/(می|نمی)(\s)/g,'$1'+Z+'$2');
    return r;
  }
  function walk(n){
    if(n.nodeType===3){
      var f=fix(n.textContent);
      if(f!==n.textContent)n.textContent=f;
    }else if(n.nodeType===1){
      var tag=n.tagName;
      if(tag==='SCRIPT'||tag==='STYLE'||tag==='INPUT'||tag==='TEXTAREA')return;
      for(var i=0;i<n.childNodes.length;i++)walk(n.childNodes[i]);
    }
  }
  var timer=null;
  function schedule(){if(!timer)timer=setTimeout(function(){timer=null;walk(document.body);},50);}
  var obs=new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var m=muts[i];
      if(m.type==='childList'){
        for(var j=0;j<m.addedNodes.length;j++)walk(m.addedNodes[j]);
      }else if(m.type==='characterData'){
        var f=fix(m.target.textContent);
        if(f!==m.target.textContent)m.target.textContent=f;
      }
    }
  });
  function start(){
    obs.observe(document.body,{childList:true,subtree:true,characterData:true});
    walk(document.body);
  }
  if(document.body)setTimeout(start,0);
  else document.addEventListener('DOMContentLoaded',function(){setTimeout(start,0);});
  window.fixZWNJ=fix;
  window.fixZWNJAll=function(){walk(document.body);};
})();
