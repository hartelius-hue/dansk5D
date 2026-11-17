(function qa(){
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const dataSource=fs.readFileSync("data.js","utf8"),app=fs.readFileSync("app.js","utf8"),index=fs.readFileSync("index.html","utf8"),css=fs.readFileSync("style.css","utf8");
const ctx={window:{}};vm.runInNewContext(dataSource,ctx);const D=ctx.window.DANSK_DATA;
assert.ok(D,"Opgavedata indlæses");
assert.equal(D.topics.length,12,"12 danskfaglige emner");
assert.ok(fs.existsSync("assets/mette-portraet.webp"),"Mettes originale portrætfoto skal være lokalt tilgængeligt");
assert.ok(fs.statSync("assets/mette-portraet.webp").size>10000,"Originalportrættet skal have rigtige billeddata");
assert.ok(fs.existsSync("assets/mette-original-animeret.gif"),"GIF med Mettes originale portræt skal findes");
assert.ok(fs.statSync("assets/mette-original-animeret.gif").size>10000,"GIF med Mettes originalportræt skal indeholde billeddata");
assert.equal(fs.readFileSync("assets/mette-original-animeret.gif").subarray(0,6).toString("ascii"),"GIF89a","Mettes originale animation skal være en GIF");
assert.ok(index.includes('class="mette-float-photo" src="assets/mette-original-animeret.gif"'),"Mette nederst til højre skal vise hendes ægte ansigt i en GIF");
assert.ok(index.includes('srcset="assets/mette-portraet.webp"'),"Reduceret bevægelse skal vise det originale portrætfoto");
assert.ok(app.includes('const photo="assets/mette-portraet.webp";'),"Mette-hjælperens billeder skal vise originalportrættet");
assert.ok(!index.includes("mette-animeret.gif")&&!app.includes("mette-animeret.gif"),"Animeret Mette-avatar må ikke længere vises");
assert.ok(fs.existsSync("assets/hero-5d.webp"),"3D-forsidebanner skal være lokalt tilgængeligt");
const modes=new Set(["quiz","platform","maze","match","memory","wordle","write","speak"]);
for(const t of D.topics)assert.ok(fs.existsSync("assets/topic-"+t.id+".webp"),"Emneillustration mangler: "+t.id);
for(const m of modes)assert.ok(fs.existsSync("assets/game-"+m+".webp"),"Spilillustration mangler: "+m);
assert.ok(index.includes('id="mette-float"'),"Mette skal være klikbar nederst til højre");
assert.ok(index.includes('alt="Mettes originale portræt med en rolig, animeret bevægelse"'),"Mettes animerede portræt skal have beskrivende alt-tekst");
assert.ok(css.includes("@keyframes mette-avatar-hover"),"Mette skal have en diskret svævende bevægelse");
assert.ok(css.includes("@media(prefers-reduced-motion:reduce)"),"Animationen skal respektere reduceret bevægelse");
assert.ok(index.includes('<strong id="adult-title">Til voksne</strong>'),"Voksenpanel og navigation skal have samme navn");
assert.ok(index.includes('>Nulstil fremskridt</button>')&&index.includes('Brug »Nulstil fremskridt«'),"Nulstiltekst og knap skal stemme overens");
assert.ok(index.includes('</span>\n<span>Originale opgaver'),"Footerens tekster skal være adskilt af mellemrum eller linjeskift");
assert.ok(index.includes("med Mette som danskhjælper og badges."),"Metabeskrivelsen skal være flydende");
assert.ok(!index.includes("Lille Mette")&&!app.includes("Lille Mette"),"Kun navnet Mette må bruges");
let numQ=0,numScenarios=0;
for(const t of D.topics){
 assert.equal(t.levels.length,3,`${t.id}: tre niveauer`);
 assert.ok(t.goal&&t.why&&t.tip,`${t.id}: fagdidaktisk forklaring`);
 assert.ok(t.games.length>=2,`${t.id}: mindst to spiltyper`);
 numScenarios+=t.games.length*3;
 for(const mode of t.games){
  assert.ok(modes.has(mode),`${t.id}: spilkoden findes`);
  if(mode==="memory")assert.ok(D.extra.pairs[t.id]?.length===3,"Manglende vendespil: "+t.id);
  if(mode==="wordle")assert.ok(D.extra.wordle[t.id]?.length===3,"Manglende ordgæt: "+t.id);
  if(mode==="write")assert.ok(D.extra.writing[t.id]?.length===3,"Manglende skriveopgaver: "+t.id);
  if(mode==="speak")assert.ok(D.extra.speaking?.length===3,"Manglende taleopgaver");
 }
 for(const [li,qs] of t.levels.entries()){
  assert.ok(qs.length>=3,`${t.id} niveau ${li}: mindst 3 opgaver`);
  assert.equal(new Set(qs.map(q=>q[0])).size,qs.length,`${t.id}: entydige spørgsmål på niveau ${li}`);
  numQ+=qs.length;
  for(const q of qs){
   assert.equal(q.length,5,`${t.id}: spørgsmål med hint og forklaring`);
   assert.equal(q[1].length,3,`${t.id}: tre svarmuligheder`);
   assert.equal(new Set(q[1]).size,3,`${t.id}: svar må ikke være dubletter`);
   assert.ok(Number.isInteger(q[2])&&q[2]>=0&&q[2]<=2,`${t.id}: facitindeks`);
   assert.ok(q[0]&&q[3]&&q[4],`${t.id}: svar, hint og faglig forklaring`);
  }
  if(t.games.includes("match"))assert.equal(new Set(qs.map(q=>q[1][q[2]])).size,qs.length,`${t.id}: entydige matchpar`);
 }
}
assert.ok(index.includes('lang="da"'),"Dansk sprogkode");
for(const path of ["style.css","data.js","app.js"])assert.ok(index.includes(path),"HTML skal indlæse "+path);
new vm.Script(app);
assert.ok(css.includes("@media(max-width:650px)"),"Mobilt breakpoint");
assert.ok(css.includes("focus-visible"),"Tastaturnavigation");
console.log(`Danskværkstedet valideret: ${D.topics.length} emner, ${numQ} spørgsmål, ${numScenarios} spilkombinationer, responsiv CSS og avatar.`);
})();
