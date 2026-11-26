(function juleQA(){
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const ctx={window:{},Intl,Date};
new vm.Script(read("jul/season.js")).runInNewContext(ctx);
new vm.Script(read("jul/jul-data.js")).runInNewContext(ctx);
new vm.Script(read("jul/jul-app.js"));
const D=ctx.window.JUL5D_CONTENT,S=ctx.window.JUL5D_SEASON;
assert.ok(D&&S);
assert.equal(S.localDay(new Date("2026-12-28T22:59:59Z")),"2026-12-28");
assert.equal(S.localDay(new Date("2026-12-28T23:00:00Z")),"2026-12-29");
assert.ok(S.isOpen(new Date("2026-11-26T14:00:00Z")),"Jul skal være tilgængelig fra 26. november");
assert.ok(S.isOpen(new Date("2026-12-28T22:59:59Z")),"Jul skal kunne bruges 28. december");
assert.ok(!S.isOpen(new Date("2026-12-28T23:00:00Z")),"Jul skal forsvinde præcist ved dansk midnat 29. december");
assert.ok(!S.isOpen(new Date("2027-01-03T10:00:00Z")),"Jul må ikke være åben i januar");
assert.equal(D.rooms.length,4);
const ids=new Set(),modes=new Set();
let tasks=0,stages=0;
for(const r of D.rooms){
 assert.ok(!ids.has(r.id),"Unik rum-id");ids.add(r.id);
 assert.equal(r.scenes.length,5,`${r.id} skal have fem missioner`);
 assert.equal([...r.letter].length,5,`${r.id} skal samle et fem-bogstavsord`);
 assert.ok(r.intro&&r.finish&&r.skills);
 for(const [j,stage] of r.scenes.entries()){
  assert.equal(stage.tasks.length,3,`${r.id} ${j} skal have tre opgaver`);
  const prompts=new Set();
  for(const t of stage.tasks){
   tasks++;modes.add(t.type);
   assert.ok(t.prompt&&t.hint&&t.why,`${r.id} ${j} skal have opgave, hint og faglig forklaring`);
   assert.ok(!prompts.has(t.prompt),`${r.id} må ikke gentage samme opgave`);prompts.add(t.prompt);
   if(t.type==="choice"){
    assert.equal(t.choices.length,3);
    assert.equal(new Set(t.choices).size,3);
    assert.equal(t.choices.filter(x=>x===t.answer).length,1,"Facit skal kun forekomme én gang");
   }else if(t.type==="input"){
    assert.ok(t.accept.length>=1);
    assert.ok(t.accept.every(x=>typeof x==="string"&&x.length>0));
   }else if(t.type==="order"){
    assert.ok(t.tokens.length>=3&&new Set(t.tokens).size===t.tokens.length);
   }else throw Error("Ukendt opgavetype: "+t.type);
  }stages++;
 }
 assert.ok(fs.existsSync(`jul/assets/escape-${r.id}.webp`),"Rum-banner mangler "+r.id);
 for(let i=1;i<=5;i++)assert.ok(fs.existsSync(`jul/assets/escape-${r.id}-${i}.webp`),"Missionsbanner mangler "+r.id+"-"+i);
}
assert.deepEqual([...modes].sort(),["choice","input","order"]);
assert.equal(stages,20);assert.equal(tasks,60);
assert.equal(D.wordSearch.length,3);
for(const [i,lvl] of D.wordSearch.entries()){
 assert.ok(lvl.words.length>=5);
 assert.ok(lvl.words.every(x=>[...x].length<=lvl.size),`For langt ord i ordjagt niveau ${i}`);
 assert.equal(new Set(lvl.words).size,lvl.words.length);
}
assert.equal(D.chains.length,3);
function canReach(cfg){
 const visited=new Set([cfg.start]);
 function dfs(last,count){
  if(count===cfg.goal)return true;
  return cfg.words.some(word=>{
   if(visited.has(word)||word[0]!==last.at(-1))return false;
   visited.add(word);const found=dfs(word,count+1);visited.delete(word);return found;
  });
 }
 return dfs(cfg.start,0);
}
D.chains.forEach((lvl,i)=>assert.ok(canReach(lvl),`Ordkæde niveau ${i+1} skal kunne løses`));
assert.equal(D.sentenceGames.length,3);
D.sentenceGames.forEach((l,i)=>{assert.equal(l.length,3);l.forEach(tokens=>assert.ok(tokens.length>=3&&new Set(tokens).size===tokens.length))});
for(const key of ["synonyms","quizzes"]){
 assert.equal(D[key].length,3);
 D[key].forEach((lvl,i)=>{assert.ok(lvl.length>=4);lvl.forEach(q=>{assert.equal(q.choices.length,3);assert.ok(q.choices.includes(q.answer));assert.ok(q.why&&q.hint)})});
}
for(const id of ["story","wish"]){const w=D.workshops[id];assert.ok(w.title&&w.description);assert.equal(w.steps.length,3);assert.equal(w.check.length,5);w.steps.forEach(s=>assert.ok(s.fields.length>=1));}
assert.ok(fs.existsSync("jul/assets/jule-hero.webp"));
for(const x of ["ordjagt","ordkaeder","saetninger","synonymer","julequiz"])assert.ok(fs.existsSync(`jul/assets/game-${x}.webp`));
for(const x of ["skriv","onske"])assert.ok(fs.existsSync(`jul/assets/workshop-${x}.webp`));
const arts=fs.readdirSync("jul/assets").filter(x=>x.endsWith(".webp"));
assert.equal(arts.length,32,"Der skal være 32 julebannere i 3D-inspireret stil");
const root=read("app.js"),index=read("index.html"),jul=read("jul/index.html"),css=read("jul/jul.css");
assert.ok(index.includes('src="jul/season.js"')&&index.includes('id="nav-jul"'));
assert.ok(root.includes("julEntry()")&&root.includes("julVisible()"));
assert.ok(jul.includes('src="jul-app.js"')&&jul.includes('src="season.js"'));
assert.ok(jul.includes("mette-original-animeret.gif"));
assert.ok(jul.includes("j-mette-hat"),"Nissehue skal tegnes over originalportrættet");
assert.ok(jul.includes("mette-portraet.webp"),"Originalfoto skal bruges ved reduceret bevægelse");
assert.ok(css.includes("j-mette-portrait")&&css.includes("j-hat-bob"),"Mette skal have diskret animation og nissehue");
assert.ok(css.includes("@media(max-width:670px)")&&css.includes("focus-visible"),"Tilgængelig mobilvisning");
console.log(`JULEPORTAL VALID: 4 escape rooms, ${stages} missioner, ${tasks} faglige udfordringer, 5 julespil på 3 niveauer, 2 skriveværksteder, ${arts.length} bannere og dansk datolukning 29/12.`);
})();
