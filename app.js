(function(){
"use strict";
var $=function(id){return document.getElementById(id)};

$("toggleBtn").onclick=function(){$("tool").classList.toggle("open")};
$("closeBtn").onclick=function(){$("tool").classList.remove("open")};

var drag=false,ox=0,oy=0,panel=$("tool"),dh=$("dragHandle");
function start(x,y){drag=true;ox=x-panel.offsetLeft;oy=y-panel.offsetTop}
function move(x,y){if(!drag)return;panel.style.left=(x-ox)+"px";panel.style.top=(y-oy)+"px";panel.style.right="auto"}
dh.addEventListener("mousedown",function(e){if(e.target===$("closeBtn"))return;start(e.clientX,e.clientY)});
dh.addEventListener("touchstart",function(e){if(e.target===$("closeBtn"))return;var t=e.touches[0];start(t.clientX,t.clientY)},{passive:true});
document.addEventListener("mousemove",function(e){move(e.clientX,e.clientY)});
document.addEventListener("touchmove",function(e){var t=e.touches[0];move(t.clientX,t.clientY)},{passive:false});
document.addEventListener("mouseup",function(){drag=false});
document.addEventListener("touchend",function(){drag=false});

$("phienInput").addEventListener("input",function(e){e.target.value=e.target.value.replace(/\D/g,"")});
$("cauInput").addEventListener("input",function(e){e.target.value=e.target.value.toUpperCase().replace(/[^TX]/g,"")});

var hist=[];
function renderHist(){
  $("histCount").textContent=hist.length;
  if(!hist.length){$("histList").innerHTML='<span style="opacity:.5;font-size:8px">Chưa có</span>';return}
  $("histList").innerHTML=hist.map(function(h){
    return '<span class="hi '+(h.w==="TÀI"?"tai":"xiu")+'">'+h.w+" "+h.c+"%</span>"
  }).join("")
}

$("analyzeBtn").onclick=function(){
  var v=$("phienInput").value.trim(),cu=$("cauInput").value.trim(),msg=$("statusMsg");
  if(v.length!==7){msg.textContent="⚠ NHẬP ĐỦ 7 SỐ";msg.style.color="#ff4466";return}
  if(cu.length<2){msg.textContent="⚠ NHẬP CẦU T/X";msg.style.color="#ff4466";return}
  msg.textContent="⚡ ĐANG PHÂN TÍCH...";msg.style.color="#e3f2fd";
  $("cardTai").classList.remove("win");$("cardXiu").classList.remove("win");
  setTimeout(function(){
    var r=window._sw.analyze(v,cu);
    $("taiPct").textContent=r.tai+"%";
    $("xiuPct").textContent=r.xiu+"%";
    if(r.winner==="TÀI")$("cardTai").classList.add("win");else $("cardXiu").classList.add("win");
    msg.textContent="🐼 "+r.winner+" • "+r.cauType+" • Tin cậy "+r.conf+"%";
    msg.style.color=r.winner==="TÀI"?"#42a5f5":"#e3f2fd";
    hist.unshift({w:r.winner,c:r.conf});
    if(hist.length>12)hist.pop();
    renderHist();
  },1200);
};
renderHist();
})();
