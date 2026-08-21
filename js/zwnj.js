/* ZWNJ auto-fixer v2 — MutationObserver + comprehensive patterns */
(function(){
  var Z='\u200c';
  var P=[
    /* ها/های/ات after consonant */
    [/([\u0600-\u065F\u0670-\u06EF])(های|ها|ات|ام|ای)(?=[\s,\.\!\?\)\]\u060C\u061B]|$)/g,'$1'+Z+'$2'],
    /* می/نمی + space */
    [/(می|نمی)(\s)/g,'$1'+Z+'$2'],
  ];
  function fix(t){
    if(!t||typeof t!=='string')return t;
    if(t.indexOf(Z)>=0)return t;
    var r=t;
    P.forEach(function(p){r=r.replace(p[0],p[1]);});
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
