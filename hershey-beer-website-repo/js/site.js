/* Hershey Beer website script. Holiday hours and the seasonal calendar are near the top. */

/* ---------- winner photos open bigger ---------- */
(function(){
  const lb=document.getElementById("lightbox"); if(!lb||!lb.showModal) return;
  const img=document.getElementById("lbImg"), cap=document.getElementById("lbCap");
  document.querySelectorAll(".pola-btn").forEach(b=>b.addEventListener("click",()=>{img.src=b.dataset.src;img.alt=b.dataset.cap;cap.textContent=b.dataset.cap;lb.showModal();}));
  lb.addEventListener("click",e=>{if(e.target===lb)lb.close();});
})();
/* =====================================================================
   SEASONAL CALENDAR
   The letter board and the first announcement change by themselves based
   on today's date (Eastern time). Nothing needs to be touched during the
   year. To preview any date, add #season-MM-DD to the end of the link,
   for example  hersheybeer.netlify.app/#season-12-20
   ===================================================================== */

/* Holiday hours. Add dates the store is closed or has different hours.
   Format: 'YYYY-MM-DD': 'closed'   or   'YYYY-MM-DD': [openHour, closeHour] (24-hour clock)
   Example:  '2026-12-25': 'closed',   '2026-12-24': [9, 17],
   These update the open/closed status and get announced a week ahead. */
const SPECIAL_HOURS={
};

/* Messages that rotate after the seasonal one, all year. */
const EVERGREEN=[
  'Now on DoorDash. <a href="https://www.doordash.com/convenience/store/hershey-beer-distributor-hummelstown-31844835/" target="_blank" rel="noopener">Order cold beer to your door</a>',
  'Build your own six-pack with Mix-A-Six singles',
  'Giveaway winners are posted on <a href="https://www.instagram.com/hershey_beer/" target="_blank" rel="noopener">Instagram @hershey_beer</a>. Ask at the counter about the current one'
];

const TODAY=(()=>{
  const d=new Date(new Date().toLocaleString("en-US",{timeZone:"America/New_York"}));
  const m=(location.hash||"").match(/^#season-(\d\d)-(\d\d)$/);
  if(m){d.setMonth(+m[1]-1,+m[2]);}
  d.setHours(12,0,0,0); return d;
})();

const SEASON=(()=>{
  const Y=TODAY.getFullYear();
  const D=(m,d)=>new Date(Y,m-1,d,12);
  const nth=(m,wd,n)=>{const d=D(m,1);d.setDate(1+((wd-d.getDay()+7)%7)+7*(n-1));return d;};
  const last=(m,wd)=>{const d=new Date(Y,m,0,12);d.setDate(d.getDate()-((d.getDay()-wd+7)%7));return d;};
  const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x;};
  const thanks=nth(11,4,4), memorial=last(5,1), labor=nth(9,1,1), bigGame=nth(2,0,2);
  const mon=d=>d.toLocaleDateString("en-US",{month:"short",day:"numeric"});
  const list=[
    {from:D(12,18),to:D(12,25),board:['MERRY','*CHRISTMAS','','FROM ALL OF US','AT HERSHEY BEER','','!CHEERS'],
      ann:`Merry Christmas from all of us at Hershey Beer. Party coming up? Call for a keg: TEL`},
    {from:D(12,26),to:D(12,31),board:['NEW YEARS EVE','*AT HERSHEY BEER','','RING IT IN','KEGS · ICE · 30S','BUBBLY SELTZERS','!RESERVE A KEG'],
      ann:`Ringing in ${Y+1}? Reserve your keg early: TEL`},
    {from:add(bigGame,-10),to:bigGame,board:['GAME DAY AT','*HERSHEY BEER','','BIG GAME','SUNDAY '+mon(bigGame).toUpperCase(),'KEGS · ICE · 30S','!CALL AHEAD'],
      ann:`Big game party on ${mon(bigGame)}? Kegs, 30-racks and ice are ready. Call ahead: TEL`},
    {from:D(2,7),to:D(2,14),board:['HAPPY','*VALENTINES DAY','','DATE NIGHT?','BUILD A SIX OF','SOMETHING NEW','!MIX-A-SIX'],
      ann:`Valentine's Day plans? Build a Mix-A-Six of something new`},
    {from:D(3,1),to:D(3,17),board:['ST PATRICKS DAY','*IS COMING','','STOCK UP ON','STOUTS & ALES','KEGS · ICE','!RESERVE A KEG'],
      ann:`St. Patrick's Day is March 17. Stouts, ales and kegs are ready. Call: TEL`},
    {from:D(4,25),to:D(5,5),board:['CINCO DE MAYO','*AT HERSHEY BEER','','MEXICAN LAGERS','ICE COLD','LIMES NOT INCL.','!SALUD'],
      ann:`Cinco de Mayo is coming. Ice cold Mexican lagers in the cooler`},
    {from:add(memorial,-10),to:memorial,board:['MEMORIAL DAY','*WEEKEND','','COOKOUT READY','KEGS · ICE · 30S','SELTZERS TOO','!RESERVE A KEG'],
      ann:`Memorial Day cookout? Kegs, 30-racks and ice are ready. Reserve a keg: TEL`},
    {from:D(6,25),to:D(7,4),board:['HAPPY 4TH OF','*JULY','','PARTY READY','KEGS · ICE · 30S','RED WHITE & BREW','!RESERVE A KEG'],
      ann:`Fourth of July party? Reserve your keg now: TEL`},
    {from:add(labor,-10),to:labor,board:['LABOR DAY','*WEEKEND','','LAST COOKOUT','OF SUMMER','KEGS · ICE · 30S','!RESERVE A KEG'],
      ann:`Labor Day weekend: last cookout of summer. Reserve a keg: TEL`},
    {from:D(10,20),to:D(10,31),board:['HAPPY','*HALLOWEEN','','PARTY THIS','WEEKEND?','KEGS · ICE · 30S','!BOO-ZE RUN'],
      ann:`Halloween party? Kegs, 30-racks and ice are ready. Call: TEL`},
    {from:thanks,to:thanks,board:['HAPPY','*THANKSGIVING','','THANKFUL FOR','ALL OF YOU','','!CHEERS'],
      ann:`Happy Thanksgiving from all of us at Hershey Beer`},
    {from:D(11,1),to:add(thanks,-1),board:['THIS WEEK AT','*HERSHEY BEER','','THANKSGIVING','STOCK UP EARLY','KEGS · ICE · 30S','!RESERVE A KEG'],
      ann:`Thanksgiving is ${thanks.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}. Reserve your keg now: TEL`},
    {from:add(thanks,1),to:D(12,17),board:['HAPPY HOLIDAYS','*HERSHEY BEER','','GIFT IDEA:','BUILD A','MIX-A-SIX','!PARTY KEGS'],
      ann:`Holiday gift idea: build someone a Mix-A-Six. Holiday party? Call for a keg: TEL`},
    {from:D(1,1),to:D(1,31),board:['NEW YEAR AT','*HERSHEY BEER','','DOING DRY JAN?','WE CARRY N/A','BEER TOO','!CHEERS TO '+Y],
      ann:`Doing Dry January? We carry non-alcoholic beer too`},
    {from:add(memorial,1),to:add(labor,-11),board:['SUMMER AT','*HERSHEY BEER','','ICE COLD BEER','SELTZERS · ICE','SLUSHIES','!OPEN 7 DAYS'],
      ann:`Summer's here. Ice cold beer, seltzers, slushies and bagged ice, open 7 days`},
    {from:add(labor,1),to:D(10,19),board:['FALL AT','*HERSHEY BEER','','OKTOBERFEST','& FALL BEERS','TAILGATE READY','!GAME DAY KEGS'],
      ann:`Football season is here. Tailgate kegs, 30-racks and ice. Call: TEL`}
  ];
  const hit=list.find(x=>TODAY>=x.from&&TODAY<=x.to)||{board:['THIS WEEK AT','*HERSHEY BEER','','ICE COLD BEER','OPEN 7 DAYS','KEGS · CO2 · ICE','!MIX-A-SIX'],ann:`Kegs, CO₂ refills and special orders. Call ahead: TEL`};
  return {board:hit.board,ann:hit.ann.replace("TEL",'<a href="tel:7175668231">717-566-8231</a>')};
})();

/* Holiday hours coming up in the next 7 days get announced first. */
const UPCOMING_SPECIAL=(()=>{
  const out=[];
  for(let i=0;i<8;i++){
    const d=new Date(TODAY);d.setDate(d.getDate()+i);
    const k=d.toLocaleDateString("en-CA"), v=SPECIAL_HOURS[k]; if(!v) continue;
    const label=i===0?"Today":i===1?"Tomorrow":d.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"});
    const f=h=>(h%12||12)+(h<12?"am":"pm");
    out.push(`<b>Holiday hours:</b> ${label} we're ${v==="closed"?"closed":"open "+f(v[0])+" to "+f(v[1])}`);
  }
  return out;
})();

const SITE={
  announcements:[...UPCOMING_SPECIAL,SEASON.ann,...EVERGREEN],
  board:SEASON.board
};
(function(){
  const reduceM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* header height for spacing */
  const head=document.getElementById("siteHead");
  const setH=()=>document.documentElement.style.setProperty("--head-h",head.offsetHeight+"px");
  setH(); addEventListener("resize",setH);
  /* announcement bar */
  const ann=document.getElementById("ann"), msg=document.getElementById("annMsg");
  let hidden=false; try{hidden=sessionStorage.getItem("hb_ann_x")==="1";}catch(e){}
  if(hidden){ann.hidden=true;setH();}
  let i=0; msg.innerHTML=SITE.announcements[0];
  if(SITE.announcements.length>1&&!reduceM) setInterval(()=>{
    msg.style.opacity=0;
    setTimeout(()=>{i=(i+1)%SITE.announcements.length;msg.innerHTML=SITE.announcements[i];msg.style.opacity=1;},350);
  },6000);
  document.getElementById("annX").onclick=()=>{ann.hidden=true;try{sessionStorage.setItem("hb_ann_x","1");}catch(e){} setH(); dispatchEvent(new Event("scroll"));};
  /* letter board: each letter sits a little crooked, like a real felt board */
  const board=document.getElementById("board");
  let seed=7; const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
  let n=0;
  board.innerHTML=SITE.board.slice(0,7).map(line=>{
    let cls="bl"; if(line[0]==="*"){cls+=" gold";line=line.slice(1);} else if(line[0]==="!"){cls+=" red";line=line.slice(1);}
    const chars=[...line].map(ch=>ch===" "?" ":`<i style="transform:translateY(${(rnd()*2-1).toFixed(1)}px) rotate(${(rnd()*3-1.5).toFixed(1)}deg);animation-delay:${(n++)*22}ms">${ch==="&"?"&amp;":ch.replace(/[<>]/g,"")}</i>`).join("");
    return `<div class="${cls}">${chars}</div>`;
  }).join("");
  board.setAttribute("aria-label","This week at Hershey Beer: "+SITE.board.map(l=>l.replace(/^[*!]/,"")).filter(Boolean).join(", "));
  if(!reduceM) requestAnimationFrame(()=>board.closest(".board-wrap").classList.add("ready"));
  /* photo slots: hide any photo that hasn't been added yet */
  document.querySelectorAll("img.ph").forEach(img=>{
    const drop=()=>img.remove();
    if(img.complete&&img.naturalWidth===0) drop(); else img.addEventListener("error",drop);
  });
})();

/* ---------- age check: shows once, then remembered on this device ---------- */
(function(){
  const KEY="hb_age_ok", gate=document.getElementById("gate");
  let ok=false; try{ok=localStorage.getItem(KEY)==="1";}catch(e){}
  if(ok||!gate) return;
  const ask=document.getElementById("gateAsk"), denied=document.getElementById("gateDenied");
  const root=document.documentElement;
  gate.hidden=false; root.classList.add("gate-open");
  const focusables=()=>[...gate.querySelectorAll("button,a")].filter(el=>!el.closest("[hidden]"));
  setTimeout(()=>document.getElementById("gateYes").focus(),50);
  gate.addEventListener("keydown",e=>{
    if(e.key!=="Tab")return;
    const f=focusables(); if(!f.length)return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
  document.getElementById("gateYes").onclick=()=>{
    try{localStorage.setItem(KEY,"1");}catch(e){}
    gate.hidden=true; root.classList.remove("gate-open");
  };
  document.getElementById("gateNo").onclick=()=>{
    ask.hidden=true; denied.hidden=false;
    gate.setAttribute("aria-labelledby","gateDeniedTitle");
    gate.querySelector(".gate-leave").focus();
  };
  document.getElementById("gateBack").onclick=()=>{
    denied.hidden=true; ask.hidden=false;
    gate.setAttribute("aria-labelledby","gateTitle");
    document.getElementById("gateYes").focus();
  };
})();
/* ---------- store hours (0 = Sunday). Edit here if hours change. ---------- */
const HOURS=[{d:"Sunday",o:11,c:17},{d:"Monday",o:9,c:21},{d:"Tuesday",o:9,c:21},{d:"Wednesday",o:9,c:21},{d:"Thursday",o:9,c:21},{d:"Friday",o:9,c:21},{d:"Saturday",o:9,c:21}];
const fmt=h=>(h%12||12)+(h<12?"am":"pm");
const now=new Date(new Date().toLocaleString("en-US",{timeZone:"America/New_York"}));
const hoursOn=d=>{const v=SPECIAL_HOURS[d.toLocaleDateString("en-CA")];if(v==="closed")return null;if(Array.isArray(v))return{o:v[0],c:v[1]};return HOURS[d.getDay()];};
const day=now.getDay(), hr=now.getHours()+now.getMinutes()/60, t=hoursOn(now);
const isOpen=!!t&&hr>=t.o&&hr<t.c;
let nextTxt="";
if(t&&hr<t.o) nextTxt=`today at ${fmt(t.o)}`;
else for(let i=1;i<8;i++){const d=new Date(now);d.setDate(d.getDate()+i);const h=hoursOn(d);if(h){nextTxt=`${i===1?"tomorrow":d.toLocaleDateString("en-US",{weekday:"long"})} at ${fmt(h.o)}`;break;}}
const msg=isOpen?`Open now until ${fmt(t.c)}`:`Closed now · opens ${nextTxt}`;
document.querySelectorAll(".js-status").forEach(el=>{el.textContent=isOpen?`Open now · until ${fmt(t.c)}`:`Closed · opens ${nextTxt.replace(" at","")}`;el.classList.add(isOpen?"is-open":"is-closed");});
const th=document.getElementById("todayHours");if(th)th.textContent=t?`${fmt(t.o)} – ${fmt(t.c)}`:"Closed today";
document.getElementById("neonNote").textContent=msg;
if(isOpen)document.getElementById("neon").classList.add("on");
const hl=document.getElementById("hours");hl.innerHTML="";
[1,2,3,4,5,6,0].forEach(i=>{const li=document.createElement("li");let txt=`${fmt(HOURS[i].o)} – ${fmt(HOURS[i].c)}`;if(i===day){li.className="today";if(SPECIAL_HOURS[now.toLocaleDateString("en-CA")])txt=t?`${fmt(t.o)} – ${fmt(t.c)} today`:"Closed today";}li.innerHTML=`<span>${HOURS[i].d}</span><span>${txt}</span>`;hl.appendChild(li);});
document.getElementById("yr").textContent=new Date().getFullYear();

const $=id=>document.getElementById(id);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =====================================================================
   TOP SELLERS SLIDER
   To use real product photos, save a cut-out PNG (transparent background)
   for each one in photos/products/ with the file name listed below.
   Until a photo is there, a plain stand-in bottle or can is shown.
   ===================================================================== */
(function(){
  const stage=$("luStage"); if(!stage) return;
  const sec=$("lineup");
  const P=[
    {id:"michelob-ultra",name:"Michelob Ultra",word:"Ultra",t:["Michelob","Ultra"],style:"Light lager · 4.2% ABV",desc:"Light, crisp and low carb. The go-to for golf rounds, game days and the gym crowd.",bg:"#24476e",glow:"rgba(150,200,255,.5)",pat:"stripes",ar:.263,h:1,els:["ice","drop","ice","drop","bubble"]},
    {id:"corona-extra",name:"Corona Extra",word:"Corona",t:["Corona","Extra"],style:"Mexican lager · 4.6% ABV",desc:"Clean and easy drinking. Grab a lime, close your eyes and pretend you're on a beach.",bg:"#0b6f78",glow:"rgba(255,220,120,.5)",pat:"waves",ar:.256,h:1,els:["lime","lime","ice","drop","lime"]},
    {id:"yuengling-lager",name:"Yuengling Traditional Lager",word:"Yuengling",t:["Yuengling","Lager"],style:"Amber lager · 4.5% ABV",desc:"Brewed in Pottsville, PA by America's oldest brewery. A true Pennsylvania staple.",bg:"#3a2213",glow:"rgba(230,150,70,.5)",pat:"grain",ar:.254,h:1,els:["barley","hop","barley","hop","barley"]},
    {id:"super-lyte",name:"Super Lyte",word:"Super Lyte",t:["Super","Lyte"],style:"Vodka + ade · Zero sugar",desc:"A zero sugar vodka cocktail. Comes in Fruit Punch, Lemon Lime, Orange and Blue Chill.",bg:"#b8325a",glow:"rgba(255,170,190,.55)",pat:"bubbles",ar:.354,h:.82,els:["bubble","ice","lime","drop","bubble"]},
    {id:"surfside",name:"Surfside",word:"Surfside",t:["Surfside","Lemonade"],style:"Lemonade + vodka · 4.5% ABV",desc:"A vodka cocktail made with lemonade. Also comes in Strawberry, Raspberry and Black Cherry.",bg:"#f4c542",glow:"#fff6d6",pat:"waves",light:true,ar:.365,h:.82,els:["lemon","ice","lemon","drop","lemon"]},
    {id:"samuel-adams",name:"Samuel Adams Boston Lager",word:"Sam Adams",t:["Sam","Adams"],style:"Vienna-style lager · 5.0% ABV",desc:"Malty, hoppy and balanced. One of the beers that kicked off American craft brewing.",bg:"#4f0f17",glow:"rgba(220,90,90,.5)",pat:"hops",ar:.257,h:1,els:["hop","barley","hop","barley","hop"]},
    {id:"white-claw",name:"White Claw",word:"White Claw",t:["White","Claw"],style:"Hard seltzer · 5% ABV",desc:"Light, bubbly and full of flavor, like Watermelon. Grab a variety pack and find your favorite.",bg:"#dff1e8",glow:"#ffffff",pat:"waves",light:true,ar:.368,h:.82,els:["lime","bubble","bubble","lime","bubble"]},
    {id:"busch-light",name:"Busch Light",word:"Busch Light",t:["Busch","Light"],style:"Light lager · 4.1% ABV",desc:"A cold, easy classic. Made for the 30-rack and the great outdoors.",bg:"#2a6f9e",glow:"rgba(170,220,255,.5)",pat:"mountains",ar:.265,h:1,els:["pine","ice","pine","ice","pine"]},
    {id:"bud-light",name:"Bud Light",word:"Bud Light",t:["Bud","Light"],style:"Light lager · 4.2% ABV",desc:"Easy drinking and always ice cold in our walk-in cooler.",bg:"#1b2fa0",glow:"rgba(110,140,255,.55)",pat:"bubbles",ar:.269,h:1,els:["ice","bubble","drop","ice","bubble"]}
  ];
  /* where the floating pieces sit: x/y in % of the stage, size, depth */
  const SPOTS=[
    {x:17,y:20,s:.13,r:-18,z:1.3},
    {x:79,y:14,s:.09,r:24,z:1},
    {x:30,y:68,s:.1,r:12,z:1.2,minor:1},
    {x:70,y:72,s:.12,r:-10,z:1.6},
    {x:4,y:86,s:.24,r:30,z:2.6,fg:1}
  ];
  const n=P.length; let cur=0, busy=false, uid=0;
  $("luTotal").textContent=String(n).padStart(2,"0");

  /* ---- stand-in bottle / can drawings, used until real photos are added ---- */
  function standIn(p){
    const t=p.name.replace(/&/g,"&amp;"), ink=p.ink||"#fff";
    if(p.shape==="bottle") return `<svg class="lu-ph" viewBox="0 0 120 400" aria-hidden="true"><defs><linearGradient id="g${++uid}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".35" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
      <path d="M46 8h28v10l3 70c2 30 33 44 33 82v214q0 12-12 12H22q-12 0-12-12V170c0-38 31-52 33-82l3-70Z" fill="${p.body}"/>
      <path d="M48 120h24v0c-1 20-30 30-30 52v210h36" fill="${p.liquid||p.body}" opacity=".55"/>
      <rect x="44" y="2" width="32" height="16" rx="4" fill="#c9c9cf"/>
      <rect x="10" y="215" width="100" height="120" fill="${p.label}"/>
      <text x="60" y="270" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="${t.length>14?11:15}" letter-spacing="1" fill="${ink}">${t.toUpperCase()}</text>
      <text x="60" y="292" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-size="8" letter-spacing="2" fill="${ink}" opacity=".7">PHOTO COMING SOON</text>
      <path d="M46 8h28v10l3 70c2 30 33 44 33 82v214q0 12-12 12H22q-12 0-12-12V170c0-38 31-52 33-82l3-70Z" fill="url(#g${uid})"/></svg>`;
    const w=p.shape==="slim"?84:120, x=(140-w)/2;
    return `<svg class="lu-ph" viewBox="0 0 140 360" aria-hidden="true"><defs><linearGradient id="g${++uid}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient></defs>
      <rect x="${x}" y="16" width="${w}" height="336" rx="${p.shape==="slim"?14:18}" fill="${p.body}"/>
      <ellipse cx="70" cy="18" rx="${w/2-4}" ry="8" fill="#d9d9de"/><ellipse cx="70" cy="18" rx="${w/2-12}" ry="5" fill="#b9b9c0"/>
      <rect x="${x}" y="120" width="${w}" height="130" fill="${p.label}"/>
      <text x="70" y="182" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="${p.shape==="slim"?12:15}" letter-spacing="1" fill="#fff">${t.toUpperCase()}</text>
      <text x="70" y="202" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-size="7.5" letter-spacing="2" fill="#fff" opacity=".75">PHOTO COMING SOON</text>
      <rect x="${x}" y="16" width="${w}" height="336" rx="${p.shape==="slim"?14:18}" fill="url(#g${uid})"/></svg>`;
  }
  /* real photo if one exists, otherwise the stand-in */
  const media=P.map(p=>{
    const box=document.createElement("div"); box.className="lu-media"; box.innerHTML=standIn(p);
    const img=new Image(); img.alt=p.name; img.decoding="async";
    img.onload=()=>{box.innerHTML="";box.appendChild(img);};
    img.src=`photos/products/${p.id}.webp`;
    return box;
  });

  /* ---- tone-on-tone background patterns ---- */
  function pattern(kind,light){
    const c=light?"rgba(17,17,19,.09)":"rgba(255,255,255,.1)", id="pt"+(++uid);
    const tiles={
      stripes:`<pattern id="${id}" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)"><path d="M0 23H46" stroke="${c}" stroke-width="10"/></pattern>`,
      waves:`<pattern id="${id}" width="160" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><path d="M0 32c20-22 60-22 80 0s60 22 80 0" fill="none" stroke="${c}" stroke-width="6"/><path d="M0 60c20-22 60-22 80 0s60 22 80 0" fill="none" stroke="${c}" stroke-width="2"/></pattern>`,
      grain:`<pattern id="${id}" width="90" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(18)"><g fill="none" stroke="${c}" stroke-width="3"><path d="M45 115V35"/><ellipse cx="37" cy="45" rx="6" ry="12" transform="rotate(-25 37 45)"/><ellipse cx="53" cy="45" rx="6" ry="12" transform="rotate(25 53 45)"/><ellipse cx="37" cy="68" rx="6" ry="12" transform="rotate(-25 37 68)"/><ellipse cx="53" cy="68" rx="6" ry="12" transform="rotate(25 53 68)"/><ellipse cx="45" cy="24" rx="6" ry="13"/></g></pattern>`,
      hops:`<pattern id="${id}" width="110" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)"><g fill="none" stroke="${c}" stroke-width="3"><path d="M55 14c-14 2-20 14-16 24 6-4 12-4 16 0 4-4 10-4 16 0 4-10-2-22-16-24Z"/><path d="M55 32c-18 2-24 16-18 28 6-5 12-5 18-1 6-4 12-4 18 1 6-12 0-26-18-28Z"/><path d="M55 52c-17 2-23 15-16 26 5-4 11-4 16 0 5-4 11-4 16 0 7-11 1-24-16-26Z"/></g></pattern>`,
      bubbles:`<pattern id="${id}" width="140" height="140" patternUnits="userSpaceOnUse"><g fill="none" stroke="${c}" stroke-width="3"><circle cx="30" cy="30" r="18"/><circle cx="96" cy="58" r="9"/><circle cx="62" cy="108" r="26"/><circle cx="122" cy="122" r="5"/></g></pattern>`,
      mountains:`<pattern id="${id}" width="240" height="120" patternUnits="userSpaceOnUse"><path d="M0 110L50 40L80 75L120 20L170 85L200 55L240 110" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round"/><path d="M110 34L120 20L131 34" fill="none" stroke="${c}" stroke-width="3"/></pattern>`
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><defs>${tiles[kind]}</defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
  }

  /* ---- list, dots ---- */
  const list=$("luList"), dots=$("luDots");
  P.forEach((p,i)=>{
    const li=document.createElement("li"); const b=document.createElement("button"); b.type="button"; b.textContent=p.name.replace("Samuel Adams Boston Lager","Sam Adams").replace("Yuengling Traditional Lager","Yuengling"); b.onclick=()=>go(i); li.appendChild(b); list.appendChild(li);
    const d=document.createElement("button"); d.type="button"; d.setAttribute("aria-label",`Show ${p.name}`); d.onclick=()=>go(i); dots.appendChild(d);
  });

  const EASE="cubic-bezier(.7,0,.2,1)", DUR=reduce?1:1250;
  /* size the name so each word fits on its own side of the product, never over it */
  const fitTitle=(el,p)=>{
    const W=stage.clientWidth,H=stage.clientHeight;
    if(W<720){el.style.setProperty("--ts",Math.min(W*.9/(p.word.length*.66),96)+"px");return;}
    const prodW=H*.76*p.h*p.ar, L=Math.max(p.t[0].length,p.t[1].length);
    let gap=prodW+Math.max(44,W*.035);
    let ts=Math.min((W/2-gap/2-Math.max(28,W*.03))/(L*.68),H*.24,230);
    gap+=ts*.26;   /* room for the slant of the letters */
    ts=Math.min((W/2-gap/2-Math.max(28,W*.03))/(L*.68),H*.24,230);
    el.style.setProperty("--ts",ts+"px"); el.style.setProperty("--gap",gap+"px");
  };

  function build(i,dir,first){
    const p=P[i];
    /* background colour, glow, pattern */
    sec.style.backgroundColor=p.bg; sec.style.setProperty("--glow",p.glow); sec.classList.toggle("light",!!p.light);
    const bg=$("luBg"), lay=document.createElement("div"); lay.style.cssText="position:absolute;inset:0"; lay.innerHTML=pattern(p.pat,p.light);
    bg.appendChild(lay);
    if(!first){lay.animate([{opacity:0,transform:`scale(1.12) translateX(${dir*4}%)`},{opacity:1,transform:"none"}],{duration:DUR,easing:EASE});}
    [...bg.children].slice(0,-1).forEach(o=>o.animate([{opacity:1},{opacity:0}],{duration:DUR*.8,easing:EASE,fill:"forwards"}).finished.then(()=>o.remove()));

    /* giant word behind, outline copy in front */
    const title=document.createElement("div"); title.className="lu-title"; title._p=p;
    title.innerHTML=`<div class="lu-tin"><span class="w1">${p.t[0]}</span><span class="gap"></span><span class="w2">${p.t[1]}</span><span class="one">${p.word}</span></div>`;
    fitTitle(title,p);
    /* product */
    const prod=document.createElement("div"); prod.className="lu-prod"; prod.style.setProperty("--ar",p.ar);prod.style.setProperty("--h",p.h);
    const par=document.createElement("div"); par.className="lu-par"; const fl=document.createElement("div"); fl.className="lu-float"; fl.appendChild(media[i]); par.appendChild(fl); prod.appendChild(par);
    const shadow=document.createElement("div"); shadow.className="lu-shadow";
    /* floating pieces */
    const W=stage.clientWidth,H=stage.clientHeight, base=Math.min(W,H*1.3);
    const els=p.els.map((k,j)=>{
      const sp=SPOTS[j], e=document.createElement("div"); e.className="lu-el"+(sp.minor?" minor":"");
      const size=Math.round(base*sp.s*(W<720?1.25:1));
      e.style.cssText=`--s:${size}px;--z:${sp.z};--zi:${sp.fg?4:1};--bob:${5+j}s;left:calc(${sp.x}% - ${size/2}px);top:calc(${sp.y}% - ${size/2}px)`;
      e.innerHTML=`<div class="lu-elp"><div class="lu-eli" style="transform:rotate(${sp.r}deg);${sp.fg?"filter:blur(3px)":""}"><svg><use href="#el-${k}"/></svg></div></div>`;
      e._sp=sp; return e;
    });
    const nodes=[title,shadow,prod,...els];
    nodes.forEach(nd=>stage.appendChild(nd));

    if(first||reduce) return nodes;
    const o={duration:DUR,easing:EASE,fill:"backwards"};
    title.firstChild.animate([{transform:`translateX(${dir*55}%) skewX(${-dir*14}deg)`,opacity:0,filter:"blur(12px)"},{transform:"none",opacity:1,filter:"blur(0)"}],{...o,delay:120});
    prod.animate([{transform:`translateX(calc(-50% + ${dir*46}vw)) rotateY(${dir*200}deg) rotateZ(${dir*6}deg) scale(.72)`,opacity:0,filter:"blur(6px)"},{opacity:1,offset:.22},{transform:"translateX(-50%) rotateY(0deg) rotateZ(0deg) scale(1)",opacity:1,filter:"blur(0px)"}],o);
    shadow.animate([{opacity:0,transform:"translateX(-50%) scaleX(.3)"},{opacity:1,transform:"translateX(-50%) scaleX(1)"}],{...o,delay:300});
    els.forEach((e,j)=>{
      const sp=e._sp, dx=(sp.x-50)*1.6+dir*30, dy=(sp.y-50)*1.6;
      e.firstChild.firstChild.animate([{transform:`translate(${dx}vw,${dy}vh) scale(2.8) rotate(${dir*60}deg)`,filter:"blur(14px)",opacity:0},{opacity:1,offset:.35},{transform:`rotate(${sp.r}deg)`,filter:sp.fg?"blur(3px)":"blur(0)",opacity:1}],{duration:DUR+250,easing:"cubic-bezier(.16,.84,.24,1)",delay:80+j*70,fill:"backwards"});
    });
    return nodes;
  }
  function leave(nodes,dir){
    const o={duration:DUR*.85,easing:EASE,fill:"forwards"};
    nodes.forEach(nd=>{
      let a;
      if(nd.classList.contains("lu-prod")) a=nd.animate([{transform:"translateX(-50%) rotateY(0deg) scale(1)",opacity:1,filter:"blur(0px)"},{opacity:1,offset:.55},{transform:`translateX(calc(-50% - ${dir*46}vw)) rotateY(${-dir*200}deg) rotateZ(${-dir*6}deg) scale(.72)`,opacity:0,filter:"blur(6px)"}],o);
      else if(nd.classList.contains("lu-title")) a=nd.firstChild.animate([{transform:"none",opacity:1},{transform:`translateX(${-dir*55}%) skewX(${dir*14}deg)`,opacity:0,filter:"blur(10px)"}],o);
      else if(nd.classList.contains("lu-el")){const sp=nd._sp;a=nd.firstChild.firstChild.animate([{opacity:1,transform:`rotate(${sp.r}deg)`},{opacity:0,transform:`translate(${(sp.x-50)*1.2-dir*30}vw,${(sp.y-50)*1.2}vh) scale(.3) rotate(${-dir*90}deg)`}],{...o,duration:DUR*.7});}
      else a=nd.animate([{opacity:1},{opacity:0}],o);
      a.finished.then(()=>nd.remove());
    });
  }
  function setInfo(i,animate){
    const p=P[i], card=$("luCard");
    const apply=()=>{$("luStyle").textContent=p.style;$("luName").textContent=p.name;$("luDesc").textContent=p.desc;$("luNum").textContent=String(i+1).padStart(2,"0");card.classList.remove("swap");};
    [...list.querySelectorAll("button")].forEach((b,k)=>b.setAttribute("aria-current",k===i));
    [...dots.children].forEach((b,k)=>b.setAttribute("aria-current",k===i));
    if(animate&&!reduce){card.classList.add("swap");setTimeout(apply,380);} else apply();
  }
  let live=build(0,1,true); setInfo(0,false);
  function go(i,dir){
    if(busy||i===cur) return; busy=true;
    dir=dir||(i>cur?1:-1);
    leave(live,dir); live=build(i,dir,false); cur=i; setInfo(i,true);
    setTimeout(()=>busy=false,reduce?50:DUR*.75);
  }
  const next=()=>go((cur+1)%n,1), prev=()=>go((cur-1+n)%n,-1);
  $("luNext").onclick=next; $("luPrev").onclick=prev;
  sec.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){next();e.preventDefault();}if(e.key==="ArrowLeft"){prev();e.preventDefault();}});
  /* swipe */
  let sx=null,sy=0;
  stage.addEventListener("pointerdown",e=>{sx=e.clientX;sy=e.clientY;});
  addEventListener("pointerup",e=>{if(sx===null)return;const dx=e.clientX-sx,dy=e.clientY-sy;sx=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))(dx<0?next:prev)();});
  /* 3D tilt with the mouse */
  if(!reduce&&matchMedia("(pointer:fine)").matches){
    sec.addEventListener("pointermove",e=>{const r=sec.getBoundingClientRect();sec.style.setProperty("--px",((e.clientX-r.left)/r.width*2-1).toFixed(3));sec.style.setProperty("--py",((e.clientY-r.top)/r.height*2-1).toFixed(3));});
    sec.addEventListener("pointerleave",()=>{sec.style.setProperty("--px",0);sec.style.setProperty("--py",0);});
  }
  addEventListener("resize",()=>stage.querySelectorAll(".lu-title").forEach(t=>fitTitle(t,t._p)));
})();

/* cooler light flicks on when the door comes into view */
const door=$("door");
if(!reduce&&"IntersectionObserver" in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){door.classList.add("flick");io.disconnect();}}),{threshold:.4});
  io.observe(door);
}

/* ---------- sizes ---------- */
const SIZES=[
  {k:"Single",n:1,name:"Single",note:"Just one. Grab a few and make a Mix-A-Six."},
  {k:"6",n:6,name:"6-pack",note:"The classic."},
  {k:"12",n:12,name:"12-pack",note:"The usual for a game night."},
  {k:"15",n:15,name:"15-pack",note:"A 12 with a little extra."},
  {k:"18",n:18,name:"18-pack",note:"For when a few friends come over."},
  {k:"24",n:24,name:"24-pack",note:"A full case."},
  {k:"30",n:30,name:"30-rack",note:"Tailgate size."},
  {k:"Keg",n:165,name:"Half-barrel keg",note:"About 165 twelve-ounce beers. Call ahead for what's available."}
];
const picker=$("sizePicker"),cans=$("cans");
function showSize(s){
  picker.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===s.k));
  $("sizeNum").textContent=s.k==="Keg"?"~165":s.n;
  $("sizeName").textContent=s.name;$("sizeNote").textContent=s.note;
  cans.className="cans"+(s.n>40?" small":"");
  cans.innerHTML=Array.from({length:s.n},(_,i)=>`<i style="animation-delay:${Math.min(i*(s.n>40?4:22),700)}ms"></i>`).join("");
}
SIZES.forEach(s=>{const b=document.createElement("button");b.type="button";b.textContent=s.k;b.dataset.k=s.k;b.onclick=()=>showSize(s);picker.appendChild(b);});
showSize(SIZES[2]);

/* ---------- Mix-A-Six ---------- */
const STYLES=[
  {n:"Light lager",c:"#f2df8a",d:0},{n:"IPA",c:"#e8a41c",d:0},{n:"Hazy IPA",c:"#f5c86a",d:0},
  {n:"Stout",c:"#2d1a10",d:1},{n:"Porter",c:"#5a3218",d:1},{n:"Sour",c:"#e0788f",d:0},
  {n:"Wheat",c:"#f1d79a",d:0},{n:"Amber",c:"#b8571e",d:1},{n:"Seltzer",c:"#9fd3d6",d:0},{n:"N/A",c:"#b9c98f",d:0}
];
const picks=[STYLES[1],STYLES[3],STYLES[5]];
const stylesEl=$("styles"),slots=$("slots");
STYLES.forEach(s=>{const b=document.createElement("button");b.type="button";b.innerHTML=`<i style="background:${s.c}"></i>${s.n}`;b.onclick=()=>{if(picks.length<6){picks.push(s);renderMix();}};stylesEl.appendChild(b);});
function renderMix(){
  slots.innerHTML="";
  for(let i=0;i<6;i++){
    const p=picks[i],d=document.createElement(p?"button":"div");
    d.className="slot"+(p?" full":"");
    if(p){
      d.type="button";d.setAttribute("aria-label",`Remove ${p.n}`);
      d.innerHTML=`<div class="top" style="background:radial-gradient(circle at 35% 30%,#ffffff55,transparent 50%),${p.c};color:${p.d?"#f7efdc":"#1e1912"}"><span>${p.n}</span></div>`;
      d.onclick=()=>{picks.splice(i,1);renderMix();};
    }
    slots.appendChild(d);
  }
  $("count").textContent=picks.length;
}
$("reset").onclick=()=>{picks.length=0;renderMix();};
renderMix();

/* ---------- copy buttons ---------- */
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",()=>{
  const v=b.dataset.copy;
  const done=()=>{b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1400);};
  try{navigator.clipboard.writeText(v).then(done).catch(()=>sel(b));}catch(e){sel(b);}
}));
function sel(b){const a=b.previousElementSibling,r=document.createRange();r.selectNodeContents(a);const s=getSelection();s.removeAllRanges();s.addRange(r);}
