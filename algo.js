/* SUNWIN VIP CORE - PROTECTED */
(function(_w){
"use strict";
var _k="U1dWSVAyMDI1",_v=0x5F3A;
function _h(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h>>>0}
function _f(s){
  var a=[],n=s.length,i,v;
  for(i=0;i<n;i++)a.push(s.charCodeAt(i)-48);
  var t=0,c=0,l=0,L=0,N=0,ts=[0,0,0,0,0,0,0,0,0,0];
  for(i=0;i<n;i++){v=a[i];t+=v;ts[v]++;if(v&1)l++;else c++;if(v>=5)L++;else N++}
  var b=0,d=0,p11=0,p22=0,p33=0,dx=0;
  for(i=0;i<n-1;i++)if(a[i]===a[i+1])b++;
  for(i=0;i<n-2;i++){var t1=a[i+1]-a[i],t2=a[i+2]-a[i+1];if(t1*t2<0)d++}
  for(i=0;i<n-2;i++){var q1=a[i]&1,q2=a[i+1]&1,q3=a[i+2]&1;if(q1!==q2&&q2!==q3)p11++}
  for(i=0;i<n-3;i++)if(a[i]===a[i+1]&&a[i+2]===a[i+3]&&a[i]!==a[i+2])p22++;
  for(i=0;i<n-5;i++)if(a[i]===a[i+1]&&a[i+1]===a[i+2]&&a[i+3]===a[i+4]&&a[i+4]===a[i+5]&&a[i]!==a[i+3])p33++;
  for(i=0;i<(n>>1);i++)if(a[i]===a[n-1-i])dx++;
  var cl=0,lc=0,ln=0,nl=0;
  for(i=0;i<n-1;i++){
    var c1=a[i]&1,c2=a[i+1]&1;if(!c1&&c2)cl++;if(c1&&!c2)lc++;
    var l1=a[i]>=5?1:0,l2=a[i+1]>=5?1:0;if(l1&&!l2)ln++;if(!l1&&l2)nl++
  }
  var H=0;for(i=0;i<10;i++)if(ts[i]){var p=ts[i]/n;H-=p*Math.log2(p)}
  var up=0,dn=0;for(i=1;i<n;i++){if(a[i]>a[i-1])up++;else if(a[i]<a[i-1])dn++}
  return {a:a,n:n,t:t,c:c,l:l,L:L,N:N,H:H,b:b,d:d,p11:p11,p22:p22,p33:p33,dx:dx,cl:cl,lc:lc,ln:ln,nl:nl,up:up,dn:dn,f0:a[0],fn:a[n-1],fm:a[n>>1]}
}
function _st(f,sd){
  var s=0;
  s+=f.t>=34?28:f.t>=30?23:f.t>=26?17:f.t>=24?10:f.t>=22?4:0;
  s+=(f.L-f.N)*6+(f.c-f.l)*4;
  s+=(f.f0>=5?4:0)+(f.fn>=5?6:0)+(f.fm>=5?3:0);
  s+=f.b*5+f.d*6+f.p11*5+f.p22*10+f.p33*15+f.dx*4;
  s+=(f.lc-f.cl)*5+(f.nl-f.ln)*5;
  s+=(f.up-f.dn)*4;
  if(f.H<2.4)s+=5;if(f.H<1.8)s+=4;
  var m=(sd^(f.t*17))%100;s+=m<45?7:m<55?3:0;
  return s
}
function _sx(f,sd){
  var s=0;
  s+=f.t<=14?28:f.t<=18?23:f.t<=22?17:f.t<=24?10:f.t<=26?4:0;
  s+=(f.N-f.L)*6+(f.l-f.c)*4;
  s+=(f.f0<=4?4:0)+(f.fn<=4?6:0)+(f.fm<=4?3:0);
  s+=f.b*5+f.d*6+f.p11*5+f.p22*10+f.p33*15+f.dx*4;
  s+=(f.cl-f.lc)*5+(f.ln-f.nl)*5;
  s+=(f.dn-f.up)*4;
  if(f.H<2.4)s+=5;if(f.H<1.8)s+=4;
  var m=(sd^(f.t*23))%100;s+=m>=55?7:m>=45?3:0;
  return s
}
function _cc(str){
  var a=[],n=str.length,i;
  for(i=0;i<n;i++)a.push(str[i]==="T"?1:0);
  if(n<2)return{p:null,c:0,y:"?"};
  var b=1;for(i=n-1;i>0;i--){if(a[i]===a[i-1])b++;else break}
  var c11=1;for(i=n-1;i>0;i--){if(a[i]!==a[i-1])c11++;else break}
  var c22=0;for(i=n-4;i>=0;i-=2){if(a[i]===a[i+1]&&a[i+2]===a[i+3]&&a[i]!==a[i+2])c22++;else break}
  var c33=0;for(i=n-6;i>=0;i-=3){if(a[i]===a[i+1]&&a[i+1]===a[i+2]&&a[i+3]===a[i+4]&&a[i+4]===a[i+5]&&a[i]!==a[i+3])c33++;else break}
  var p=null,cf=0,y="?";
  if(c33>=1){p=a[n-1]?0:1;cf=90;y="3-3"}
  else if(c22>=1){p=a[n-1]?0:1;cf=82;y="2-2"}
  else if(b>=4){p=a[n-1];cf=85;y="Bệt"+b}
  else if(b===3){p=a[n-1];cf=70;y="Bệt 3"}
  else if(c11>=4){p=a[n-1]?0:1;cf=75;y="1-1 dài"}
  else if(b===2){p=a[n-1];cf=55;y="Bệt 2"}
  else if(c11>=2){p=a[n-1]?0:1;cf=50;y="1-1"}
  return{p:p,c:cf,y:y}
}
function _run(nums,cau){
  var f=_f(nums),sd=_h(nums+cau);
  var A=_st(f,sd),B=_sx(f,sd);
  var k=_cc(cau);
  if(k.p===1)A+=k.c*1.1;else if(k.p===0)B+=k.c*1.1;
  if(A+B===0){if(f.t>=23)A=60;else B=60}
  var T=A+B,tp=(A/T)*100,xp=100-tp;
  if(Math.abs(tp-xp)<3){if(tp>xp){tp+=1.5;xp-=1.5}else{tp-=1.5;xp+=1.5}}
  tp=Math.max(20,Math.min(90,Math.round(tp)));xp=100-tp;
  var df=Math.abs(tp-xp);
  var cf=Math.min(96,Math.round(55+df*0.9+k.c*0.15));
  return {tai:tp,xiu:xp,conf:cf,winner:tp>xp?"TÀI":"XỈU",cauType:k.y}
}
function _chk(){
  var g=_k.length===12&&_v===0x5F3A;
  if(!g)return{analyze:function(){return{tai:50,xiu:50,conf:0,winner:"?",cauType:"?"}}};
  return{analyze:_run}
}
_w._sw=Object.freeze(_chk());
})(window);
