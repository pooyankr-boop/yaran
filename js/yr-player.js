/* YR Player v5 */
(function(){
'use strict';
var S={q:[],i:-1,playing:false,maxOpen:false,muted:false};
var audio=null,vidEl=null;
var PROXY="/api/audio-proxy?url=";
var YT_RE=/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
function isYT(u){return YT_RE.test(u||'');}
function ytId(u){var m=(u||'').match(YT_RE);return m?m[1]:null;}
function isVid(it){if(!it)return false;var u=it.url||'';return /\.(mp4|webm|avi|mov)(\?|#|$)/i.test(u)||isYT(u)||it.type==='video';}
function rSrc(it){if(!it)return null;var u=it.url||it.src||it.audioUrl||'';if(!u||isYT(u))return null;return u;}
function isWikimedia(u){return /upload\.wikimedia\.org/.test(u||'');}
function wikimediaThumb(u){
  if(!u)return'';
  var m=u.match(/\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([^/]+)\/([^/]+)\/([^/]+\/[^?#]+)/);
  if(!m)return'';
  return 'https://upload.wikimedia.org/wikipedia/commons/thumb/'+m[1]+'/'+m[2]+'/'+m[3]+'/120px--'+m[3].split('/').pop()+'.jpg';
}
function wikimediaEmbed(u){
  // https://upload.wikimedia.org/.../file.webm → embed URL
  var m=u.match(/\/\/upload\.wikimedia\.org\/wikipedia\/[^/]+\/[^/]+\/[^/]+\/([^?#]+)/);
  if(!m)return null;
  var file=m[1];
  return 'https://commons.wikimedia.org/w/index.php?title=File:'+encodeURIComponent(file)+'&embedplayer=video';
}
function $(id){return document.getElementById(id);}
function fmt(s){var m=Math.floor(s/60),sc=Math.floor(s%60);return m+':'+(sc<10?'0':'')+sc;}

function buildDOM(){
  if($('yr-p-box'))return;
  var ov=document.createElement('div');ov.id='yr-p-overlay';ov.className='yr-p-overlay hidden';
  ov.innerHTML='<div class="yr-p-box" id="yr-p-box">'+
    '<div class="yr-p-drag" id="yr-p-drag"><span id="yr-p-title" class="yr-p-drag-t">پلیر یاران</span>'+
    '<div class="yr-p-drag-btns"><button id="yc-mute" class="yr-p-pin" title="بیصدا">🔇</button><button id="yc-min" title="کوچک">—</button><button id="yc-close" title="بستن">✕</button></div></div>'+
    '<div class="yr-p-vwrap"><div id="yr-p-player"></div></div>'+
    '<div class="yr-p-bar">'+
    '<button class="yc" id="yc-next">⏭</button>'+
    '<button class="yc yplay" id="yc-play">▶</button>'+
    '<button class="yc" id="yc-prev">⏮</button>'+
    '<div class="yr-p-seek" id="yr-p-seek"><div class="yr-p-seek-fill" id="yr-p-fill"></div></div>'+
    '<span class="yr-p-tm" id="yr-p-tm">0:00</span>'+
    '<a class="yc" id="yc-link" href="#" target="_blank" title="منبع اصلی">🔗</a></div>'+
    '<div class="yr-p-plist" id="yr-p-plist"><div class="yr-p-plist-h"><span>فهرست پخش</span><span id="yr-p-cnt"></span></div>'+
    '<div id="yr-p-pitems"></div></div></div>';
  document.body.appendChild(ov);
  var mi=document.createElement('div');mi.id='yr-p-mini';mi.className='yr-p-mini hidden';
  mi.innerHTML='<div class="yr-p-mivid" id="yr-p-mivid"></div>'+
    '<div class="yr-p-mitxt"><div id="yr-p-mit" class="yr-p-mit"></div><div id="yr-p-mich" class="yr-p-mich"></div></div>'+
    '<div class="yr-p-mic">'+
    '<button class="yc" id="yc-mp">⏮</button>'+
    '<button class="yc yplay" id="yc-mpp">▶</button>'+
    '<button class="yc" id="yc-mn">⏭</button>'+
    '<button class="yc" id="yc-mx">⛶</button>'+
    '<button class="yc yr-p-cls" id="yc-mcl">✕</button></div>';
  document.body.appendChild(mi);
  bindEvents();initDrag();
}

function bindEvents(){
  $('yc-play').onclick=togglePlay;$('yc-prev').onclick=prev;$('yc-next').onclick=next;
  $('yc-close').onclick=stop;$('yc-min').onclick=toMini;
  $('yc-mpp').onclick=togglePlay;$('yc-mp').onclick=prev;$('yc-mn').onclick=next;
  $('yc-mx').onclick=toMax;$('yc-mcl').onclick=stop;
  $('yc-mute').onclick=toggleMute;
  $('yr-p-seek').onclick=function(e){var r=e.getBoundingClientRect();var p=(e.clientX-r.left)/r.width;
    if(audio&&audio.duration)audio.currentTime=p*audio.duration;
    var f=$('yr-p-yt');if(f&&f.contentWindow)f.contentWindow.postMessage(JSON.stringify({event:'command',func:'seekTo',args:[p*($('_ytdur')||120)]}),'*');
  };
}
function initDrag(){
  var box,dx,dy,dragging=false;
  $('yr-p-drag').onmousedown=function(e){
    if(e.target.tagName==='BUTTON')return;
    box=$('yr-p-box');var r=box.getBoundingClientRect();
    if(box.style.right&&box.style.right!=='auto'){box.style.left=r.left+'px';box.style.top=r.top+'px';box.style.right='auto';box.style.bottom='auto';}
    dx=e.clientX-r.left;dy=e.clientY-r.top;dragging=true;
    document.onmousemove=function(ev){if(!dragging)return;
      box.style.left=Math.max(0,ev.clientX-dx)+'px';box.style.top=Math.max(0,ev.clientY-dy)+'px';
    };
    document.onmouseup=function(){dragging=false;document.onmousemove=null;document.onmouseup=null;};
  };
  // Resize handle
  var rh=document.createElement('div');rh.className='yr-p-resize';rh.id='yr-p-resize';
  $('yr-p-box').appendChild(rh);
  var ow,oh,ox,oy,dragging2=false;
  rh.onmousedown=function(e){
    e.preventDefault();e.stopPropagation();
    box=$('yr-p-box');var r=box.getBoundingClientRect();
    if(box.style.right&&box.style.right!=='auto'){box.style.left=r.left+'px';box.style.top=r.top+'px';box.style.right='auto';box.style.bottom='auto';}
    ox=e.clientX;oy=e.clientY;ow=r.width;oh=r.height;dragging2=true;
    document.onmousemove=function(ev){if(!dragging2)return;
      var nw=Math.max(400,ow+(ev.clientX-ox));
      var nh=Math.max(300,oh+(ev.clientY-oy));
      box.style.width=nw+'px';box.style.height=nh+'px';
    };
    document.onmouseup=function(){dragging2=false;document.onmousemove=null;document.onmouseup=null;};
  };
}
function togglePlay(){
  var yt=$('yr-p-yt');
  if(yt&&yt.contentWindow){
    if(S.playing){yt.contentWindow.postMessage(JSON.stringify({event:'command',func:'pauseVideo'}),'*');S.playing=false;}
    else{yt.contentWindow.postMessage(JSON.stringify({event:'command',func:'playVideo'}),'*');S.playing=true;}
  }
  else if(vidEl){
    if(vidEl.paused){vidEl.play().catch(function(){});S.playing=true;}else{vidEl.pause();S.playing=false;}
  }
  else if(audio){
    if(audio.paused){audio.play().catch(function(){});S.playing=true;}else{audio.pause();S.playing=false;}
  }
  updateBtns();
}
function prev(){if(S.i>0)playAt(S.i-1);}
function next(){if(S.i<S.q.length-1)playAt(S.i+1);}

function playAt(i){
  if(i<0||i>=S.q.length)return;
  S.i=i;var it=S.q[i];var src=rSrc(it);var vid=isVid(it);
  if(!src&&it&&it.url&&/castbox\.fm\/(episode|va|vc)/.test(it.url)){window.open(it.url,'_blank');return;}
  var ov=$('yr-p-overlay');ov.classList.remove('hidden');S.maxOpen=true;
  var box=$('yr-p-box');if(!box._positioned){box.style.position='fixed';box.style.right='16px';box.style.bottom='16px';box.style.left='auto';box.style.top='auto';box.style.transform='none';box._positioned=true;}
  $('yr-p-title').textContent=it.titleFa||it.title||'';
  renderPlist();
  if(isYT(it.url)){
    var id=ytId(it.url);
    $('yr-p-player').innerHTML='<iframe id="yr-p-yt" src="https://www.youtube.com/embed/'+id+'?enablejsapi=1&origin='+encodeURIComponent(location.origin)+'" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    $('yc-link').href=it.url;
    $('yr-p-mivid').innerHTML='<img src="https://img.youtube.com/vi/'+id+'/mqdefault.jpg" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:6px">';
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent=it.channel||'';
    S.playing=true;updateBtns();
    // Start YouTube time polling
    if(S._ytPoll)clearInterval(S._ytPoll);
    S._ytPoll=setInterval(function(){
      var f=$('yr-p-yt');if(!f||!f.contentWindow)return;
      f.contentWindow.postMessage(JSON.stringify({event:'command',func:'getCurrentTime',args:[]}),'*');
      f.contentWindow.postMessage(JSON.stringify({event:'command',func:'getDuration',args:[]}),'*');
    },1000);
    // Listen for YouTube state updates
    if(!S._ytListener){
      S._ytListener=true;
      window.addEventListener('message',function(e){
        try{
          var d=typeof e.data==='string'?JSON.parse(e.data):e.data;
          if(d.event==='infoDelivery'&&d.info){
            if(d.info.currentTime!=null)updSeek({currentTime:d.info.currentTime,duration:d.info.duration||S._ytDur||0});
            if(d.info.duration)S._ytDur=d.info.duration;
          }
        }catch(ex){}
      });
    }
    return;
  }
  if(vid&&src&&isWikimedia(src)){
    var embUrl=wikimediaEmbed(src);
    $('yr-p-player').innerHTML='<iframe id="yr-p-yt" src="'+embUrl+'" style="width:100%;height:100%;border:none" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    $('yc-link').href=it.url||src;
    var wthumb=wikimediaThumb(src);
    var wthumbHtml=wthumb?'<img src="'+wthumb+'" style="width:100%;height:100%;object-fit:cover;border-radius:6px">':'<div style="width:100%;height:100%;background:#333;border-radius:6px;display:flex;align-items:center;justify-content:center">🎬</div>';
    $('yr-p-mivid').innerHTML=wthumbHtml;
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent='ویکی‌مدیا';
    S.playing=true;updateBtns();return;
  }
  if(vid&&src){
    $('yr-p-player').innerHTML='<video id="yr-p-vid" src="'+src+'" controls autoplay style="width:100%;height:100%;background:#000"></video>';
    vidEl=$('yr-p-vid');
    vidEl.onerror=function(){vidEl.src='/api/audio-proxy?url='+encodeURIComponent(src);};
    vidEl.ontimeupdate=function(){updSeek(vidEl);};
    vidEl.onended=next;vidEl.onplay=function(){S.playing=true;updateBtns();};vidEl.onpause=function(){S.playing=false;updateBtns();};
    $('yc-link').href=it.url||src;
    $('yr-p-mivid').innerHTML='<video src="'+src+'" muted style="width:100%;height:100%;object-fit:cover;border-radius:6px"></video>';
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent=it.channel||'';
    S.playing=true;updateBtns();return;
  }
  if(src){
    if(!audio){audio=new Audio();audio.ontimeupdate=function(){updSeek(audio);};audio.onended=next;
      audio.onplay=function(){S.playing=true;updateBtns();};audio.onpause=function(){S.playing=false;updateBtns();};}
    audio.src=src;audio.load();audio.play().catch(function(){});
    $('yr-p-player').innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ccc;font-size:1.5rem">🔊 در حال پخش صوت</div>';
    $('yc-link').href=it.url||src;
    $('yr-p-mivid').innerHTML='<div style="width:100%;height:100%;background:#333;border-radius:6px;display:flex;align-items:center;justify-content:center">🔊</div>';
    $('yr-p-mit').textContent=it.titleFa||it.title||'';
    $('yr-p-mich').textContent=it.channel||'';
    S.playing=true;updateBtns();
  }
}

function updSeek(m){
  if(!m)return;
  var cur=m.currentTime||0,dur=m.duration||S._ytDur||0;
  if(!dur)return;
  var p=(cur/dur)*100;
  if($('yr-p-fill'))$('yr-p-fill').style.width=p+'%';
  if($('yr-p-tm'))$('yr-p-tm').textContent=fmt(cur)+' / '+fmt(dur);
}
function updateBtns(){
  var c=S.playing?'⏸':'▶';
  if($('yc-play'))$('yc-play').textContent=c;
  if($('yc-mpp'))$('yc-mpp').textContent=c;
}
function toMini(){S.maxOpen=false;$('yr-p-overlay').classList.add('hidden');$('yr-p-mini').classList.remove('hidden');}
function toMax(){S.maxOpen=true;var ov=$('yr-p-overlay');ov.classList.remove('hidden');$('yr-p-mini').classList.add('hidden');var box=$('yr-p-box');if(!box._positioned){box.style.position='fixed';box.style.right='16px';box.style.bottom='16px';box.style.left='auto';box.style.top='auto';box.style.transform='none';box._positioned=true;}}
function toggleMute(){
  S.muted=!S.muted;
  var b=$('yc-mute');
  if(b)b.textContent=S.muted?'🔇':'🔊';
  // Mute video
  var v=$('yr-p-vid');if(v)v.muted=S.muted;
  // Mute YouTube
  var f=$('yr-p-yt');if(f&&f.contentWindow){
    f.contentWindow.postMessage(JSON.stringify({event:'command',func:S.muted?'mute':'unMute',args:[]}),'*');
  }
  // Mute audio
  if(audio)audio.muted=S.muted;
}
function stop(){
  if(audio){audio.pause();audio.src='';audio=null;}
  if(vidEl){vidEl.pause();vidEl.src='';vidEl=null;}
  var f=$('yr-p-yt');if(f)f.src='';
  S.playing=false;S.i=-1;S.q=[];
  if(S._ytPoll){clearInterval(S._ytPoll);S._ytPoll=null;}
  $('yr-p-overlay').classList.add('hidden');$('yr-p-mini').classList.add('hidden');
  var bx=$('yr-p-box');if(bx)bx._positioned=false;
}
function renderPlist(){
  var h=S.q.map(function(it,idx){
    var t=it.titleFa||it.title||'';var act=idx===S.i?'active':'';var ic=isVid(it)?'🎬':'🔊';
    return '<div class="yr-p-pli '+act+'" draggable="true" data-i="'+idx+'">'+
      '<span class="yr-p-pli-n">'+(idx+1)+'</span><span class="yr-p-pli-ic">'+ic+'</span>'+
      '<span class="yr-p-pli-t">'+t+'</span>'+
      '<button class="yr-p-pli-del" data-i="'+idx+'">✕</button></div>';
  }).join('');
  if($('yr-p-pitems'))$('yr-p-pitems').innerHTML=h;
  if($('yr-p-cnt'))$('yr-p-cnt').textContent=S.q.length+' آیتم';
  document.querySelectorAll('.yr-p-pli').forEach(function(el){
    el.onclick=function(e){if(e.target.classList.contains('yr-p-pli-del'))return;playAt(parseInt(el.dataset.i));};
    el.ondragstart=function(e){e.dataTransfer.setData('text',el.dataset.i);el.style.opacity='.4';};
    el.ondragend=function(){el.style.opacity='1';};
    el.ondragover=function(e){e.preventDefault();};
    el.ondrop=function(e){
      e.preventDefault();var f=parseInt(e.dataTransfer.getData('text')),t=parseInt(el.dataset.i);
      if(f===t)return;var it=S.q.splice(f,1)[0];S.q.splice(t,0,it);
      if(S.i===f)S.i=t;else if(f<S.i&&t>=S.i)S.i--;else if(f>S.i&&t<=S.i)S.i++;
      renderPlist();
    };
  });
  document.querySelectorAll('.yr-p-pli-del').forEach(function(b){
    b.onclick=function(e){e.stopPropagation();var i=parseInt(b.dataset.i);
      S.q.splice(i,1);if(i<S.i)S.i--;else if(i===S.i){S.i=Math.min(S.i,S.q.length-1);if(S.i>=0)playAt(S.i);}
      if(!S.q.length){stop();return;}renderPlist();
    };
  });
}
window.yrPlay=function(it){
  buildDOM();var k=it.url||it.title||'';
  var ex=S.q.some(function(q){return(q.url||'')===k;});
  if(!ex){if(S.q.length===0){S.q=[it];S.i=0;}else{S.q.push(it);S.i=S.q.length-1;}}
  else{S.i=S.q.findIndex(function(q){return(q.url||'')===k;});}
  playAt(S.i);
};
window.yrPlayList=function(items){buildDOM();S.q=items.slice();S.i=0;playAt(0);};
window.yrMute=function(m){
  S.muted=!!m;
  var b=$('yc-mute');if(b)b.textContent=S.muted?'🔇':'🔊';
  var v=$('yr-p-vid');if(v)v.muted=S.muted;
  var f=$('yr-p-yt');if(f&&f.contentWindow){
    f.contentWindow.postMessage(JSON.stringify({event:'command',func:S.muted?'mute':'unMute',args:[]}),'*');
  }
  if(audio)audio.muted=S.muted;
};
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  if(e.key===' '){e.preventDefault();togglePlay();}
  if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();
  if(e.key==='Escape'&&S.maxOpen)toMini();
});
})();
