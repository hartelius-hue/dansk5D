(function qa(){
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const dataSource=fs.readFileSync("data.js","utf8"),app=fs.readFileSync("app.js","utf8"),index=fs.readFileSync("index.html","utf8"),css=fs.readFileSync("style.css","utf8");
const ctx={window:{}};vm.runInNewContext(dataSource,ctx);const D=ctx.window.DANSK_DATA;
assert.ok(D,"Opgavedata indlæses");
assert.equal(D.topics.length,12,"12 danskfaglige emner");
assert.ok(fs.existsSync("assets/mette-avatar.webp"),"Lille Mette-avatar skal være lokalt tilgængelig");
const modes=new Set(["quiz","platform","maze","match","memory","wordle","write","speak"]);
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
