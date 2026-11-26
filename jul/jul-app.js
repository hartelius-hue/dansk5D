(function juleApp(){
"use strict";
const D=window.JUL5D_CONTENT,season=window.JUL5D_SEASON,M=document.getElementById("j-main");
if(!D||!season||!M){document.body.insertAdjacentText("beforeend","Juleopgaverne kunne ikke indlæses. Prøv at genindlæse siden.");return;}
const STORE="dansk5d-juleportal-2026-v1";
const GAMES=[
{id:"ordjagt",name:"Ordjagt i sneen",icon:"🔤",subtitle:"Find de skjulte juleord i bogstavfeltet",goal:"Bogstavfølger, genkendelse og ordforråd"},
{id:"ordkaeder",name:"Ordkæder",icon:"🔗",subtitle:"Lad det sidste bogstav begynde næste ord",goal:"Bogstavkendskab og opmærksomhed på ord"},
{id:"saetninger",name:"Sætninger i sneen",icon:"📝",subtitle:"Saml sætninger, så de giver mening",goal:"Sætningsstruktur, ordstilling og tegn"},
{id:"synonymer",name:"Juleord med nye betydninger",icon:"✨",subtitle:"Vælg ord, der passer til sammenhængen",goal:"Synonymer, ordforråd og nuancer"},
{id:"julequiz",name:"Julemysteriets quiz",icon:"🧠",subtitle:"Læs mellem linjerne, og begrund dine svar",goal:"Læseforståelse, genre og fortolkning"}];
const T=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const sh=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
const normalize=s=>String(s??"").toLocaleLowerCase("da-DK").normalize("NFC").trim().replace(/\s+/g," ").replace(/[.!?]+$/,"");
const getState=()=>{try{let x=JSON.parse(localStorage.getItem(STORE)||"{}");return {rooms:x.rooms||{},games:x.games||{},drafts:x.drafts||{},checks:x.checks||{}}}catch(e){return {rooms:{},games:{},drafts:{},checks:{}}}};
let P=getState(),view={page:"home"},mission=null,game=null,toastTimer=null;
const room=id=>D.rooms.find(r=>r.id===id);
const roomSaved=id=>P.rooms[id]||(P.rooms[id]={done:[],stars:{}});
const gameSaved=id=>P.games[id]||(P.games[id]={done:[]});
const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(P))}catch(e){showToast("Kunne ikke gemme på denne enhed. Fortsæt gerne, men dine fremskridt kan gå tabt.")}};
function top(){window.scrollTo({top:0,left:0,behavior:"instant"});M.focus({preventScroll:true})}
function showToast(msg){let el=document.getElementById("j-toast");el.textContent=msg;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,3200)}
function active(){return season.isOpen(new Date())}
function closeSeason(){M.innerHTML=`<div class="j-expired"><h1>Julens mysterier er slut for i år 🎄</h1><p>Juleportalen lukkede den 29. december 2026. Du kan stadig træne dansk i det almindelige værksted.</p><a class="j-btn primary" href="../">Til Danskværkstedet 5.D</a></div>`;document.querySelector(".j-mette-float")?.setAttribute("hidden","");}
if(!active()){closeSeason();return;}
function countRoom(id){return roomSaved(id).done.length}
function allDone(){return D.rooms.filter(r=>countRoom(r.id)===5).length}
function gameFinished(id){return gameSaved(id).done.length}
function badgeCount(){return allDone()+GAMES.filter(g=>gameFinished(g.id)===3).length}
function imageArt(name){return `style="--art:url('assets/${name}.webp')"`}
function crumb(label,action="home",id=""){return `<button class="j-back" type="button" data-j="${action}" data-id="${T(id)}">← ${T(label)}</button>`}
function feature(filename,label){return `<div class="j-feature" ${imageArt(filename)} role="img" aria-label="${T(label)}"><span class="j-feature-label">${T(label)}</span></div>`}
function note(msg){return `<aside class="j-mette-note"><img src="../assets/mette-portraet.webp" alt="Mette, dansklæreren"><div><b>Mettes råd</b><p>${T(msg)}</p><button class="j-back" data-j="mette" type="button">Få flere strategier</button></div></aside>`}
function stats(){return `<div class="j-stat-row"><div class="j-stat"><strong>${allDone()}/4</strong><small>mysterier løst</small></div><div class="j-stat"><strong>${D.rooms.reduce((n,r)=>n+countRoom(r.id),0)}/20</strong><small>missioner klaret</small></div><div class="j-stat"><strong>${badgeCount()}</strong><small>julebadges</small></div><button class="j-btn" type="button" data-j="progress">Se min julestilling</button></div>`}
function home(){
 if(!active())return closeSeason();
 view={page:"home"};mission=null;game=null;
 const roomcards=D.rooms.map(r=>`<article class="j-card"><div class="j-card-art" ${imageArt("escape-"+r.id)}><span class="j-card-icon">${r.icon}</span></div><div class="j-card-body"><h3>${T(r.title)}</h3><p>${T(r.intro)}</p><div class="j-card-foot"><small>${countRoom(r.id)} / 5 missioner klaret</small><button class="j-btn red" data-j="room" data-id="${r.id}">${countRoom(r.id)===5?"Se mysteriet igen":"Gå på jagt"} →</button></div></div></article>`).join("");
 const gamecards=GAMES.map(g=>`<article class="j-card"><div class="j-card-art" ${imageArt("game-"+g.id)}><span class="j-card-icon">${g.icon}</span></div><div class="j-card-body"><h3>${T(g.name)}</h3><p>${T(g.subtitle)}</p><div class="j-card-foot"><small>${gameFinished(g.id)} / 3 niveauer</small><button class="j-btn dark" data-j="game" data-id="${g.id}">Spil →</button></div></div></article>`).join("");
 const workshopCards=[D.workshops.story,D.workshops.wish].map(w=>`<article class="j-card"><div class="j-card-art" ${imageArt("workshop-"+(w.id==="story"?"skriv":"onske"))}><span class="j-card-icon">${w.id==="story"?"📖":"💌"}</span></div><div class="j-card-body"><h3>${T(w.title)}</h3><p>${T(w.description)}</p><div class="j-card-foot"><small>3 trin · Din egen tekst</small><button class="j-btn red" data-j="workshop" data-id="${w.id}">Skriv her →</button></div></div></article>`).join("");
 M.innerHTML=`<section class="j-hero"><div class="j-hero-copy"><span class="j-kicker">❄ Dansk · 5.D · Julen 2026</span><h1>Julens danske <em>mysterier.</em></h1><p>Fire julefortællinger, hvor sproget er nøglen. Løs gåder, find ord, undersøg spor og skriv din egen julehistorie.</p><div class="j-actions"><button class="j-btn primary" data-j="room" data-id="bogen">🔑 Begynd et escape room</button><button class="j-btn ghost" data-j="progress">🏅 Mine julebadges</button></div></div></section>${stats()}
 <div class="j-arch-note">🎁 <b>Juleportalen er åben til og med 28. december 2026.</b> Den forsvinder automatisk fra danskportalen den 29. december kl. 00.00 dansk tid.</div>
 <div class="j-section"><h2>🔐 Fire jule-escape rooms</h2><p>Hver fortælling har fem missioner og tre forskellige danskfaglige udfordringer i hver mission. Nye missioner låses op, når du klarer den forrige.</p></div><div class="j-grid">${roomcards}</div>
 <div class="j-section"><h2>🎮 Fem danskfaglige julespil</h2><p>Spil ordjagt, byg ordkæder, sæt sætninger sammen og undersøg ord og tekster. Alle spillene har tre niveauer.</p></div><div class="j-grid j-grid-games">${gamecards}</div>
 <div class="j-section"><h2>✍️ Julens skriveværksteder</h2><p>Her er der plads til dine egne idéer. Du planlægger, skriver og forbedrer teksten med hjælp fra en faglig tjekliste.</p></div><div class="j-grid j-workshops">${workshopCards}</div>
 ${note("I et mysterium skal du finde tekstspor og forklare dine valg. Det vigtigste er ikke at gætte hurtigt, men at kunne begrunde dit svar.")}`;
 top();
}
function roomPage(id){
 if(!active())return closeSeason();
 const r=room(id);if(!r)return home();view={page:"room",id};mission=null;
 const done=roomSaved(id).done;const current=Math.min(done.length,4);
 const levels=r.scenes.map((s,i)=>`<button class="j-level ${done.includes(i)?"done":i===current?"current":""}" data-j="mission" data-id="${r.id}" data-n="${i}" ${i>done.length?"disabled":""}><strong>${done.includes(i)?"✓":i>done.length?"🔒":i+1}</strong><small>${T(s.title)}</small></button>`).join("");
 const ending=done.length===5?`<div class="j-room-end"><div class="j-medal">🏆</div><h2>Du har løst mysteriet!</h2><p>${T(r.finish)}</p><div class="j-letters">${Array.from(r.letter).map(ch=>`<span>${T(ch)}</span>`).join("")}</div><span class="j-badge">🏅 ${T(r.title)} · badge optjent</span></div>`:"";
 M.innerHTML=`${crumb("Alle juleopgaver") }<section class="j-panel">${feature("escape-"+r.id,r.tag)}<span class="j-kicker" style="color:#6b542b;background:#fff2ca">Jule-escape room · 5 niveauer</span><h1 class="j-title">${r.icon} ${T(r.title)}</h1><p class="j-lead">${T(r.intro)}</p><div class="j-goal"><b>Det træner du</b><p>${T(r.skills)}</p></div><div class="j-progress-track"><span style="width:${done.length*20}%"></span></div><h2>Vælg en mission</h2><p>Gennemfør missionerne i rækkefølge. De grønne missioner kan spilles igen.</p><div class="j-levels">${levels}</div>${ending}${note("Læs fortællingen, før du løser opgaverne. Husk at bruge de oplysninger, der står i teksten.")}<div class="j-foot-actions"><button class="j-btn primary" data-j="mission" data-id="${r.id}" data-n="${current}">${done.length===5?"Spil sidste mission igen":"Fortsæt mysteriet"} →</button><button class="j-btn" data-j="home">Se alle juleaktiviteter</button></div></section>`;
 top();
}
function startMission(id,n){
 const r=room(id);if(!r||!Number.isInteger(n)||n<0||n>4)return roomPage(id);
 const saved=roomSaved(id);if(n>saved.done.length)return showToast("Gennemfør først missionen før denne.");
 view={page:"mission",id,n};
 mission={id,n,q:0,tries:0,stars:0,skips:0,done:false,feedback:"",good:false,locked:false,choices:{},sortOrders:{},sortSelected:[],inputValue:"",wrong:new Set()};
 renderMission();top();
}
function taskFor(){return room(mission.id).scenes[mission.n].tasks[mission.q]}
function choiceList(task){const key=mission.q;if(!mission.choices[key])mission.choices[key]=sh(task.choices);return mission.choices[key]}
function sortList(task){const key=mission.q;if(!mission.sortOrders[key])mission.sortOrders[key]=sh(task.tokens.map((text,i)=>({text,i})));return mission.sortOrders[key]}
function taskControls(t){
 if(t.type==="choice")return `<div class="j-choices">${choiceList(t).map((text,i)=>`<button type="button" class="j-choice ${mission.wrong.has(i)?"bad":""}" data-j="choice" data-n="${i}" ${mission.locked||mission.wrong.has(i)?"disabled":""}><span class="j-key">${"ABC"[i]}</span>${T(text)}</button>`).join("")}</div>`;
 if(t.type==="input")return `<form id="j-answer-form"><label class="j-small" for="j-word">Skriv dit svar her. Brug ét ord eller et kort fagligt udtryk.</label><input id="j-word" class="j-input" autocomplete="off" spellcheck="false" maxlength="80" value="${T(mission.inputValue)}" ${mission.locked?"disabled":""} required><button type="submit" class="j-btn primary" ${mission.locked?"disabled":""} style="margin-top:12px">Prøv mit svar</button></form>`;
 if(t.type==="order"){const l=sortList(t);return `<p class="j-small">Tryk på sætningsdelene i den rækkefølge, du mener er rigtig. Du kan fortryde.</p><div class="j-assembled">${mission.sortSelected.length?mission.sortSelected.map(i=>`<span>${T(t.tokens[i])}</span>`).join(""):'<span style="opacity:.45">Din sætning kommer her …</span>'}</div><div class="j-sort-options">${l.map((x,j)=>`<button class="j-sort-item" data-j="sortpick" data-n="${j}" ${mission.sortSelected.includes(x.i)||mission.locked?"disabled":""}>${T(x.text)}</button>`).join("")}</div><div class="j-actions"><button class="j-btn" data-j="sortundo" ${mission.locked?"disabled":""}>↶ Fortryd</button><button class="j-btn dark" data-j="sortcheck" ${mission.locked||mission.sortSelected.length!==t.tokens.length?"disabled":""}>Tjek sætningen</button></div>`}
 return "";
}
function renderMission(){
 if(!mission)return;
 const r=room(mission.id),sc=r.scenes[mission.n],t=taskFor();if(!t)return missionEnd();
 const stages=r.scenes.map((x,i)=>`<span class="j-badge" style="background:${i===mission.n?"#fbe5be":"#f2f6f1"};font-size:12px">${i<mission.n?"✓":i===mission.n?i+1:"🔒"}</span>`).join(" ");
 M.innerHTML=`${crumb(r.title,"room",r.id)}<section class="j-panel">${feature(`escape-${r.id}-${mission.n+1}`,sc.title)}<div class="j-game-counter"><span class="j-kicker" style="color:#815b30;background:#fff2d6">Mission ${mission.n+1} af 5</span><span class="j-score">⭐ ${mission.stars} · Opgave ${mission.q+1} af 3</span></div><h1 class="j-title">${T(sc.title)}</h1><div class="j-story"><strong>Historien fortsætter</strong><p>${T(sc.story)}</p></div><div class="j-goal"><b>Det lærer du her</b><p>${T(sc.goal)}</p></div><div class="j-progress-track"><span style="width:${Math.round(mission.q/3*100)}%"></span></div><div class="j-task-num">Danskmission ${mission.q+1} af 3 · ${t.type==="choice"?"Vælg og forklar":t.type==="input"?"Sprogkode":"Byg sætningen"}</div><p class="j-question">${T(t.prompt)}</p>${taskControls(t)}
<div class="j-feedback ${mission.good?"success":"warning"}" id="j-feedback" ${mission.feedback?"":"hidden"}><strong>${mission.good?"Godt undersøgt!":"Tænk videre."}</strong><p>${T(mission.feedback)}</p></div>
<div class="j-foot-actions">${mission.locked?`<button class="j-btn primary" data-j="nextTask">Næste udfordring →</button>`:mission.tries>=3?`<button class="j-btn" data-j="skipTask">Spring over uden stjerne</button>`:""}<button class="j-btn" data-j="room" data-id="${r.id}">Til missionerne</button></div>
${note(sc.tip)}</section>`;
}
function correctTask(task){
 const first=mission.tries===0;
 if(first)mission.stars++;
 mission.locked=true;mission.good=true;mission.feedback=(first?"Det klarede du i første forsøg. ":"Godt, at du prøvede igen. ")+task.why;
 renderMission();
}
function incorrectTask(task){
 mission.tries++;
 mission.good=false;
 mission.feedback=mission.tries===1?`Et spor: ${task.hint}`:mission.tries===2?`Se endnu en gang på opgavens ord. ${task.hint} Forklar dit valg, før du prøver igen.`:`Du har prøvet flere gange. Du må fortsætte med at undersøge løsningen eller springe opgaven over uden stjerne.`;
 if(task.type==="order")mission.sortSelected=[];
 renderMission();
}
function submitChoice(i){
 if(!mission||mission.locked)return;
 const task=taskFor(),list=choiceList(task);if(task.type!=="choice"||!list[i]||mission.wrong.has(i))return;
 if(list[i]===task.answer)correctTask(task);else{mission.wrong.add(i);incorrectTask(task)}
}
function submitInput(){
 if(!mission||mission.locked)return;const task=taskFor();if(task.type!=="input")return;
 const value=document.getElementById("j-word")?.value||"";
 mission.inputValue=value;if(!value.trim())return showToast("Skriv først dit svar.");
 if(task.accept.some(x=>normalize(x)===normalize(value)))correctTask(task);else incorrectTask(task);
}
function pickSort(j){
 if(!mission||mission.locked)return;const task=taskFor();if(task.type!=="order")return;
 const chosen=sortList(task)[j];if(!chosen||mission.sortSelected.includes(chosen.i))return;
 mission.sortSelected.push(chosen.i);renderMission();
}
function checkSort(){
 if(!mission||mission.locked)return;const t=taskFor();if(t.type!=="order"||mission.sortSelected.length!==t.tokens.length)return;
 if(mission.sortSelected.every((x,i)=>x===i))correctTask(t);else incorrectTask(t);
}
function nextTask(){
 if(!mission||!mission.locked)return;
 mission.q++;mission.tries=0;mission.feedback="";mission.good=false;mission.locked=false;mission.wrong=new Set();mission.sortSelected=[];mission.inputValue="";
 if(mission.q>=3)missionEnd();else renderMission();
 top();
}
function skipTask(){
 if(!mission||mission.locked||mission.tries<3)return;mission.skips++;mission.locked=true;mission.good=false;mission.feedback="Denne opgave er sprunget over. Du får ingen stjerne, men du kan vende tilbage og træne den igen.";renderMission();
}
function missionEnd(){
 const r=room(mission.id),saved=roomSaved(r.id),sc=r.scenes[mission.n];const idx=mission.n,stars=mission.stars;
 if(!saved.done.includes(idx)){saved.done.push(idx);saved.done.sort((a,b)=>a-b)}
 saved.stars[idx]=Math.max(saved.stars[idx]||0,stars);
 save();
 const last=idx===4;
 view={page:"missionEnd",id:r.id,n:idx};
 M.innerHTML=`${crumb(r.title,"room",r.id)}<section class="j-panel"><div class="j-room-end"><div class="j-medal">${last?"🏆":"🔑"}</div><span class="j-kicker" style="color:#81632e;background:#fff1d2">Mission ${idx+1} gennemført</span><h1 class="j-title">${last?"Mysteriet er løst!":"Du fandt et nyt bogstav!"}</h1><p>${last?T(r.finish):`Du har gennemført ${T(sc.title)}. Der er nu endnu et spor, der hjælper dig videre gennem julehistorien.`}</p><div class="j-letters">${Array.from(r.letter).map((x,i)=>`<span class="${i>idx&&!last?"unknown":""}">${i<=idx?T(x):"?"}</span>`).join("")}</div><p><strong>${stars} ud af 3</strong> udfordringer løst i første forsøg. ${stars===3?"Du læste og tænkte grundigt.":"Du kan prøve missionen igen og arbejde videre med de svære steder."}</p>${last?`<span class="j-badge">🏅 ${T(r.title)}-badget er optjent</span>`:""}<div class="j-foot-actions" style="justify-content:center">${!last?`<button class="j-btn primary" data-j="mission" data-id="${r.id}" data-n="${idx+1}">Næste mission →</button>`:`<button class="j-btn primary" data-j="home">Se flere julemysterier</button>`}<button class="j-btn" data-j="room" data-id="${r.id}">Missionoversigt</button></div></div></section>`;top();
}
function gamePage(id){
 if(!active())return closeSeason();
 let g=GAMES.find(x=>x.id===id);if(!g)return home();
 view={page:"game",id};game=null;
 const levels=[0,1,2].map(n=>`<button type="button" data-j="gameStart" data-id="${id}" data-n="${n}" aria-pressed="false">${n+1}. ${["Kom i gang","Øv videre","Udfordring"][n]} ${gameSaved(id).done.includes(n)?"✓":""}</button>`).join("");
 M.innerHTML=`${crumb("Alle juleaktiviteter")}<section class="j-panel">${feature("game-"+id,g.name)}<span class="j-kicker" style="color:#896134;background:#fff2d6">Julespil · tre niveauer</span><h1 class="j-title">${g.icon} ${T(g.name)}</h1><p class="j-lead">${T(g.subtitle)}</p><div class="j-goal"><b>Det træner du</b><p>${T(g.goal)}</p></div><h2>Vælg niveau</h2><div class="j-game-levels">${levels}</div><p class="j-small">Spillet giver ledetråde og forklaringer. Det er ikke en prøve, og du kan prøve flere gange.</p>${note("Fortæl dig selv, hvorfor et ord eller et svar passer. Det hjælper dig med at huske strategien næste gang.")}</section>`;top();
}
function finishGame(){
 if(!game)return;const id=game.id,lvl=game.level;
 const saved=gameSaved(id);if(!saved.done.includes(lvl)){saved.done.push(lvl);saved.done.sort((a,b)=>a-b)}save();
 view={page:"gameEnd",id};
 M.innerHTML=`${crumb("Julespillene")}<section class="j-panel"><div class="j-room-end"><div class="j-medal">🎉</div><h1 class="j-title">Godt arbejdet med dansk!</h1><p>Du har gennemført ${T(GAMES.find(g=>g.id===id).name)} på niveau ${lvl+1}. Du kan vende tilbage og øve igen.</p><p><strong>${saved.done.length} af 3 niveauer</strong> er klaret i dette spil.</p>${saved.done.length===3?`<span class="j-badge">🏅 Julespilsbadge optjent!</span>`:""}<div class="j-foot-actions" style="justify-content:center"><button class="j-btn primary" data-j="game" data-id="${id}">Vælg et nyt niveau</button><button class="j-btn" data-j="home">Til juleportalen</button></div></div></section>`;top();
}
function randSeed(seed){let s=seed>>>0;return ()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}}
function buildWordGrid(words,n,seed){
 const rand=randSeed(seed);
 const chars=Array(n*n).fill("");
 const paths={};
 const directions=[[1,0],[0,1],[1,1],[-1,1]];
 for(const word of words.slice().sort((a,b)=>b.length-a.length)){
  let ok=false;
  for(let tries=0;tries<1600&&!ok;tries++){
   const [dx,dy]=directions[Math.floor(rand()*directions.length)];
   const x=Math.floor(rand()*n),y=Math.floor(rand()*n);
   const coords=[...word].map((c,k)=>({x:x+k*dx,y:y+k*dy,c}));
   if(coords.some(p=>p.x<0||p.y<0||p.x>=n||p.y>=n||chars[p.y*n+p.x]&&chars[p.y*n+p.x]!==p.c))continue;
   coords.forEach(p=>{chars[p.y*n+p.x]=p.c});paths[word]=coords.map(p=>p.y*n+p.x);ok=true;
  }
  if(!ok)throw new Error("Kunne ikke placere ordet "+word+" i ordjagten.");
 }
 const fillers=[..."AAEINRSTLØYGKÆUPODMVRH"];
 for(let k=0;k<chars.length;k++)if(!chars[k])chars[k]=fillers[Math.floor(rand()*fillers.length)];
 return {chars,paths,n};
}
function gameStart(id,level){
 if(!GAMES.find(g=>g.id===id)||![0,1,2].includes(level))return;
 game={id,level,q:0,score:0,tries:0,feedback:"",success:false,wrong:new Set(),sortChosen:[],sortOrder:null,choiceOrder:null,chain:[],found:[],startCell:null,wordGrid:null};
 if(id==="ordjagt"){
  const cfg=D.wordSearch[level];game.wordGrid=buildWordGrid(cfg.words,cfg.size,2026+level*13);
 }
 if(id==="ordkaeder")game.chain=[D.chains[level].start];
 view={page:"playing",id,level};renderGame();top();
}
function gameHead(g){
 return `${crumb(g.name,"game",g.id)}<section class="j-panel">${feature("game-"+g.id,g.name)}<span class="j-kicker" style="color:#85602f;background:#fff1cf">Niveau ${game.level+1} af 3</span><h1 class="j-title">${g.icon} ${T(g.name)}</h1><div class="j-goal"><b>Læringsmål</b><p>${T(g.goal)}</p></div>`;
}
function renderGame(){
 if(!game)return;const g=GAMES.find(x=>x.id===game.id);
 let html=gameHead(g);
 if(game.id==="ordjagt"){
  const cfg=D.wordSearch[game.level],grid=game.wordGrid;
  const occupied=new Set(game.found.flatMap(w=>grid.paths[w]));
  html+=`<p>Find juleordene i bogstavfeltet. Klik på det første og det sidste bogstav i et ord. Ordene står vandret, lodret eller skråt.</p><p class="j-small">${T(cfg.theme)} · ${game.found.length}/${cfg.words.length} ord fundet</p><div class="j-word-list">${cfg.words.map(w=>`<span class="${game.found.includes(w)?"found":""}">${T(w)}</span>`).join("")}</div><div class="j-word-grid" style="grid-template-columns:repeat(${grid.n},max-content)">${grid.chars.map((ch,k)=>`<button class="j-cell ${occupied.has(k)?"found":""} ${game.startCell===k?"start":""}" data-j="cell" data-n="${k}" aria-label="Række ${Math.floor(k/grid.n)+1}, kolonne ${k%grid.n+1}, bogstav ${T(ch)}">${T(ch)}</button>`).join("")}</div><button class="j-btn" data-j="wordReset">Nulstil markering</button>`;
 }else if(game.id==="ordkaeder"){
  const cfg=D.chains[game.level],prev=game.chain.at(-1),last=prev.slice(-1),used=new Set(game.chain);
  html+=`<p>Byg en ordkæde med juleord. Hvert nyt ord skal begynde med det sidste bogstav i ordet før. Du må kun bruge hvert ord én gang.</p><div class="j-chain">${game.chain.map(w=>`<span>${T(w)}</span>`).join("")}</div><p class="j-small">Næste ord skal begynde med <strong>${T(last)}</strong>. ${game.chain.length-1} af ${cfg.goal} forbindelser.</p><div class="j-chain-options">${sh(cfg.words).map(w=>`<button data-j="chain" data-word="${T(w)}" ${used.has(w)?"disabled":""}>${T(w)}</button>`).join("")}</div><div class="j-foot-actions"><button class="j-btn" data-j="chainUndo">↶ Fortryd sidste ord</button><button class="j-btn" data-j="chainReset">Begynd forfra</button></div>`;
 }else if(game.id==="saetninger"){
  const sent=D.sentenceGames[game.level][game.q];
  if(!game.sortOrder)game.sortOrder=sh(sent.map((s,i)=>({text:s,i})));
  html+=`<p class="j-question">Saml sætningen, så ordstillingen bliver tydelig. Læg mærke til store bogstaver og tegn.</p><p class="j-small">Sætning ${game.q+1} af 3</p><div class="j-assembled">${game.sortChosen.length?game.sortChosen.map(i=>`<span>${T(sent[i])}</span>`).join(""):'<span style="opacity:.5">Tryk på sætningsdelene …</span>'}</div><div class="j-sort-options">${game.sortOrder.map((x,i)=>`<button class="j-sort-item" data-j="gsort" data-n="${i}" ${game.sortChosen.includes(x.i)?"disabled":""}>${T(x.text)}</button>`).join("")}</div><div class="j-foot-actions"><button class="j-btn" data-j="gsortUndo">↶ Fortryd</button><button class="j-btn primary" data-j="gsortCheck" ${game.sortChosen.length!==sent.length?"disabled":""}>Tjek min sætning</button></div>`;
 }else{
  const arr=game.id==="synonymer"?D.synonyms[game.level]:D.quizzes[game.level],q=arr[game.q];
  if(!game.choiceOrder)game.choiceOrder=sh(q.choices);
  html+=`<p class="j-small">Spørgsmål ${game.q+1} af ${arr.length}</p><p class="j-question">${T(q.prompt)}</p><div class="j-choices">${game.choiceOrder.map((x,i)=>`<button class="j-choice ${game.wrong.has(i)?"bad":""}" data-j="gchoice" data-n="${i}" ${game.success||game.wrong.has(i)?"disabled":""}><span class="j-key">${"ABC"[i]}</span>${T(x)}</button>`).join("")}</div>`;
 }
 html+=`<div class="j-feedback ${game.success?"success":"warning"}" id="j-game-feedback" ${game.feedback?"":"hidden"}><strong>${game.success?"Godt klaret!":"Undersøg dit svar."}</strong><p>${T(game.feedback)}</p></div><div class="j-foot-actions">${game.success?`<button class="j-btn primary" data-j="gameNext">${game.id==="ordjagt"||game.id==="ordkaeder"?"Se evaluering":"Næste opgave"} →</button>`:""}<button class="j-btn" data-j="game" data-id="${g.id}">Vælg niveau</button></div>${note(g.goal+" – brug din opmærksomhed på ord, sammenhæng og forklaringer.")}</section>`;
 M.innerHTML=html;
}
function wordCell(k){
 if(!game||game.id!=="ordjagt")return;const grid=game.wordGrid;
 if(game.startCell===null){game.startCell=k;game.feedback="";renderGame();return;}
 const start=game.startCell;game.startCell=null;
 if(start===k){renderGame();return;}
 const s={x:start%grid.n,y:Math.floor(start/grid.n)},e={x:k%grid.n,y:Math.floor(k/grid.n)};
 const dx=Math.sign(e.x-s.x),dy=Math.sign(e.y-s.y);
 const len=Math.max(Math.abs(e.x-s.x),Math.abs(e.y-s.y));
 if(!(s.x===e.x||s.y===e.y||Math.abs(e.x-s.x)===Math.abs(e.y-s.y))){game.feedback="Vælg to bogstaver på én lige linje – vandret, lodret eller skråt.";renderGame();return;}
 const path=Array.from({length:len+1},(_,i)=>(s.y+i*dy)*grid.n+s.x+i*dx);
 const word=Object.keys(grid.paths).find(w=>!game.found.includes(w)&&
 (grid.paths[w].join(",")===path.join(",")||grid.paths[w].slice().reverse().join(",")===path.join(",")));
 if(word){game.found.push(word);game.feedback=`Du fandt ${word}. Godt set!`;if(game.found.length===D.wordSearch[game.level].words.length)game.success=true;}
 else game.feedback="Ordet ligger ikke helt på den valgte linje. Prøv igen, og se efter bogstavrækkefølgen.";
 renderGame();
}
function chainPick(word){
 if(!game||game.id!=="ordkaeder")return;
 const cfg=D.chains[game.level],prev=game.chain.at(-1),last=prev.slice(-1);
 if(!cfg.words.includes(word)||game.chain.includes(word))return;
 if(word[0]!==last){game.feedback=`Det næste ord skal begynde med ${last}. Læs den sidste bogstavlyd i ${prev}.`;renderGame();return;}
 game.chain.push(word);game.feedback="Kæden hænger sammen! Fortsæt med det sidste bogstav i dit nye ord.";
 if(game.chain.length-1>=cfg.goal){game.success=true;}
 renderGame();
}
function gameChoice(i){
 if(!game||!["synonymer","julequiz"].includes(game.id)||game.success)return;
 const arr=game.id==="synonymer"?D.synonyms[game.level]:D.quizzes[game.level],q=arr[game.q],value=game.choiceOrder?.[i];
 if(value===undefined||game.wrong.has(i))return;
 if(value===q.answer){game.success=true;game.score++;game.feedback="Det passer. "+q.why;}
 else{game.tries++;game.wrong.add(i);game.feedback=game.tries===1?"Et spor: "+q.hint:"Undersøg betydningen i sammenhængen. "+q.hint;}
 renderGame();
}
function gameSortPick(i){if(!game||game.id!=="saetninger")return;const chosen=game.sortOrder?.[i];if(!chosen||game.sortChosen.includes(chosen.i))return;game.sortChosen.push(chosen.i);renderGame();}
function gameSortCheck(){
 if(!game||game.id!=="saetninger")return;const arr=D.sentenceGames[game.level][game.q];
 if(game.sortChosen.length!==arr.length)return;
 if(game.sortChosen.every((x,i)=>x===i)){game.success=true;game.score++;game.feedback="Sætningen er samlet med tydelig ordstilling og passende tegn.";}
 else{game.tries++;game.feedback="Prøv igen. Find grundleddet og udsagnsleddet, og læg mærke til, hvor punktum eller replikken står.";game.sortChosen=[];}
 renderGame();
}
function gameNext(){
 if(!game||!game.success)return;
 if(["ordjagt","ordkaeder"].includes(game.id))return finishGame();
 const count=game.id==="saetninger"?D.sentenceGames[game.level].length:(game.id==="synonymer"?D.synonyms[game.level]:D.quizzes[game.level]).length;
 game.q++;if(game.q>=count)return finishGame();
 game.tries=0;game.success=false;game.feedback="";game.wrong=new Set();game.sortOrder=null;game.sortChosen=[];game.choiceOrder=null;renderGame();top();
}
function progress(){
 if(!active())return closeSeason();
 view={page:"progress"};mission=null;game=null;
 const r=D.rooms.map(x=>`<div class="j-card-body" style="border:1px solid #dfe9dc;border-radius:13px;margin:9px 0;background:#f8fffa"><b>${x.icon} ${T(x.title)}</b><p>${countRoom(x.id)} af 5 missioner. ${countRoom(x.id)===5?"🏅 Badge optjent!":"Fortsæt fortællingen."}</p><button class="j-btn" data-j="room" data-id="${x.id}">Åbn</button></div>`).join("");
 const g=GAMES.map(x=>`<div class="j-card-body" style="border:1px solid #dfe9dc;border-radius:13px;margin:9px 0;background:#f8fffa"><b>${x.icon} ${T(x.name)}</b><p>${gameFinished(x.id)} af 3 niveauer. ${gameFinished(x.id)===3?"🏅 Badge optjent!":"Der er mere at prøve."}</p><button class="j-btn" data-j="game" data-id="${x.id}">Åbn</button></div>`).join("");
 M.innerHTML=`${crumb("Juleforsiden")}<section class="j-panel"><h1 class="j-title">🏅 Min jul i dansk</h1><p class="j-lead">Her kan du se, hvor langt du er nået. Fremskridtene gemmes kun på denne enhed, så forskellige elever bør ikke dele samme browserprofil.</p>${stats()}<h2>Escape rooms</h2>${r}<h2>Julespil</h2>${g}<p class="j-small">Badges viser gennemførelse, ikke en karakter. Brug dem til at planlægge din træning.</p></section>`;top();
}
function workshop(id,step=0){
 if(!active())return closeSeason();
 const w=D.workshops[id];if(!w)return home();
 view={page:"workshop",id,step};mission=null;game=null;
 const draft=P.drafts[id]||(P.drafts[id]={});const state=w.steps[step];
 const tabs=w.steps.map((x,i)=>`<button class="${step===i?"selected":""}" data-j="workshopStep" data-id="${id}" data-n="${i}">${T(x.title)}</button>`).join("");
 const fields=state.fields.map(([label,placeholder],i)=>{const key=step+"-"+i;return `<div class="j-field"><label for="work-${i}">${T(label)}</label><textarea id="work-${i}" class="j-textarea" data-work="${id}" data-field="${key}" placeholder="${T(placeholder)}">${T(draft[key]||"")}</textarea></div>`}).join("");
 M.innerHTML=`${crumb("Alle juleaktiviteter")}<section class="j-panel">${feature("workshop-"+(id==="story"?"skriv":"onske"),w.title)}<span class="j-kicker" style="color:#7b5736;background:#fff0d3">Danskfagligt skriveværksted</span><h1 class="j-title">${id==="story"?"📖":"💌"} ${T(w.title)}</h1><p class="j-lead">${T(w.description)}</p><div class="j-goal"><b>Derfor arbejder du med det</b><p>Du planlægger, fremstiller og reviderer en tekst til en bestemt modtager. Det er en skriveproces, ikke en automatisk staveprøve.</p></div><div class="j-step-tabs">${tabs}</div><h2>${T(state.title)}</h2><p>${T(state.prompt)}</p>${fields}<p class="j-small" id="j-words">Din tekst gemmes kun på denne enhed. Brug »Hent min tekst«, hvis du vil tage den med videre.</p>
${step===2?`<h3>Tjek dit eget arbejde</h3><div class="j-checks">${w.check.map((x,i)=>`<label><input type="checkbox" class="j-selfcheck" data-check="${id}" data-n="${i}" ${P.checks[id]?.includes(i)?"checked":""}><span>${T(x)}</span></label>`).join("")}</div><button class="j-btn primary" data-j="finishWorkshop" data-id="${id}">Jeg har læst og forbedret min tekst</button><p class="j-small">Portalen kan ikke bedømme kvaliteten af en fri tekst automatisk. Vis gerne teksten til Mette eller en makker.</p>`:""}
<div class="j-foot-actions">${step<2?`<button class="j-btn primary" data-j="workshopStep" data-id="${id}" data-n="${step+1}">Næste trin →</button>`:""}<button class="j-btn dark" data-j="download" data-id="${id}">↓ Hent min tekst</button><button class="j-btn" data-j="print" data-id="${id}">Udskriv</button></div>${note(w.tip)}</section>`;top();
}
function draftText(id){
 const w=D.workshops[id],draft=P.drafts[id]||{};
 let lines=[w.title,"Danskværkstedet 5.D · Jul 2026",""];
 for(let i=0;i<w.steps.length;i++){
  lines.push(w.steps[i].title);
  w.steps[i].fields.forEach(([label],j)=>{lines.push(label+":");lines.push(draft[i+"-"+j]||"");lines.push("")});
 }
 return lines.join("\n");
}
function downloadDraft(id){
 if(!D.workshops[id])return;const text=draftText(id);const blob=new Blob([text],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=id==="story"?"min-julehistorie.txt":"min-onskeseddel.txt";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function finishWorkshop(id){
 const w=D.workshops[id];if(!w)return;const c=P.checks[id]||[];
 if(c.length!==w.check.length){showToast("Gennemgå alle punkter i tjeklisten, før du afslutter.");return;}
 const draft=P.drafts[id]||{},text=Object.values(draft).join(" ").trim();
 const words=text.split(/\s+/).filter(Boolean).length;
 if(words<(id==="story"?80:25)){showToast(id==="story"?"Skriv lidt mere af din julefortælling, før du afslutter.":"Skriv først dine ønsker og begrundelser.");return;}
 M.innerHTML=`${crumb("Juleforsiden")}<section class="j-panel"><div class="j-room-end"><div class="j-medal">✍️</div><h1 class="j-title">Godt skrevet!</h1><p>Du har arbejdet med din tekst i tre trin og brugt tjeklisten. Næste skridt er at læse den for en makker eller få konkret feedback fra Mette.</p><p>Husk at hente din tekst, hvis du vil arbejde videre med den på en anden enhed.</p><button class="j-btn primary" data-j="download" data-id="${id}">Hent min tekst</button><button class="j-btn" data-j="home">Til forsiden</button></div></section>`;top();
}
function mette(){
 const dialog=document.getElementById("j-mette-dialog"),target=document.getElementById("j-mette-content");
 let advice="Læs grundigt. Find de ord i teksten, der støtter dit svar. Prøv at forklare hvorfor, ikke kun hvilket svar du vælger.";
 if(view.page==="mission")advice=room(view.id)?.scenes?.[view.n]?.tip||advice;
 if(view.page==="workshop")advice=D.workshops[view.id]?.tip||advice;
 if(view.page==="playing")advice=GAMES.find(g=>g.id===view.id)?.goal||advice;
 target.innerHTML=`<img src="../assets/mette-portraet.webp" alt="Mettes originale portrætfoto" style="width:92px;height:99px;object-fit:cover;object-position:top;border-radius:50%;float:left;margin:0 16px 10px 0"><h3>Et råd fra Mette</h3><p>${T(advice)}</p><p><b>Tre spørgsmål, du kan bruge:</b> Hvad ved jeg? Hvilket spor hjælper mig? Hvordan kan jeg tjekke mit svar?</p><p>At opdage en fejl og rette den er også en del af at lære dansk.</p>`;
 dialog.showModal();
}
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-j]");if(!b)return;
 const a=b.dataset.j,id=b.dataset.id,n=Number(b.dataset.n),word=b.dataset.word;
 if(!active())return closeSeason();
 switch(a){
 case"home":home();break;case"room":roomPage(id);break;case"mission":startMission(id,n);break;case"choice":submitChoice(n);break;case"nextTask":nextTask();break;case"skipTask":skipTask();break;
 case"sortpick":pickSort(n);break;case"sortundo":if(mission&&!mission.locked){mission.sortSelected.pop();renderMission()}break;case"sortcheck":checkSort();break;
 case"game":gamePage(id);break;case"gameStart":gameStart(id,n);break;case"cell":wordCell(n);break;case"wordReset":if(game){game.startCell=null;renderGame()}break;
 case"chain":chainPick(word);break;case"chainUndo":if(game&&game.chain.length>1){game.chain.pop();game.success=false;renderGame()}break;case"chainReset":if(game){game.chain=[D.chains[game.level].start];game.success=false;game.feedback="";renderGame()}break;
 case"gsort":gameSortPick(n);break;case"gsortUndo":if(game){game.sortChosen.pop();renderGame()}break;case"gsortCheck":gameSortCheck();break;case"gchoice":gameChoice(n);break;case"gameNext":gameNext();break;
 case"workshop":workshop(id);break;case"workshopStep":workshop(id,n);break;case"finishWorkshop":finishWorkshop(id);break;
 case"download":downloadDraft(id);break;case"print":window.print();break;case"progress":progress();break;
 case"mette":mette();break;case"mette-close":document.getElementById("j-mette-dialog").close();break;
 }
});
document.addEventListener("submit",e=>{if(e.target.id==="j-answer-form"){e.preventDefault();submitInput()}});
document.addEventListener("input",e=>{const el=e.target;if(el.dataset.work){const w=el.dataset.work;P.drafts[w]||(P.drafts[w]={});P.drafts[w][el.dataset.field]=el.value;save()}});
document.addEventListener("change",e=>{const el=e.target;if(!el.dataset.check)return;const id=el.dataset.check,n=Number(el.dataset.n);let a=P.checks[id]||[];if(el.checked){if(!a.includes(n))a.push(n)}else a=a.filter(x=>x!==n);P.checks[id]=a;save()});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&!active())closeSeason()});
setInterval(()=>{if(!active())closeSeason()},60000);
home();
})();
