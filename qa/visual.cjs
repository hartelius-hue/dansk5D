/* Browserkontrol af billedlayout, navigation og elevhandlinger. */
"use strict";
const assert=require("node:assert/strict");
const cp=require("node:child_process");
const fs=require("node:fs");
const path=require("node:path");
const {chromium}=require("playwright-core");
const binary=["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].find(fs.existsSync);
if(!binary)throw new Error("Chrome/Chromium er ikke installeret.");
const server=cp.spawn("python3",["-m","http.server","8976","--bind","127.0.0.1"],{cwd:path.resolve(__dirname,".."),stdio:"ignore"});
let browser;
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
async function ready(){for(let i=0;i<25;i++){try{const r=await fetch("http://127.0.0.1:8976/index.html");if(r.ok)return}catch(e){}await sleep(200)}throw new Error("Lokal testserver kunne ikke starte")}
async function main(){
  await ready();
  browser=await chromium.launch({executablePath:binary,headless:true,args:["--no-sandbox","--disable-gpu"]});
  const ctx=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:"reduce"});
  const page=await ctx.newPage();const errors=[],badImages=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("response",r=>{if(r.status()>=400&&/\/assets\//.test(r.url()))badImages.push(r.url()+" "+r.status())});
  await page.goto("http://127.0.0.1:8976/",{waitUntil:"networkidle"});
  assert.match(await page.title(),/Danskværkstedet/);
  assert.equal(await page.locator(".subject").count(),12,"Der skal være 12 emner");
  assert.equal(await page.locator("#mette-float").count(),1,"Mette skal stå nederst til højre");
  assert.ok(await page.locator("#mette-float").isVisible(),"Mette skal være synlig");
  const floating=await page.locator("#mette-float").boundingBox();
  assert.ok(floating&&floating.x>1100&&floating.y>650,"Avatarens placering på desktop");
  assert.match(await page.locator(".hero").evaluate(el=>getComputedStyle(el).backgroundImage),/hero-5d\.webp/);
  const images=await page.evaluate(async()=>{
    const paths=["hero-5d.webp","mette-animeret.gif","mette-still.webp",
    ...["stavning","tegn","grammatik","inferens","ord","fag","genre","gys","skriv","kilde","orddele","tale"].map(x=>"topic-"+x+".webp"),
    ...["quiz","platform","maze","match","memory","wordle","write","speak"].map(x=>"game-"+x+".webp")];
    return Promise.all(paths.map(async x=>{const response=await fetch("assets/"+x);return {path:x,status:response.status,type:response.headers.get("content-type")}}));
  });
  assert.equal(images.length,23);
  assert.deepEqual(images.filter(x=>x.status!==200),[],"Alle billeder skal returnere HTTP 200");
  fs.mkdirSync(path.join(__dirname,"screenshots"),{recursive:true});
  await page.screenshot({path:path.join(__dirname,"screenshots","desktop-forside.png"),fullPage:true});
  await page.locator("#mette-float").click();
  assert.ok(await page.locator("#mette-dialog").isVisible(),"Mettes råd skal åbne som dialog");
  assert.match(await page.locator("#mette-dialog").innerText(),/Mette/);
  await page.locator("#close-mette").click();
  assert.ok(!(await page.locator("#mette-dialog").isVisible()),"Dialogen skal lukkes");
  await page.locator('[data-a="topic"][data-id="stavning"]').click();
  assert.match(await page.locator(".topic-feature").evaluate(el=>getComputedStyle(el).backgroundImage),/topic-stavning\.webp/);
  assert.ok(await page.locator(".game-illustration").count()>=2,"Spilbilleder skal være på emnesiden");
  await page.locator('[data-a="choose"][data-mode="quiz"]').click();
  assert.match(await page.locator(".mode-hero").evaluate(el=>getComputedStyle(el).backgroundImage),/game-quiz\.webp/);
  await page.locator('[data-a="level"][data-n="1"]').click();
  await page.locator('[data-a="start"][data-mode="quiz"]').click();
  assert.ok(await page.locator(".playing-banner").isVisible(),"Spillet skal have illustration");
  assert.equal(await page.locator(".choice").count(),3,"Der skal være 3 svar");
  const item=await page.locator(".question").innerText();
  const answer=await page.evaluate(q=>{
    const t=window.DANSK_DATA.topics.find(x=>x.id==="stavning");
    const v=t.levels[1].find(x=>x[0]===q);
    return v?.[1][v[2]];
  },item);
  assert.ok(answer,"Spørgsmålet skal have korrekt facit");
  const options=page.locator(".choice");
  const texts=await options.allInnerTexts();
  const n=texts.findIndex(s=>s.trim().endsWith(answer));
  assert.ok(n>=0,"Det korrekte svar skal være blandt mulighederne");
  const bad=(n+1)%3;await options.nth(bad).click();
  assert.match(await page.locator("#feedback").innerText(),/Prøv igen/);
  await options.nth(n).click();
  assert.ok(await page.locator('[data-a="next"]').isVisible(),"Eleven skal kunne fortsætte");
  await page.locator('[data-a="next"]').click();
  await page.locator('[data-a="topic"]').first().click();
  await page.locator('[data-a="choose"][data-mode="platform"]').click();
  assert.ok(await page.locator(".mode-hero").isVisible());
  await page.locator('[data-a="start"][data-mode="platform"]').click();
  assert.equal(await page.locator(".arcade-door").count(),3);
  await page.locator('[data-a="topic"]').first().click();
  await page.locator("#home").click();
  await page.locator('[data-a="topic"][data-id="inferens"]').click();
  await page.locator('[data-a="choose"][data-mode="maze"]').click();
  await page.locator('[data-a="start"][data-mode="maze"]').click();
  assert.equal(await page.locator("#maze .maze-cell").count(),25,"Ordslugeren skal have 25 felter");
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1,reducedMotion:"reduce"});
  const small=await mobile.newPage();small.on("pageerror",e=>errors.push("mobil: "+e.message));
  await small.goto("http://127.0.0.1:8976/",{waitUntil:"networkidle"});
  assert.equal(await small.locator(".subject").count(),12);
  assert.ok(await small.locator("#mette-float").isVisible(),"Mette skal også vises på mobil");
  const sw=await small.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert.ok(sw.scroll<=sw.width+3,"Ingen vandret scrolling på mobil: "+JSON.stringify(sw));
  await small.screenshot({path:path.join(__dirname,"screenshots","mobil-forside.png"),fullPage:true});
  assert.deepEqual(errors,[],"Ingen JavaScript-fejl i browser");
  assert.deepEqual(badImages,[],"Ingen billedfejl");
  console.log("Browserkontrol OK: desktop, mobil, avatar, emner, alle 23 billedfiler, quiz, fejlfeedback, platformspil og labyrint.");
  await mobile.close();await ctx.close();
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.kill("SIGTERM")});
