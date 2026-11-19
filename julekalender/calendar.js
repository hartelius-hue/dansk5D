'use strict';
/* 5.D – julekalenderen 2026. Alle tidsgrænser gælder Danmark (CET i december). */
(() => {
const YEAR=2026, OPEN_HOUR=7, MAX_DAYS=24, KEY='julekalender-dansk-5d-2026-v1';
const doors=document.getElementById('doors'),dialog=document.getElementById('door-dialog'),dialogContent=document.getElementById('dialog-content');
const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const openMoment=d=>new Date(`${YEAR}-12-${String(d).padStart(2,'0')}T${String(OPEN_HOUR).padStart(2,'0')}:00:00+01:00`).getTime();
const unlocked=d=>Date.now()>=openMoment(d);
const openCount=()=>DAYS.filter(day=>unlocked(day.day)).length;
const emptyState=()=>({taskDone:{},letters:{},opened:{},winner:false});
function readState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return {taskDone:x.taskDone||{},letters:x.letters||{},opened:x.opened||{},winner:Boolean(x.winner)}}catch{return emptyState()}}
let state=readState(),currentDay=null,phase='story',orderChosen=[],matched=[],selectedLeft=null,sortAnswers={};
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{showToast('Denne browser kan ikke gemme fremskridt.')}}
let toastTimeout;
function showToast(s){const el=$('toast');el.textContent=s;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,4500)}
function updateCountdown(){
 const remaining=openMoment(1)-Date.now(),box=$('countdown');
 if(remaining>0){box.classList.remove('started');$('countdown-caption').textContent='Første låge åbner 1. december kl. 07.00';const s=Math.max(0,Math.ceil(remaining/1000));let values=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];['days','hours','minutes','seconds'].forEach((id,i)=>$(id).textContent=i?String(values[i]).padStart(2,'0'):String(values[i]));}
 else{box.classList.add('started');const day=openCount();$('countdown-caption').textContent=day<24?`Nu kan I åbne låge ${Math.max(1,day)}. God december, 5.D!`:'Alle låger er nu åbne. Glædelig jul, 5.D!';}
}
function renderDoors(){const count=openCount();doors.innerHTML=DAYS.map(d=>{
 const locked=!unlocked(d.day),done=Boolean(state.letters[d.day]),today=d.day===count;
 const name=locked?`Låge ${d.day} åbner den ${d.day}. december klokken 07.00`:done?`Låge ${d.day} er gennemført. Åbn igen`:`Åbn låge ${d.day} med dagens danske julemission`;
 return `<button type="button" class="door ${locked?'locked':done?'completed':today?'today':'ready'}" data-day="${d.day}" aria-label="${name}" aria-disabled="${locked}"><span class="door-glow"></span><span class="door-num">${d.day}</span><span class="door-lock" aria-hidden="true">${locked?'✦':done?'':'✧'}</span><span class="door-knob" aria-hidden="true"></span></button>`;
}).join('');const solved=Object.keys(state.letters).length,done=Object.keys(state.taskDone).length;
$('progress-foot').textContent=`⭐ ${done} af 24 danskmissioner løst · 🔎 ${solved} af 24 bogstaver fundet · Tidligere låger kan åbnes igen.`;
}
function renderLetters(){const words=SECRET_PHRASE.split(' ');let index=0;const html=[];
 words.forEach((word,wi)=>{for(const _ch of word){index++;const l=state.letters[index]||'·';html.push(`<span class="letter" aria-label="Bogstav ${index}: ${l==='·'?'endnu ukendt':l}">${escapeHtml(l)}</span>`)}if(wi<words.length-1)html.push('<span class="word-space" aria-hidden="true"></span>')});$('letters').innerHTML=html.join('');
}
function showDay(day){
 if(!unlocked(day)){showToast(`Låge ${day} åbner først den ${day}. december kl. 07.00 dansk tid.`);return;}
 const button=doors.querySelector(`[data-day="${day}"]`);button?.classList.add('opening');
 const open=()=>{currentDay=day;state.opened[day]=true;save();phase=state.letters[day]?'complete':state.taskDone[day]?'riddle':'story';renderDialog();dialog.showModal();};
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)open();else setTimeout(open,380);
}
function renderDialog(){const day=DAYS[currentDay-1];$('dialog-date').textContent=`${day.day}. DECEMBER · 5.D`;$('dialog-title').textContent=day.title;$('illustration-icon').textContent=day.icon;
 $('illustration').style.backgroundPosition=`${20+((day.day*13)%60)}% ${15+((day.day*9)%50)}%`;
 renderPhase();
}
function renderPhase(){const day=DAYS[currentDay-1];$('dialog-kicker').textContent=phase==='story'?'Kapitel '+day.day+' af 24':phase==='task'?`Danskmission ${day.day} · ${day.task.skill}`:phase==='riddle'?'Dagens gåde':phase==='complete'?'Dagens spor fundet':'Flot klaret';
 if(phase==='story'){dialogContent.innerHTML=`<p class="chapter">${escapeHtml(day.story)}</p><div class="dialog-actions"><button class="button secondary" data-action="read-story">🔊 Hør kapitlet</button><button class="button gold" data-action="show-task">Videre til dagens danskopgave →</button></div>`;return;}
 if(phase==='task'){renderTask(day.task);return;}
 if(phase==='riddle'){renderRiddle();return;}
 if(phase==='task-done'){dialogContent.innerHTML=`<div class="celebration"><strong>🎉 Danskmissionen er løst!</strong><p>${escapeHtml(day.task.why)}</p></div><p>Nu mangler kun dagens gåde. Svaret gemmer ét af bogstaverne i den hemmelige sætning.</p><div class="dialog-actions"><button class="button gold" data-action="show-riddle">Løs dagens gåde →</button></div>`;return;}
 if(phase==='complete'){dialogContent.innerHTML=`<div class="celebration"><h3>🌟 I klarede låge ${day.day}!</h3><p>Danskopgaven og dagens gåde er gennemført. Bogstavet <strong>${escapeHtml(state.letters[day.day])}</strong> er gemt.</p></div><div class="dialog-actions"><button class="button secondary" data-action="show-story">Læs kapitlet igen</button><button class="button dark" data-action="close">Tilbage til julehuset</button></div>`;}
}
function feedback(message,warn=false){let x=$('task-feedback');if(x){x.hidden=false;x.className='feedback'+(warn?' warn':'');x.textContent=message}}
function renderTask(t){orderChosen=[];matched=[];selectedLeft=null;sortAnswers={};let content='';
 if(t.type==='choice')content=`<div class="choice-list">${t.options.map((opt,i)=>`<button type="button" class="choice-button" data-action="choice" data-index="${i}">${String.fromCharCode(65+i)} · ${escapeHtml(opt)}</button>`).join('')}</div>`;
 else if(t.type==='type')content=`<form id="type-form"><label class="task-meta" for="type-answer">Skriv dit svar</label><div><input class="type-input" id="type-answer" maxlength="70" autocomplete="off" spellcheck="false" required></div><button class="button gold" style="margin-top:12px" type="submit">Tjek mit svar</button></form>`;
 else if(t.type==='order'){const shuffled=t.parts.map((v,i)=>({i,v})).reverse();content=`<p class="pair-instruction">Tryk på kortene i den rækkefølge, du mener er rigtig. Du kan fortryde og prøve igen.</p><div id="order-chosen" class="order-chosen" aria-label="Din rækkefølge"></div><div class="order-bank" id="order-bank">${shuffled.map(({i,v})=>`<button type="button" class="tile-button" data-action="order-add" data-index="${i}">${escapeHtml(v)}</button>`).join('')}</div><div class="dialog-actions"><button class="button secondary" data-action="order-reset">Start forfra</button><button class="button gold" data-action="order-check">Tjek rækkefølgen</button></div>`;}
 else if(t.type==='match'){const right=t.pairs.map((p,i)=>({index:i,value:p[1]})).reverse();content=`<p class="pair-instruction">Vælg først et kort til venstre, og find derefter den rigtige makker til højre.</p><div class="pair-columns"><div class="pair-col" id="match-left">${t.pairs.map((pair,i)=>`<button type="button" class="pair-button" data-action="match-left" data-index="${i}">${escapeHtml(pair[0])}</button>`).join('')}</div><div class="pair-col" id="match-right">${right.map(({index,value})=>`<button type="button" class="pair-button" data-action="match-right" data-index="${index}">${escapeHtml(value)}</button>`).join('')}</div></div><p class="pair-instruction" id="matched-total">0 af ${t.pairs.length} par fundet</p>`;}
 else if(t.type==='sort')content=`<div id="sort-items">${t.items.map(([word],i)=>`<div class="sort-row"><strong>${escapeHtml(word)}</strong><div class="sort-options">${t.groups.map((g,j)=>`<button type="button" class="sort-choice" data-action="sort" data-word="${i}" data-group="${j}" aria-pressed="false">${escapeHtml(g)}</button>`).join('')}</div></div>`).join('')}</div><div class="dialog-actions"><button class="button gold" data-action="sort-check">Tjek mine svar</button></div>`;

 else if(t.type==='write'){
  const checks=t.criteria.map((criterion,i)=>`<label class="writing-check"><input type="checkbox" class="write-check" value="${i}"><span>${escapeHtml(criterion)}</span></label>`).join('');
  content=`<form id="write-form"><label class="task-meta" for="write-answer">Din tekst</label><textarea id="write-answer" class="write-answer" maxlength="900" rows="6" spellcheck="true" aria-describedby="write-count">${escapeHtml(t.starter||'')}</textarea><div class="write-count" id="write-count" role="status" aria-live="polite"></div><fieldset class="write-review"><legend>Læs din tekst igennem, og tjek de tre punkter</legend>${checks}</fieldset><p class="write-note">Du vurderer selv, om din tekst opfylder kravene. Kalenderen bedømmer ikke fri tekst automatisk, og din tekst sendes ikke til en server.</p><button class="button gold" type="submit">Jeg har læst og tjekket min tekst →</button></form>`;
 }
 dialogContent.innerHTML=`<p class="pair-instruction">⏱ ${t.type==='write'?'3–4':'2–3'} minutter · ${escapeHtml(t.skill)}</p><div class="task-box"><span class="task-meta">DIN DANSKMISSION</span><p class="task-question">${escapeHtml(t.question)}</p>${content}<div class="feedback" id="task-feedback" hidden></div></div><div class="dialog-actions"><button class="button secondary" data-action="show-story">← Læs historien igen</button><button class="button secondary" data-action="hint">💡 Få et spor</button></div>`;
 if(t.type==='write')updateWriteCount();
}
function taskDone(){state.taskDone[currentDay]=true;save();renderDoors();phase='task-done';renderPhase();}

function countWriteWords(value){
 return (String(value||'').trim().split(/\s+/u).filter(part=>/\p{L}/u.test(part))).length;
}
function updateWriteCount(){
 const t=DAYS[currentDay-1]?.task;
 if(!t||t.type!=='write')return;
 const el=$('write-count');
 if(!el)return;
 const count=countWriteWords($('write-answer')?.value||'');
 el.textContent=`${count} ord skrevet · mindst ${t.minWords} ord`;
 el.classList.toggle('ready',count>=t.minWords);
}
function handleWrite(){
 const t=DAYS[currentDay-1].task;
 const count=countWriteWords($('write-answer')?.value||'');
 if(count<t.minWords){
  feedback(`Skriv lidt mere, så du får mindst ${t.minWords} ord. Du har skrevet ${count}.`,true);
  $('write-answer')?.focus();
  return;
 }
 const checks=[...dialogContent.querySelectorAll('.write-check')];
 if(!checks.length||checks.some(box=>!box.checked)){
  feedback('Læs din tekst igen. Sæt flueben ved hvert punkt, når du har undersøgt, om du har opfyldt det.',true);
  return;
 }
 taskDone();
}

function handleChoice(index){const t=DAYS[currentDay-1].task;if(index===t.answer){taskDone()}else{feedback('Prøv igen. Et spor: '+t.hint,true);dialogContent.querySelector(`[data-action="choice"][data-index="${index}"]`)?.classList.add('wrong')}}
function handleType(){const t=DAYS[currentDay-1].task;const val=$('type-answer')?.value||'';const norm=x=>x.trim().toLocaleLowerCase('da-DK').replace(/[.!?]+$/,'').replace(/\s+/g,' ');if(t.answers.some(a=>norm(a)===norm(val)))taskDone();else feedback('Ikke helt. '+t.hint,true)}
function handleOrder(action,index){const t=DAYS[currentDay-1].task;if(action==='order-reset'){orderChosen=[];renderTask(t);return}if(action==='order-add'){if(orderChosen.includes(index))return;orderChosen.push(index);const button=dialogContent.querySelector(`[data-action="order-add"][data-index="${index}"]`);if(button){button.disabled=true;button.style.opacity='.4'}$('order-chosen').innerHTML=orderChosen.map((v,i)=>`<button class="tile-button selected" data-action="order-remove" data-index="${i}" type="button">${escapeHtml(t.parts[v])} ✕</button>`).join('');return}if(action==='order-remove'){orderChosen.splice(index,1);const old=orderChosen.slice();renderTask(t);old.forEach(v=>handleOrder('order-add',v));return}if(action==='order-check'){if(orderChosen.length!==t.parts.length){feedback('Vælg alle delene, før du tjekker rækkefølgen.',true);return}if(orderChosen.every((x,i)=>x===i))taskDone();else feedback('Rækkefølgen er ikke helt rigtig. '+t.hint+' Tryk på kortene i den øverste række for at flytte dem tilbage.',true)}}
function handleMatch(side,index){const t=DAYS[currentDay-1].task;if(matched.includes(index))return;
 if(side==='left'){selectedLeft=index;dialogContent.querySelectorAll('[data-action="match-left"]').forEach(el=>el.classList.toggle('selected',Number(el.dataset.index)===index));return;}
 if(selectedLeft===null){feedback('Vælg først et kort i venstre kolonne.',true);return;}
 if(selectedLeft===index){matched.push(index);dialogContent.querySelectorAll(`[data-index="${index}"][data-action^="match-"]`).forEach(el=>{el.classList.add('matched');el.disabled=true});selectedLeft=null;dialogContent.querySelectorAll('[data-action="match-left"]').forEach(el=>el.classList.remove('selected'));$('matched-total').textContent=`${matched.length} af ${t.pairs.length} par fundet`;feedback('Det par passer sammen.');if(matched.length===t.pairs.length)setTimeout(taskDone,350)}else feedback('De to kort passer ikke sammen. '+t.hint,true);
}
function handleSort(word,group){const t=DAYS[currentDay-1].task;sortAnswers[word]=t.groups[group];dialogContent.querySelectorAll(`[data-action="sort"][data-word="${word}"]`).forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.group)===group)))}
function checkSort(){const t=DAYS[currentDay-1].task;if(Object.keys(sortAnswers).length<t.items.length){feedback('Vælg en kategori for hvert ord, før du tjekker svarene.',true);return}const wrong=t.items.filter(([word,answer],i)=>sortAnswers[i]!==answer);if(!wrong.length)taskDone();else feedback(`Prøv igen med ${wrong.length} ${wrong.length===1?'ord':'ord'}. ${t.hint}`,true)}
function renderRiddle(){const r=DAYS[currentDay-1].riddle;dialogContent.innerHTML=`<p>Et rigtigt svar giver et bogstav til jeres hemmelige sætning. Bogstavet kommer fra begyndelsen af svarordet.</p><div class="task-box"><span class="task-meta">DAGENS GÅDE</span><p class="task-question">${escapeHtml(r.question)}</p><div class="choice-list">${r.options.map((opt,i)=>`<button type="button" class="choice-button" data-action="riddle-answer" data-index="${i}">${escapeHtml(opt)}</button>`).join('')}</div><div id="task-feedback" class="feedback" hidden></div></div><div class="dialog-actions"><button type="button" class="button secondary" data-action="show-story">Læs dagens kapitel igen</button></div>`}
function riddleAnswer(index){const r=DAYS[currentDay-1].riddle;if(index===r.answer){state.letters[currentDay]=r.letter;save();renderLetters();renderDoors();dialogContent.innerHTML=`<div class="celebration"><strong>⭐ Godt løst!</strong><p>Svaret var <strong>${escapeHtml(r.options[index])}</strong>, og dagens bogstav er:</p><div class="letter-award">${escapeHtml(r.letter)}</div><p>Det er gemt sammen med de øvrige julebogstaver.</p></div><div class="dialog-actions"><button class="button dark" data-action="close">Tilbage til julekalenderen</button></div>`;phase='complete';$('dialog-kicker').textContent='Jeres bogstav er fundet';}else feedback('Ikke helt. Læs gåden én gang til, og prøv et andet svar.',true)}
function normalizePhrase(s){return s.toLocaleUpperCase('da-DK').normalize('NFC').replace(/[^A-ZÆØÅ]/g,'')}
function guess(s){const output=$('guess-feedback');if(openCount()<24){output.textContent='Den endelige julehemmelighed kan først afsløres 24. december kl. 07.00.';return}if(Object.keys(state.letters).length<24){output.textContent=`I mangler ${24-Object.keys(state.letters).length} bogstaver. Åbn også de låger, I ikke har løst endnu.`;return}if(normalizePhrase(s)!==normalizePhrase(SECRET_PHRASE)){output.textContent='Det er ikke helt den rigtige sætning. Se på bogstaverne og mellemrummene igen.';return}state.winner=true;save();output.textContent='I gættede rigtigt! Glædelig jul til hele 5.D!';showReward()}
function showReward(){currentDay=24;phase='reward';$('dialog-date').textContent='JULEHILSEN TIL 5.D';$('dialog-title').textContent='I reddede Mette og julen!';$('dialog-kicker').textContent='Den hemmelige besked er løst';$('illustration-icon').textContent='🎅';dialogContent.innerHTML=`<p>Fordi I har hjulpet hinanden, læst, skrevet og tænkt jer om i hele december, er Mette fri, og julens magi er tilbage.</p><img class="reward" src="assets/glaedelig-jul-5d.webp" alt="Julemanden og Rudolf med den røde tud ønsker Glædelig jul til 5.D"><div class="dialog-actions"><button type="button" class="button secondary" data-action="read-greeting">🔊 Hør julehilsenen</button><button class="button dark" type="button" data-action="close">Luk julehilsenen</button></div>`;if(!dialog.open)dialog.showModal()}
function say(s){if(!('speechSynthesis' in window)){showToast('Oplæsning understøttes ikke af denne browser.');return}window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(s);utterance.lang='da-DK';utterance.rate=.91;utterance.pitch=1;window.speechSynthesis.speak(utterance)}
function showHow(){currentDay=1;phase='how';$('dialog-date').textContent='SÅDAN GØR I';$('dialog-title').textContent='24 julemissioner på cirka fem minutter';$('dialog-kicker').textContent='Læs · tænk · løs · gæt';$('illustration-icon').textContent='📚';dialogContent.innerHTML=`<ol class="how-list"><li><strong>Åbn dagens låge</strong> fra kl. 07.00 dansk tid. Tidligere låger kan altid åbnes igen.</li><li><strong>Læs dagens kapitel</strong> i julehistorien. Alle børn fra 5.D dukker op flere gange.</li><li><strong>Løs en kort danskopgave.</strong> I træner bl.a. stavning, ordklasser, læsning, tekstforståelse og tegnsætning. I får et spor, hvis noget driller.</li><li><strong>Løs dagens gåde</strong> og gem et bogstav.</li><li><strong>Gæt den hemmelige sætning</strong> efter den sidste låge den 24. december. Så får I en særlig julehilsen.</li></ol><p><small>Julekalenderen bruger den lokale tid på enheden til åbning. Fremskridt ligger kun i browseren og er fælles på delte enheder.</small></p><div class="dialog-actions"><button class="button dark" data-action="close">Forstået!</button></div>`;if(!dialog.open)dialog.showModal();}
function close(){if(dialog.open)dialog.close();currentDay=null;window.speechSynthesis?.cancel?.();}
const music=(()=>{
 let context=null,source=null,bufferPromise=null,playing=false;
 const Audio=window.AudioContext||window.webkitAudioContext;
 const Offline=window.OfflineAudioContext||window.webkitOfflineAudioContext;
 const beat=60/112,melody=[
  [76,1],[76,1],[76,2],[76,1],[76,1],[76,2],[76,1],[79,1],[72,1],[74,1],[76,4],
  [77,1],[77,1],[77,1],[77,1],[77,1],[76,1],[76,1],[76,1],[76,1],[74,1],[74,1],[76,1],[74,2],[79,2],
  [76,1],[76,1],[76,2],[76,1],[76,1],[76,2],[76,1],[79,1],[72,1],[74,1],[76,4],
  [77,1],[77,1],[77,1],[77,1],[77,1],[76,1],[76,1],[76,1],[79,1],[79,1],[77,1],[74,1],[72,4]
 ];
 const f=n=>440*Math.pow(2,(n-69)/12);
 async function build(){const totalBeats=melody.reduce((s,n)=>s+n[1],0);const rate=24000,duration=(totalBeats+1)*beat,off=new Offline(2,Math.ceil(rate*duration),rate);const master=off.createGain();master.gain.value=.55;master.connect(off.destination);const delay=off.createDelay(.4);delay.delayTime.value=.17;const delayedGain=off.createGain();delayedGain.gain.value=.16;delay.connect(delayedGain).connect(master);
 function note(midi,start,len,vol,kind){const t=start+.005,stop=Math.min(duration-.02,t+len);const gain=off.createGain();gain.gain.setValueAtTime(.0001,t);gain.gain.linearRampToValueAtTime(vol,t+(kind==='pad'?.12:.007));gain.gain.setTargetAtTime(.0001,stop,kind==='pad'?.16:.06);gain.connect(master);if(kind!=='pad')gain.connect(delay);for(const [ratio,level] of (kind==='pad'?[[1,1],[2,.12]]:[[1,1],[2.01,.28],[3.9,.05]])){const osc=off.createOscillator();osc.type='sine';osc.frequency.value=f(midi)*ratio;const part=off.createGain();part.gain.value=level;osc.connect(part).connect(gain);osc.start(t);osc.stop(Math.min(duration-.001,stop+.4));}}
 let pos=0;for(const [pitch,length] of melody){note(pitch,pos*beat,length*beat*.81,.068,'bell');pos+=length;}
 const chords=[[48,52,55],[48,52,55],[53,57,60],[55,59,62]];
 for(let b=0;b<Math.ceil(totalBeats/4);b++){const chord=chords[Math.floor(b/4)%4];for(const n of chord)note(n+12,b*4*beat,3.7*beat,.014,'pad');note(chord[0]-12,b*4*beat,1.6*beat,.027,'pad')}
 return off.startRendering();}
 return {get playing(){return playing},async toggle(){if(playing){source?.stop();source?.disconnect();source=null;playing=false;return false}if(!Audio||!Offline)throw Error('Din browser understøtter ikke julemusikken.');context=context||new Audio();await context.resume();bufferPromise=bufferPromise||build();const buffer=await bufferPromise;if(playing)return true;source=context.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(context.destination);source.start();playing=true;return true;}};
})();
function setupEvents(){doors.addEventListener('click',e=>{const button=e.target.closest('[data-day]');if(button)showDay(Number(button.dataset.day))});
 $('close-dialog').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
 dialog.addEventListener('close',()=>{currentDay=null;window.speechSynthesis?.cancel?.()});
 dialogContent.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,n=Number(b.dataset.index);if(a==='close')return close();if(a==='read-story')return say(DAYS[currentDay-1].story);if(a==='read-greeting')return say('Glædelig jul til 5.D! I reddede Mette og julen.');if(a==='show-story'){phase='story';return renderPhase()}if(a==='show-task'){phase=state.taskDone[currentDay]?'task-done':'task';return renderPhase()}if(a==='show-riddle'){phase='riddle';return renderPhase()}if(a==='hint')return feedback(DAYS[currentDay-1].task.hint,true);if(a==='choice')return handleChoice(n);if(a==='order-add'||a==='order-reset'||a==='order-check'||a==='order-remove')return handleOrder(a,n);if(a==='match-left')return handleMatch('left',n);if(a==='match-right')return handleMatch('right',n);if(a==='sort')return handleSort(Number(b.dataset.word),Number(b.dataset.group));if(a==='sort-check')return checkSort();if(a==='riddle-answer')return riddleAnswer(n)});
 dialogContent.addEventListener('input',e=>{if(e.target.id==='write-answer')updateWriteCount()});
 dialogContent.addEventListener('submit',e=>{if(e.target.id==='type-form'){e.preventDefault();handleType()}else if(e.target.id==='write-form'){e.preventDefault();handleWrite()}});
 $('guess-form').addEventListener('submit',e=>{e.preventDefault();guess($('guess').value)});$('how-button').addEventListener('click',showHow);$('read-aloud-button').addEventListener('click',()=>say('Mette er forsvundet ind i en gammel julebog, og ordene, der holder julens magi i live, bliver slettet. Heldigvis står femte D sammen. Hver dag skal I læse lidt videre, løse en udfordring i dansk og samle ét bogstav.'));
 $('music-switch').addEventListener('click',async()=>{const btn=$('music-switch');btn.disabled=true;btn.textContent='♫ Klargør julemusikken …';try{const on=await music.toggle();btn.setAttribute('aria-pressed',String(on));btn.textContent=on?'♫ Sluk julemusikken':'♫ Tænd julemusikken'}catch(e){btn.textContent='♫ Tænd julemusikken';showToast(e.message||'Julemusikken kunne ikke afspilles.')}finally{btn.disabled=false}});
 }
function validateData(){if(DAYS.length!==MAX_DAYS||RIDDLE_DATA.length!==MAX_DAYS||TASKS.length!==MAX_DAYS)throw Error('Kalenderen skal have 24 dage.');const letters=DAYS.map(x=>x.riddle.letter).join(''),secret=normalizePhrase(SECRET_PHRASE);if(letters!==secret)throw Error('Gådernes bogstaver passer ikke til den hemmelige sætning.');if(DAYS.some(d=>d.people.length!==5||!d.riddle.options.includes(d.riddle.options[d.riddle.answer])))throw Error('Ufuldstændige juledata.');}
validateData();updateCountdown();renderDoors();renderLetters();setupEvents();let lastCount=openCount();setInterval(()=>{updateCountdown();const cnt=openCount();if(cnt!==lastCount){lastCount=cnt;renderDoors()}},1000);
})();