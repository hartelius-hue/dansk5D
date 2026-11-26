/* Rigtig Chromium-kontrol af juleportalen på desktop, mobil og efter lukning. */
"use strict";
const assert=require("node:assert/strict");
const cp=require("node:child_process");
const fs=require("node:fs");
const path=require("node:path");
const {chromium}=require("playwright-core");
const binary=["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].find(fs.existsSync);
if(!binary)throw Error("Chromium mangler");
const origin="http://127.0.0.1:8982";
const server=cp.spawn("python3",["-m","http.server","8982","--bind","127.0.0.1"],{cwd:path.resolve(__dirname,".."),stdio:"ignore"});
let browser;
async function ready(){for(let i=0;i<35;i++){try{let r=await fetch(origin+"/jul/");if(r.ok)return}catch(e){}await new Promise(r=>setTimeout(r,200))}throw Error("Juleserver ikke klar")}
async function clickFirst(page,selector){const el=page.locator(selector).first();await el.click();return el}
async function run(){
 await ready();
 browser=await chromium.launch({executablePath:binary,headless:true,args:["--no-sandbox","--disable-gpu"]});
 const ctx=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:"no-preference"});
 const page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto(origin+"/jul/",{waitUntil:"networkidle"});
 assert.match(await page.title(),/Julens danske mysterier/);
 assert.equal(await page.locator(".j-hero").count(),1,"Juleforside skal vises");
 assert.equal(await page.locator('.j-card button[data-j="room"]').count(),4,"Fire forskellige escape rooms");
 assert.equal(await page.locator('.j-card button[data-j="game"]').count(),5,"Fem danskfaglige julespil");
 assert.equal(await page.locator('.j-card button[data-j="workshop"]').count(),2,"To skriveværksteder");
 const gif=page.locator(".j-mette-float img");
 assert.ok(await gif.isVisible(),"Mette synlig");
 assert.match(await gif.getAttribute("src"),/assets\/mette-original-animeret\.gif$/,"Den originale avatar fra danskportalen");
 assert.ok(await page.locator(".j-mette-hat").isVisible(),"Nissehue som eget lag");
 assert.match(await page.locator(".j-mette-portrait source").getAttribute("srcset"),/mette-portraet\.webp/);
 await page.locator(".j-mette-float").click();
 assert.ok(await page.locator("#j-mette-dialog").isVisible());
 await page.locator('[data-j="mette-close"]').click();
 const rooms=["bogen","brevet","klokken","gaven"];
 for(const id of rooms){
   await page.locator('[data-j="room"][data-id="'+id+'"]').first().click();
   assert.equal(await page.locator(".j-level").count(),5,id+" fem missioner");
   assert.equal(await page.locator(".j-level:disabled").count(),4,id+" startspærrer");
   await page.locator('[data-j="room"]').last().click();
  await page.locator('[data-j="home"]').first().click();
 }
 await page.locator('.j-card button[data-j="room"][data-id="bogen"]').click();
 await page.locator('[data-j="mission"][data-id="bogen"][data-n="0"]').first().click();
 for(let i=0;i<3;i++){
   const task=await page.evaluate(i=>window.JUL5D_CONTENT.rooms[0].scenes[0].tasks[i],i);
   if(task.type==="choice"){
     const opts=page.locator('[data-j="choice"]');const texts=await opts.allInnerTexts();
     const index=texts.findIndex(s=>s.trim().endsWith(task.answer));
     assert.ok(index>=0,"Korrekt mulighed kan findes");
     await opts.nth(index).click();
   }else if(task.type==="input"){
     await page.locator("#j-word").fill(task.accept[0]);
     await page.locator("#j-answer-form button[type=submit]").click();
   }else if(task.type==="order"){
     for(const token of task.tokens){const opt=page.locator(".j-sort-item").filter({hasText:token}).first();await opt.click()}
     await page.locator('[data-j="sortcheck"]').click();
   }
   assert.ok(await page.locator('[data-j="nextTask"]').isVisible(),"Næste opgave efter korrekt svar");
   await page.locator('[data-j="nextTask"]').click();
 }
 assert.ok(await page.locator(".j-room-end").isVisible(),"Mission er gennemført");
 await page.locator('[data-j="home"]').first().click();
 for(const id of ["ordjagt","ordkaeder","saetninger","synonymer","julequiz"]){
   await page.locator('.j-card [data-j="game"][data-id="'+id+'"]').click();
   assert.equal(await page.locator('[data-j="gameStart"]').count(),3,id+" skal have tre niveauer");
   await page.locator('[data-j="gameStart"][data-n="0"]').click();
   assert.ok(await page.locator(".j-panel").isVisible(),id+" visning skal fungere");
   await clickFirst(page,'[data-j="home"]');
 }
 for(const id of ["story","wish"]){
   await page.locator('.j-card [data-j="workshop"][data-id="'+id+'"]').click();
   assert.equal(await page.locator("[data-work]").count()>0,true,id+" skrivefelter");
   await page.locator("[data-work]").first().fill("Denne juletekst er skrevet til en tydelig modtager.");
   assert.equal(await page.locator('[data-j="workshopStep"]').count(),3,id+" har tre skrivefaser");
   await clickFirst(page,'[data-j="home"]');
 }
 fs.mkdirSync(path.join(__dirname,"screenshots"),{recursive:true});
 await page.screenshot({path:path.join(__dirname,"screenshots","jul-desktop.png"),fullPage:true});
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1});
 const small=await mobile.newPage();small.on("pageerror",e=>errors.push("Mobil: "+e.message));
 await small.goto(origin+"/jul/",{waitUntil:"networkidle"});
 assert.ok(await small.locator(".j-mette-hat").isVisible());
 const mw=await small.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
 assert.ok(mw[0]<=mw[1]+4,"Ingen vandret mobilscroll: "+mw);
 await small.screenshot({path:path.join(__dirname,"screenshots","jul-mobil.png"),fullPage:true});
 await mobile.close();
 const future=await browser.newContext({viewport:{width:900,height:700}});
 await future.addInitScript(()=>{
   const Original=Date,then=Original.parse("2026-12-28T23:10:00Z");
   class FixedDate extends Original{constructor(...a){super(...(a.length?a:[then]))}static now(){return then}}
   window.Date=FixedDate;
 });
 const expired=await future.newPage();expired.on("pageerror",e=>errors.push("Efter lukning: "+e.message));
 await expired.goto(origin+"/jul/",{waitUntil:"networkidle"});
 assert.ok(await expired.locator(".j-expired").isVisible(),"Direkte julelink skal lukke efter 29. december");
 assert.equal(await expired.locator(".j-hero").count(),0,"Opgaver må ikke vises efter udløb");
 await expired.goto(origin+"/",{waitUntil:"networkidle"});
 assert.ok(await expired.locator("#nav-jul").isHidden(),"Juleknappen skal forsvinde fra Danskportalens navigation");
 assert.equal(await expired.locator(".jul-5d-entry").count(),0,"Julebanneret skal forsvinde fra forsiden");
 await future.close();
 assert.deepEqual(errors,[],"Ingen JavaScript-fejl");
 console.log("Juleportal: 4 escape rooms, 5 spil, 2 værksteder, Mette med nissehue, missionfeedback, desktop, mobil og automatisk lukning bestået.");
}
run().catch(e=>{console.error(e.stack||e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.kill("SIGTERM")});
