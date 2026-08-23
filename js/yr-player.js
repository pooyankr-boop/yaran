/* YR Player v8 — Simple, works */
(function(){
'use strict';
var q=[], idx=-1, playing=false, audio=null, descOpen=false, plistOpen=true;
var YT_RE=/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
function isYT(u){return YT_RE.test(u||'');}
function ytId(u){var m=(u||'').match(YT_RE);return m?m[1]:null;}
function isVid(it){if(!it)return false;var u=it.url||'';return /\.(mp4|webm|avi|mov)(\?|#|$)/i.test(u)||isYT(u)||it.type==='video';}
function rSrc(it){if(!it)return null;var u=it.url||it.src||it.audioUrl||'';if(!u||isYT(u))return null;return u;}
function $(id){return document.getElementById(id);}
function fmt(s){var m=Math.floor(s/60),sc=Math.floor(s%60);return m+':'+(sc<10?'0':'')+sc;}

window.getMediaThumbHtml=function(it){
  if(!it||!isVid(it))return null;
  var u=it.url||it.src||'';
  if(isYT(u)){var yid=ytId(u);return yid?'<img src="https://i.ytimg.com/vi/'+yid+'/mqdefault.jpg" loading="lazy" class="media-thumb-img" alt="">':null;}
  if(u)return '<video src="'+u+'#t=0.5" preload="metadata" muted playsinline class="media-thumb-video"></video>';
  return null;
};

var _built=false;
function buildDOM(){
  if(_built)return;_built=true;
  var ov=document.createElement('div');ov.id='yr-p-overlay';ov.className='yr-p-overlay';
  ov.innerHTML='<div class="yr-p-box" id="yr-p-box">'+
    '<div class="yr-p-drag" id="yr-p-drag">'+
      '<span class="yr-p-drag-t" id="yr-p-title">پلیر یاران</span>'+
      '<div class="yr-p-drag-btns">'+
        '<button id="yc-mute" title="بیصدا" class="yr-p-tb">🔇</button>'+
        '<button id="yc-min" title="کوچک" class="yr-p-tb">—</button>'+
        '<button id="yc-close" title="بستن" class="yr-p-tb yr-p-cls">✕</button>'+
      '</div>'+
    '</div>'+
    '<div class="yr-p-main">'+
      '<div class="yr-p-desc collapsed" id="yr-p-desc">'+
        '<div class="yr-p-desc-inner" id="yr-p-desc-inner"></div>'+
      '</div>'+
      '<div class="yr-p-center">'+
        '<div class="yr-p-vwrap" id="yr-p-vwrap"><div id="yr-p-player" class="yr-p-player-area"></div></div>'+
        '<div class="yr-p-bar">'+
          '<button class="yc" id="yc-next">⏭</button>'+
          '<button class="yc yplay" id="yc-play">▶</button>'+
          '<button class="yc" id="yc-prev">⏮</button>'+
          '<div class="yr-p-seek" id="yr-p-seek"><div class="yr-p-seek-fill" id="yr-p-fill"></div></div>'+
          '<span class="yr-p-tm" id="yr-p-tm">0:00</span>'+
          '<button class="yc" id="yc-desc" title="توضیحات">📝</button>'+
          '<button class="yc" id="yc-plist-btn" title="فهرست پخش">☰</button>'+
          '<a class="yc" id="yc-link" href="#" target="_blank" title="منبع">🔗</a>'+
        '</div>'+
      '</div>'+
      '<div class="yr-p-plist" id="yr-p-plist">'+
        '<div class="yr-p-plist-h"><span>فهرست پخش</span>'+
          '<span id="yr-p-cnt" class="yr-p-cnt"></span>'+
          '<button class="yc yr-p-pl-clear" id="yc-clear" title="پاک کردن فهرست">🗑</button>'+
        '</div>'+
        '<div id="yr-p-pitems"></div>'+
      '</div>'+
    '</div>'+
    '<div class="yr-p-resize" id="yr-p-resize"></div>'+
  '</div>';
  document.body.appendChild(ov);

  // Mini player
  var mi=document.createElement('div');mi.id='yr-p-mini';mi.className='yr-p-mini hidden';
  mi.innerHTML='<div class="yr-p-mivid" id="yr-p-mivid"></div>'+
    '<div class="yr-p-mitxt"><div id="yr-p-mit" class="yr-p-mit"></div><div id="yr-p-mich" class="yr-p-mich"></div></div>'+
    '<div class="yr-p-mic">'+
    '<button class="yc" id="yc-mn">⏭</button>'+
    '<button class="yc yplay" id="yc-mpp">▶</button>'+
    '<button class="yc" id="yc-mp">⏮</button>'+
    '<button class="yc" id="yc-mx">⛶</button>'+
    '<button class="yc yr-p-cls" id="yc-mcl">✕</button></div>';
  document.body.appendChild(mi);

  // Events
  $('yc-play').onclick=togglePlay;$('yc-prev').onclick=prev;$('yc-next').onclick=next;
  $('yc-close').onclick=stop;$('yc-min').onclick=toMini;
  $('yc-mpp').onclick=togglePlay;$('yc-mp').onclick=prev;$('yc-mn').onclick=next;
  $('yc-mx').onclick=toMax;$('yc-mcl').onclick=stop;
  $('yc-mute').onclick=toggleMute;
  $('yc-desc').onclick=toggleDesc;
  $('yc-plist-btn').onclick=togglePlist;
  $('yc-clear').onclick=function(){q=[];idx=-1;renderPlist();stop();};
  $('yr-p-seek').onclick=function(e){
    var r=e.currentTarget.getBoundingClientRect();
    var p=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
    if(audio&&audio.duration)audio.currentTime=p*audio.duration;
    var f=$('yr-p-yt');if(f&&f.contentWindow)f.contentWindow.postMessage(JSON.stringify({event:'command',func:'seekTo',args:[p*120]}),'*');
  };

  // DRAG — simple, direct
  setupDrag();
  // RESIZE — simple, direct
  setupResize();
}

function setupDrag(){
  var dragEl=$('yr-p-drag');
  var box=$('yr-p-box');
  if(!dragEl||!box)return;
  var startX=0,startY=0,origLeft=0,origTop=0,dragging=false;

  dragEl.addEventListener('mousedown',function(e){
    if(e.target.tagName==='BUTTON'||e.target.tagName==='A')return;
    e.preventDefault();
    var r=box.getBoundingClientRect();
    // Convert right/bottom to left/top on first drag
    if(box.style.right&&box.style.right!=='auto'){
      box.style.left=r.left+'px';
      box.style.top=r.top+'px';
      box.style.right='auto';
      box.style.bottom='auto';
    }
    startX=e.clientX;startY=e.clientY;
    origLeft=box.offsetLeft;origTop=box.offsetTop;
    dragging=true;
    document.body.style.cursor='move';
    document.body.style.userSelect='none';
  });

  document.addEventListener('mousemove',function(e){
    if(!dragging)return;
    e.preventDefault();
    box.style.left=Math.max(0,origLeft+(e.clientX-startX))+'px';
    box.style.top=Math.max(0,origTop+(e.clientY-startY))+'px';
  });

  document.addEventListener('mouseup',function(){
    if(!dragging)return;
    dragging=false;
    document.body.style.cursor='';
    document.body.style.userSelect='';
  });
}

function setupResize(){
  var rh=$('yr-p-resize');
  var box=$('yr-p-box');
  if(!rh||!box)return;
  var startX=0,startY=0,origW=0,origH=0,dragging=false;

  rh.addEventListener('mousedown',function(e){
    e.preventDefault();e.stopPropagation();
    var r=box.getBoundingClientRect();
    if(box.style.right&&box.style.right!=='auto'){
      box.style.left=r.left+'px';box.style.top=r.top+'px';
      box.style.right='auto';box.style.bottom='auto';
    }
    startX=e.clientX;startY=e.clientY;
    origW=box.offsetWidth;origH=box.offsetHeight;
    dragging=true;
    document.body.style.cursor='nwse-resize';
  });

  document.addEventListener('mousemove',function(e){
    if(!dragging)return;
    e.preventDefault();
    box.style.width=Math.max(320,origW+(e.clientX-startX))+'px';
    box.style.height=Math.max(250,origH+(e.clientY-startY))+'px';
  });

  document.addEventListener('mouseup',function(){
    if(!dragging)return;
    dragging=false;
    document.body.style.cursor='';
  });
}

function togglePlay(){
  var yt=$('yr-p-yt');
  if(yt&&yt.contentWindow){
    if(playing){yt.contentWindow.postMessage(JSON.stringify({event:'command',func:'pauseVideo'}),'*');}
    else{yt.contentWindow.postMessage(JSON.stringify({event:'command',func:'playVideo'}),'*');}
    playing=!playing;
  }else if(audio){
    if(audio.paused){audio.play().catch(function(){});}
    else{audio.pause();}
  }
  updateBtns();
}
function prev(){if(idx>0)playAt(idx-1);}
function next(){if(idx<q.length-1)playAt(idx+1);}

function playAt(i){
  if(i<0||i>=q.length)return;
  idx=i;var it=q[i];var src=rSrc(it);var vid=isVid(it);
  if(!src&&it&&it.url&&/castbox\.fm\/(episode|va|vc)/.test(it.url)){window.open(it.url,'_blank');return;}
  var ov=$('yr-p-overlay');
  // Show player
  var box=$('yr-p-box');
  if(!box._initPos){box.style.position='fixed';box.style.right='16px';box.style.bottom='16px';box.style.left='auto';box.style.top='auto';box._initPos=true;}
  ov.style.display='';
  $('yr-p-title').textContent=it.titleFa||it.title||'';
  // Description
  var di=$('yr-p-desc-inner');
  if(di){
    var thumb='';
    if(it.pageImg)thumb='<img src="'+it.pageImg+'" class="yr-p-desc-thumb">';
    else if(it.channel||it.category){
      var ce=it.category&&/ترانه|آهنگ|music|song/i.test(it.category)?'🎶':'🎵';
      thumb='<div class="yr-p-desc-thumb yr-p-desc-emoji">'+ce+'</div>';
    }
    var srcLink=it.pageUrl||it.audioUrl||src||'';
    di.innerHTML=thumb+
      '<div class="yr-p-desc-title">'+(it.titleFa||it.title||'')+'</div>'+
      (it.channel?'<div class="yr-p-desc-ch">'+it.channel+'</div>':'')+
      (it.desc?'<div class="yr-p-desc-text">'+it.desc+'</div>':'')+
      (srcLink?'<a href="'+srcLink+'" target="_blank" class="yr-p-desc-link">🔗 مشاهده منبع</a>':'');
  }
  renderPlist();
  if(isYT(it.url)){
    var id=ytId(it.url);
    $('yr-p-player').innerHTML='<iframe id="yr-p-yt" src="https://www.youtube.com/embed/'+id+'?enablejsapi=1&origin='+encodeURIComponent(location.origin)+'" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    $('yc-link').href=it.url;
    $('yr-p-mivid').innerHTML='<img src="https://img.youtube.com/vi/'+id+'/mqdefault.jpg" alt="">';
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent=it.channel||'';
    playing=true;updateBtns();return;
  }
  if(vid&&src){
    $('yr-p-player').innerHTML='<video id="yr-p-vid" src="'+src+'" controls autoplay style="width:100%;height:100%;background:#000"></video>';
    var vidEl=$('yr-p-vid');
    vidEl.onerror=function(){vidEl.src='/api/audio-proxy?url='+encodeURIComponent(src);};
    vidEl.ontimeupdate=function(){updSeek(vidEl);};
    vidEl.onended=next;vidEl.onplay=function(){playing=true;updateBtns();};vidEl.onpause=function(){playing=false;updateBtns();};
    $('yc-link').href=it.url||src;
    $('yr-p-mivid').innerHTML='<video src="'+src+'" muted style="width:100%;height:100%;object-fit:cover"></video>';
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent=it.channel||'';
    playing=true;updateBtns();return;
  }
  if(src){
    if(!audio){audio=new Audio();audio.ontimeupdate=function(){updSeek(audio);};audio.onended=next;
      audio.onplay=function(){playing=true;updateBtns();};audio.onpause=function(){playing=false;updateBtns();};
      audio.onerror=function(){if(!audio._proxied&&src){audio._proxied=true;audio.src='/api/audio-proxy?url='+encodeURIComponent(src);audio.load();audio.play().catch(function(){});}};}
    audio.src=src;audio.load();
    audio.play().then(function(){
      playing=true;updateBtns();
      $('yr-p-player').innerHTML='<div class="yr-p-audio-playing">🔊 در حال پخش</div>';
    }).catch(function(){
      playing=false;updateBtns();
      $('yr-p-player').innerHTML='<div class="yr-p-audio-retry" id="yr-p-retry"><div class="yr-p-retry-icon">🔊</div><div>کلیک برای پخش</div></div>';
      $('yr-p-retry').onclick=function(){audio.play().catch(function(){});playing=true;updateBtns();$('yr-p-player').innerHTML='<div class="yr-p-audio-playing">🔊 در حال پخش</div>';};
    });
    $('yc-link').href=it.audioUrl||src;
    var ce=it.category&&/ترانه|آهنگ|music|song/i.test(it.category)?'🎶':'🎵';
    $('yr-p-mivid').innerHTML='<div class="yr-p-mivid-icon">'+ce+'</div>';
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent=it.channel||'';
    playing=true;updateBtns();
  }
}

function updSeek(m){
  if(!m)return;var cur=m.currentTime||0,dur=m.duration||0;
  if(!dur)return;var p=(cur/dur)*100;
  if($('yr-p-fill'))$('yr-p-fill').style.width=p+'%';
  if($('yr-p-tm'))$('yr-p-tm').textContent=fmt(cur)+' / '+fmt(dur);
}
function updateBtns(){
  var c=playing?'⏸':'▶';
  if($('yc-play'))$('yc-play').textContent=c;
  if($('yc-mpp'))$('yc-mpp').textContent=c;
}
function toMini(){
  $('yr-p-overlay').style.display='none';$('yr-p-mini').classList.remove('hidden');
}
function toMax(){
  $('yr-p-overlay').style.display='';$('yr-p-mini').classList.add('hidden');
}
function toggleMute(){
  var m=audio?audio.muted=!audio.muted:false;
  if($('yc-mute'))$('yc-mute').textContent=m?'🔊':'🔇';
  var f=$('yr-p-yt');if(f&&f.contentWindow)f.contentWindow.postMessage(JSON.stringify({event:'command',func:m?'mute':'unMute',args:[]}),'*');
}
function toggleDesc(){
  descOpen=!descOpen;
  var p=$('yr-p-desc');if(p)p.classList.toggle('collapsed',!descOpen);
  if($('yc-desc'))$('yc-desc').textContent=descOpen?'▼':'📝';
}
function togglePlist(){
  plistOpen=!plistOpen;
  var p=$('yr-p-plist');if(p)p.classList.toggle('collapsed',!plistOpen);
  if($('yc-plist-btn'))$('yc-plist-btn').textContent=plistOpen?'◀':'☰';
}
function stop(){
  if(audio){audio.pause();audio.src='';audio=null;}
  var f=$('yr-p-yt');if(f)f.src='';
  var vidEl=$('yr-p-vid');if(vidEl){vidEl.pause();vidEl.src='';}
  playing=false;idx=-1;descOpen=false;
  var dp=$('yr-p-desc');if(dp)dp.classList.add('collapsed');
  if($('yc-desc'))$('yc-desc').textContent='📝';
  $('yr-p-overlay').style.display='none';$('yr-p-mini').classList.add('hidden');
  var bx=$('yr-p-box');if(bx)bx._initPos=false;
}

function renderPlist(){
  var h=q.map(function(it,i){
    var t=it.titleFa||it.title||'';var act=i===idx?'active':'';var ic=isVid(it)?'🎬':'🔊';
    return '<div class="yr-p-pli '+act+'" draggable="true" data-i="'+i+'">'+
      '<span class="yr-p-pli-n">'+(i+1)+'</span>'+
      '<span class="yr-p-pli-ic">'+ic+'</span>'+
      '<span class="yr-p-pli-t">'+t+'</span>'+
      '<button class="yr-p-pli-del" data-i="'+i+'">✕</button></div>';
  }).join('');
  if($('yr-p-pitems'))$('yr-p-pitems').innerHTML=h;
  if($('yr-p-cnt'))$('yr-p-cnt').textContent=q.length+' آیتم';
  document.querySelectorAll('.yr-p-pli').forEach(function(el){
    el.onclick=function(e){if(e.target.classList.contains('yr-p-pli-del'))return;playAt(parseInt(el.dataset.i));};
    el.ondragstart=function(e){e.dataTransfer.setData('text',el.dataset.i);el.style.opacity='.4';};
    el.ondragend=function(){el.style.opacity='1';};
    el.ondragover=function(e){e.preventDefault();};
    el.ondrop=function(e){
      e.preventDefault();var f=parseInt(e.dataTransfer.getData('text')),t=parseInt(el.dataset.i);
      if(f===t)return;var it=q.splice(f,1)[0];q.splice(t,0,it);
      if(idx===f)idx=t;else if(f<idx&&t>=idx)idx--;else if(f>idx&&t<=idx)idx++;
      renderPlist();
    };
  });
  document.querySelectorAll('.yr-p-pli-del').forEach(function(b){
    b.onclick=function(e){e.stopPropagation();var i=parseInt(b.dataset.i);
      q.splice(i,1);if(i<idx)idx--;else if(i===idx){idx=Math.min(idx,q.length-1);if(idx>=0)playAt(idx);}
      if(!q.length){stop();return;}renderPlist();
    };
  });
}

window.yrPlay=function(it){
  buildDOM();
  var k=it.url||it.title||'';
  // First click: add and play immediately
  if(q.length===0){
    q=[it];idx=0;playAt(0);return;
  }
  var found=-1;
  for(var i=0;i<q.length;i++){if((q[i].url||'')===k){found=i;break;}}
  if(found>=0){
    idx=found;playAt(idx);
  }else{
    q.push(it);idx=q.length-1;playAt(idx);
  }
};
window.yrPlayList=function(items){buildDOM();q=items.slice();idx=0;playAt(0);};
window.yrStop=stop;
window.yrMute=function(m){if(audio)audio.muted=!!m;var b=$('yc-mute');if(b)b.textContent=m?'🔊':'🔇';};

document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  if(e.key===' '){e.preventDefault();togglePlay();}
  if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();
  if(e.key==='Escape')stop();
});
})();
