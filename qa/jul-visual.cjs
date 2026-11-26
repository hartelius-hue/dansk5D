(function juleBrowserTests(){
"use strict";
const assert=require("node:assert/strict"),cp=require("node:child_process"),fs=require("node:fs"),path=require("node:path"),{chromium}=require("playwright-core");
const browserBinary=["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].find(fs.existsSync);
if(!browserBinary)throw Error("Chromium mangler");
const origin="http://127.0.0.1:8979";
const server=cp.spawn("python3",["-m","http.server","8979","--bind","127.0.0.1"],{cwd:path.resolve(__dirname,".."),stdio:"ignore"});
let browser;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function ready(){for(let i=0;i<35;i++){try{let r=await fetch(origin+"/jul/index.html");if(r.ok)return;}catch(e){}await pause(150)}throw Error("Juleserver kunne ikke starte")}
async function freeze(page,date="2026-12-15T12:00:00.000Z"){
 await page.addInitScript(dateString=>{
   const Base=window.Date; const fixed=new Base(dateString).getTime();
   window.Date=class extends Base{
    constructor(...args){super(...(args.length?args:[fixed]))}
    static now(){return fixed}
   };
 },date);
}
function locateAnswer(page,answer){return page.locator('button[data-j="choice"],button[data-j="gchoice"]').filter({hasText:answer})}
async function solveOrder(page,selector,tokens,checkAction){
 for(const token of tokens){
  const buttons=await page.locator(selector).allTextContents();
  const idx=buttons.findIndex(x=>x.trim()===token);
  assert.ok(idx>=0,"Sætningsdel mangler: "+token+" i "+JSON.stringify(buttons));
  await page.locator(selector).nth(idx).click();
 }
 await page.locator(`[data-j="${checkAction}"]`).click();
}
async function solveMissionTask(page,t,tryWrong=false){
 if(t.type==="choice"){
  const buttons=page.locator('button[data-j="choice"]');const texts=await buttons.allInnerTexts();
  const idx=texts.findIndex(x=>x.trim().endsWith(t.answer));
  assert.ok(idx>=0,"Facit findes ikke: "+t.prompt);
  if(tryWrong){const bad=texts.findIndex((x,j)=>j!==idx);await buttons.nth(bad).click();assert.match(await page.locator("#j-feedback").innerText(),/Et spor/);}
  await page.locator('button[data-j="choice"]').nth(idx).click();
 }else if(t.type==="input"){
  await page.locator("#j-word").fill(t.accept[0]);
  await page.locator("#j-answer-form button[type=submit]").click();
 }else if(t.type==="order")await solveOrder(page,'button[data-j="sortpick"]',t.tokens,"sortcheck");
 assert.ok(await page.locator('button[data-j="nextTask"]').isVisible(),"Efter rigtigt svar skal næste opgave kunne åbnes: "+t.prompt);
 await page.locator('button[data-j="nextTask"]').click();
}
function candidates(chars,n,word){
 const dirs=[[1,0],[0,1],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]];const found=[];
 for(let y=0;y<n;y++)for(let x=0;x<n;x++)for(const [dx,dy] of dirs){
  const coords=[...word].map((c,k)=>({px:x+k*dx,py:y+k*dy,c}));
  if(coords.every(v=>v.px>=0&&v.py>=0&&v.px<n&&v.py<n&&chars[v.py*n+v.px]===v.c))found.push([y*n+x,coords.at(-1).py*n+coords.at(-1).px]);
 }
 return found;
}
async function solveWordsearch(page,level){
 const data=await page.evaluate(lvl=>window.JUL5D_CONTENT.wordSearch[lvl],level);
 const cells=page.locator(".j-cell");const letters=(await cells.allTextContents()).map(x=>x.trim());
 for(const word of data.words){
  const options=candidates(letters,data.size,word);
  assert.ok(options.length,"Ordet kan ikke ses i feltet: "+word);
  let found=false;
  for(const [a,b] of options){
   await page.locator(".j-cell").nth(a).click();
   await page.locator(".j-cell").nth(b).click();
   found=(await page.locator(".j-word-list span.found").allTextContents()).includes(word);
   if(found)break;
  }
  assert.ok(found,"Kunne ikke markere: "+word);
 }
 assert.ok(await page.locator('[data-j="gameNext"]').isVisible(),"Ordjagten skal kunne afsluttes");
 await page.locator('[data-j="gameNext"]').click();
}
async function solveChain(page,level){
 const paths=[
 ["LYS","SNE","ENGEL","LANTERNE","EVENTYR"],
 ["ÆBLE","ENGEL","LYS","STJERNE","EVENTYR","RENSDYR"],
 ["DECEMBER","RENSDYR","RIM","MISTELTEN","NISSE","EVENTYR","RØD"]
 ];
 for(const word of paths[level]){
  await page.locator('button[data-j="chain"]').filter({hasText:word}).first().click();
 }
 assert.ok(await page.locator('[data-j="gameNext"]').isVisible(),"Ordkæden skal kunne afsluttes");
 await page.locator('[data-j="gameNext"]').click();
}
async function solveMultiGame(page,id,level){
 const data=await page.evaluate(({id,level})=>id==="saetninger"?window.JUL5D_CONTENT.sentenceGames[level]:(id==="synonymer"?window.JUL5D_CONTENT.synonyms[level]:window.JUL5D_CONTENT.quizzes[level]),{id,level});
 for(const row of data){
  if(id==="saetninger")await solveOrder(page,'button[data-j="gsort"]',row,"gsortCheck");
  else{
   let options=await page.locator('button[data-j="gchoice"]').allInnerTexts();
   const n=options.findIndex(x=>x.trim().endsWith(row.answer));
   assert.ok(n>=0,"Julespil facit mangler "+row.prompt);
   await page.locator('button[data-j="gchoice"]').nth(n).click();
  }
  assert.ok(await page.locator('[data-j="gameNext"]').isVisible(),"Næste spilopgave mangler");
  await page.locator('[data-j="gameNext"]').click();
 }
}
async function finishWorkshop(page,id){
 await page.locator(`button[data-j="workshop"][data-id="${id}"]`).first().click();
 if(id==="story"){
  await page.locator('[data-field="0-0"]').fill("Maja, der bor tæt på biblioteket");
  await page.locator('[data-field="0-1"]').fill("Et gammelt bibliotek en snefyldt decemberaften");
  await page.locator('[data-field="0-2"]').fill("Maja skal finde en magisk bog, før klokken slår tolv");
  await page.locator('button[data-j="workshopStep"][data-n="1"]').last().click();
  await page.locator('[data-field="1-0"]').fill(("Maja gik forsigtigt ind i biblioteket. Sneen dalede uden for vinduet, og hun hørte en mærkelig lyd bag reolen. Hun fandt et brev, hvor der stod, at den gamle bog var gemt et sted, kun venner kunne åbne. Hun kaldte på sin ven, og sammen undersøgte de sporene. De fik øje på en nøgle, der lå under en kasse med papir. Da Maja løftede nøglen, begyndte døren at lyse. Hun turde først ikke åbne, men vennen tog hendes hånd. De åbnede døren sammen og fandt en bog fuld af julefortællinger. Begge smilede, for mysteriet var endelig løst. ").repeat(2));
 }else{
  await page.locator('[data-field="0-0"]').fill("1. En tur i skoven\n2. En god bog\n3. En hyggelig aften");
  await page.locator('[data-field="0-1"]').fill("Jeg ønsker mest tid sammen med familien, fordi jeg holder af fælles oplevelser.");
  await page.locator('button[data-j="workshopStep"][data-n="1"]').last().click();
  await page.locator('[data-field="1-0"]').fill("Kære juleven. Jeg ønsker mig en hyggelig eftermiddag med familien, en spændende bog og en tur i skoven. Jeg ønsker især en oplevelse sammen, fordi det giver os gode minder. Det er bare ønsker og ikke krav. Tak, fordi du læser min seddel. Kærlig hilsen.");
 }
 await page.locator('button[data-j="workshopStep"][data-n="2"]').last().click();
 await page.locator('[data-field="2-0"]').fill("Jeg har læst min tekst højt, rettet tegnsætning og gjort mine begrundelser tydeligere.");
 const boxes=page.locator(".j-selfcheck");assert.equal(await boxes.count(),5);
 for(let i=0;i<5;i++)await boxes.nth(i).check();
 await page.locator(`button[data-j="finishWorkshop"][data-id="${id}"]`).click();
 assert.match(await page.locator(".j-room-end").innerText(),/Godt skrevet/);
}
async function main(){
 await ready();
 browser=await chromium.launch({executablePath:browserBinary,headless:true,args:["--no-sandbox","--disable-gpu"]});
 const ctx=await browser.newContext({viewport:{width:1376,height:890},acceptDownloads:true});
 const page=await ctx.newPage();await freeze(page);
 const errors=[],missing=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("response",r=>{if(r.status()>=400&&r.url().includes("/jul/"))missing.push(r.url()+" "+r.status())});
 await page.goto(origin+"/jul/",{waitUntil:"networkidle"});
 assert.match(await page.title(),/Julens danske mysterier/);
 assert.equal(await page.locator('.j-card button[data-j="room"]').count(),4);
 assert.equal(await page.locator('button[data-j="game"]').count(),5);
 assert.equal(await page.locator('button[data-j="workshop"]').count(),2);
 const data=await page.evaluate(()=>window.JUL5D_CONTENT);
 const arts=await page.evaluate(async()=>{let paths=["jule-hero.webp",...window.JUL5D_CONTENT.rooms.flatMap(r=>[`escape-${r.id}.webp`,...Array.from({length:5},(_,i)=>`escape-${r.id}-${i+1}.webp`)]),...["ordjagt","ordkaeder","saetninger","synonymer","julequiz"].map(x=>`game-${x}.webp`),"workshop-skriv.webp","workshop-onske.webp"];return Promise.all(paths.map(async p=>({p,status:(await fetch("assets/"+p)).status})))});
 assert.equal(arts.length,32);assert.deepEqual(arts.filter(x=>x.status!==200),[]);
 fs.mkdirSync(path.join(__dirname,"screenshots"),{recursive:true});
 await page.screenshot({path:path.join(__dirname,"screenshots","jul-desktop.png"),fullPage:true});
 // Fire sammenhængende escape rooms og alle 60 opgaver.
 for(let ri=0;ri<data.rooms.length;ri++){
  const r=data.rooms[ri];await page.goto(origin+"/jul/",{waitUntil:"domcontentloaded"});
  await page.locator(`button[data-j="room"][data-id="${r.id}"]`).first().click();
  for(let lvl=0;lvl<5;lvl++){
   await page.locator(`button[data-j="mission"][data-id="${r.id}"][data-n="${lvl}"]`).first().click();
   for(let j=0;j<3;j++)await solveMissionTask(page,r.scenes[lvl].tasks[j],ri===0&&lvl===0&&j===0);
   assert.ok(await page.locator(".j-room-end").isVisible(),`Mission ${r.id}/${lvl+1} ikke gennemført`);
   await page.locator(`button[data-j="room"][data-id="${r.id}"]`).first().click();
  }
  assert.match(await page.locator(".j-room-end").innerText(),/mysteriet/i);
 }
 // Test hvert spil på alle tre niveauer.
 for(const id of ["ordjagt","ordkaeder","saetninger","synonymer","julequiz"]){
  for(let lvl=0;lvl<3;lvl++){
   await page.goto(origin+"/jul/",{waitUntil:"domcontentloaded"});
   await page.locator(`button[data-j="game"][data-id="${id}"]`).first().click();
   await page.locator(`button[data-j="gameStart"][data-n="${lvl}"]`).click();
   if(id==="ordjagt")await solveWordsearch(page,lvl);
   else if(id==="ordkaeder")await solveChain(page,lvl);
   else await solveMultiGame(page,id,lvl);
   assert.ok(await page.locator(".j-room-end").isVisible(),`${id} level ${lvl} did not complete`);
  }
 }
 for(const id of ["story","wish"]){await page.goto(origin+"/jul/",{waitUntil:"domcontentloaded"});await finishWorkshop(page,id);}
 await page.goto(origin+"/jul/",{waitUntil:"networkidle"});
 await page.locator('[data-j="progress"]').first().click();
 assert.match(await page.locator(".j-stat-row").innerText(),/4\/4/);
 assert.ok(await page.locator(".j-mette-hat").isVisible(),"Mettes originale GIF skal have separat nissehue");
 assert.match(await page.locator(".j-mette-portrait img").getAttribute("src"),/mette-original-animeret\.gif$/,"Avatar skal komme fra Danskportalen");
 await page.locator('[data-j="mette"]').first().click();assert.ok(await page.locator("#j-mette-dialog").isVisible());
 await page.locator('[data-j="mette-close"]').click();
 await page.goto(origin+"/",{waitUntil:"networkidle"});
 assert.ok(await page.locator("#nav-jul").isVisible(),"Juleknap på danskportalens forside skal være synlig");
 assert.equal(await page.locator(".jul-5d-entry").count(),1,"Juleportalen skal ligge på danskforsiden");
 // Efter 29. december skal både navigation og direkte adgang være deaktiveret.
 const after=await browser.newContext({viewport:{width:1280,height:800}});
 const closed=await after.newPage();await freeze(closed,"2026-12-29T08:00:00.000Z");
 await closed.goto(origin+"/",{waitUntil:"domcontentloaded"});
 assert.ok(await closed.locator("#nav-jul").isHidden(),"Juleknappen skal forsvinde 29 december");
 assert.equal(await closed.locator(".jul-5d-entry").count(),0,"Julebanneret skal forsvinde 29 december");
 await closed.goto(origin+"/jul/",{waitUntil:"domcontentloaded"});
 assert.ok(await closed.locator(".j-expired").isVisible(),"Direkte julelink skal være lukket efter 29 december");
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1});
 const m=await mobile.newPage();await freeze(m);
 m.on("pageerror",e=>errors.push("Mobile: "+e.message));
 await m.goto(origin+"/jul/",{waitUntil:"networkidle"});
 assert.ok(await m.locator(".j-hero").isVisible());
 const sizes=await m.evaluate(()=>({page:document.documentElement.scrollWidth,width:innerWidth}));
 assert.ok(sizes.page<=sizes.width+4,"Juleportal giver vandret scroll på mobil "+JSON.stringify(sizes));
 await m.screenshot({path:path.join(__dirname,"screenshots","jul-mobil.png"),fullPage:true});
 assert.deepEqual(errors,[],"Der må ikke være JavaScript-fejl");
 assert.deepEqual(missing,[],"Alle julebilleder og scripts skal returnere HTTP 200");
 console.log("Julebrowserkontrol OK: 20/20 missioner, 60/60 udfordringer, 15/15 julespilsniveauer, 2/2 skriveværksteder, 32 billeder, Mette, fremgang, mobil, dansk udløbsdato.");
 await mobile.close();await after.close();await ctx.close();
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.kill("SIGTERM")});
})();
