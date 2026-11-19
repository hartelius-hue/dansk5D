/* 5.D, december 2026: 24 originalskrevne julemissioner til klassens egen fortælling.
 * Idéer om genrer, rim, personkarakteristik og ordleg er inspireret af variationen
 * i 'Dansklærerens julekalender'; ingen opgavetekster fra materialet gengives.
 * Denne fil indlæses efter content.js, før calendar.js. */
'use strict';
const TASKS_REVISION = [
  {
    skill:'Brevskrivning og modtagerbevidsthed',type:'write',
    question:'Mettes stol er tom, og den røde bog blinker. Skriv en kort besked til Mette, som kan hjælpe hende med at holde modet oppe.',
    starter:'Kære Mette,',minWords:22,
    criteria:['Jeg skriver direkte til Mette og fortæller, hvorfor jeg skriver.','Jeg har mindst ét konkret forslag til, hvad klassen vil gøre.','Jeg slutter med en hilsen, der passer til et brev.'],
    hint:'Et brev har en modtager, et tydeligt budskab og en afslutning. Skriv 3–4 sætninger.',
    why:'Du har arbejdet med brevets form, modtagerbevidsthed og et tydeligt budskab.'
  },
  {
    skill:'Brevets opbygning',type:'match',
    question:'Nissen har tabt sin besked i tre dele. Forbind hver brevdel med dens funktion.',
    pairs:[['»Kære 5.D«','Hilsen til modtageren'],['»Jeg skriver, fordi Mette er forsvundet.«','Brevets budskab'],['»Venlig hilsen, nissen Fnug«','Afslutning og afsender']],
    hint:'Begyndelsen viser, hvem brevet er til. Midten fortæller, hvorfor man skriver. Slutningen viser, hvem det er fra.',
    why:'Du har undersøgt, hvordan et brev bygges op, så modtageren kan forstå budskabet.'
  },
  {
    skill:'Ordklasser og egennavne',type:'sort',
    question:'For at åbne døren bag bogreolen skal I sortere ordene. Vælg den ordklasse, de passer til.',
    groups:['Navneord','Udsagnsord','Tillægsord','Egennavn'],
    items:[['nisse','Navneord'],['hvisker','Udsagnsord'],['mørk','Tillægsord'],['Mette','Egennavn'],['pebernød','Navneord'],['knitrer','Udsagnsord'],['gylden','Tillægsord'],['Aarhus','Egennavn']],
    hint:'Egennavne er navne på bestemte personer eller steder. De skrives med stort begyndelsesbogstav.',
    why:'Du har skelnet mellem navneord, udsagnsord, tillægsord og egennavne i en juletekst.'
  },
  {
    skill:'Direkte tale og tegnsætning',type:'choice',
    question:'Børnene finder et punktum i sneen. Hvilken replik er tegnsat korrekt?',
    options:['»Skynd jer!« råbte Leo.','»Skynd jer! råbte Leo.«','»Skynd jer«! råbte Leo.'],answer:0,
    hint:'Udråbstegnet hører til replikken, og anførselstegnet afslutter den direkte tale.',
    why:'Ved direkte tale skal læseren tydeligt kunne se, hvor replikken begynder og slutter.'
  },
  {
    skill:'Lyrik og billedsprog',type:'write',
    question:'Skriv et lille juledigt på 3–4 linjer om honningkagehuset. Brug ordene »stjerne«, »nat« og »duft«. Mindst én linje skal skabe et sansebillede.',
    starter:'Over taget skinner en stjerne …',minWords:18,
    criteria:['Jeg har skrevet 3–4 korte digtlinjer.','Ordene stjerne, nat og duft indgår.','Jeg har brugt et sanseindtryk eller en sammenligning.'],
    hint:'Du kan skrive om en duft, en lyd eller noget, man ser. Rim er frivilligt; de præcise ord er vigtigst.',
    why:'Du har eksperimenteret med lyrik, sanseindtryk og præcist ordvalg.'
  },
  {
    skill:'Ydre og indre personkarakteristik',type:'write',
    question:'Beskriv den forskrækkede nisse fra honningkagehuset. Skriv først, hvordan han ser ud. Forklar derefter, hvordan han måske har det, og hvilket spor der får dig til at tro det.',
    starter:'Nissen har …',minWords:24,
    criteria:['Jeg har mindst én konkret oplysning om nissens udseende.','Jeg nævner en mulig følelse eller egenskab.','Jeg begrunder min tolkning med et spor fra fortællingen.'],
    hint:'Ydre karakteristik er det, man kan se. Indre karakteristik handler om tanker, følelser og egenskaber.',
    why:'Du har skelnet mellem ydre og indre personkarakteristik og begrundet en fortolkning med tekstspor.'
  },
  {
    skill:'Stavning og ordkontrol',type:'type',
    question:'På kuverten står der »PLUSELIG«. Ét bogstav mangler. Skriv ordet korrekt, så næste spor bliver synligt.',
    answers:['pludselig'],
    hint:'Der mangler et bogstav lige efter u. Prøv at genkalde dig stavemåden fra bøger, du har læst.',
    why:'Ordet staves »pludselig« med d efter u. Det er et ord, hvor man ikke kan høre alle bogstaver tydeligt.'
  },
  {
    skill:'Fortællestruktur og rækkefølge',type:'order',
    question:'Møllens billedkort ligger blandet. Sæt hændelserne i den rækkefølge, der skaber en lille spændingsfortælling.',
    parts:['En nisse opdager, at julestjernen er forsvundet.','Han følger mystiske fodspor gennem sneen.','På den frosne sø står han ansigt til ansigt med Skyggeskriveren.','Nissen finder stjernen i en kasse og tager den med hjem.','Stjernen lyser igen over nissebyen.'],
    hint:'Begynd med problemet, byg spændingen op, og lad løsningen komme før afslutningen.',
    why:'Du har skabt en fortælling med begyndelse, spændingsopbygning, vendepunkt og afslutning.'
  },
  {
    skill:'Ordklasser i sammenhæng',type:'sort',
    question:'Ordene i drivhuset vokser på de forkerte grene. Sortér dem efter deres funktion.',
    groups:['Navneord','Udsagnsord','Tillægsord'],
    items:[['juleklokke','Navneord'],['skinner','Udsagnsord'],['hemmelig','Tillægsord'],['lygte','Navneord'],['hvisker','Udsagnsord'],['frossen','Tillægsord']],
    hint:'Prøv ordene i en sætning: en/et …, at …, eller en … ting.',
    why:'Du har brugt ordenes funktion i en sætning til at skelne mellem de tre ordklasser.'
  },
  {
    skill:'Nogen og nogle',type:'choice',
    question:'Broens skilt mangler et ord: »Vi kan ikke finde ___ spor i sneen.« Hvilket ord skal stå på skiltet?',
    options:['nogle','nogen','nogene'],answer:1,
    hint:'Når du nægter, at der findes noget, bruger du normalt »nogen«.',
    why:'Det hedder »Vi kan ikke finde nogen spor«. I nægtende sætninger bruger vi som regel »nogen«.'
  },
  {
    skill:'Sansende og beskrivende sprog',type:'write',
    question:'Luk øjnene og forestil dig nisseværkstedet. Skriv tre sætninger, så en læser kan høre, lugte eller mærke, at stedet er fuldt af julemagi.',
    starter:'Inde i værkstedet …',minWords:25,
    criteria:['Jeg bruger mindst to forskellige sanser.','Jeg skriver konkrete detaljer frem for kun »flot« eller »hyggeligt«.','Mine sætninger hænger sammen og er lette at forstå.'],
    hint:'Beskriv fx lyden af sne, duften af gran, kulden i fingrene eller lyset fra en lampe.',
    why:'Du har gjort en beskrivelse levende med sanseord, konkrete detaljer og sammenhæng.'
  },
  {
    skill:'Rim og lyd',type:'match',
    question:'Nissens rim er blevet blandet. Find de tre ordpar med samme slutlyd.',
    pairs:[['stjerne','hjerne'],['hjerte','smerte'],['hus','mus']],
    hint:'Sig ordene højt, og lyt til lydene fra den betonede vokal til slutningen.',
    why:'Du har arbejdet med enderim. Rim handler om lyd, ikke kun om, at bogstaverne ser ens ud.'
  },
  {
    skill:'Nutids-r',type:'type',
    question:'På den gyldne seddel står der »Nissen køre gennem sneen lige nu.« Skriv kun udsagnsordet i den korrekte nutidsform.',
    answers:['kører'],
    hint:'Sæt »jeg« foran: »jeg kører«. Nutid af »at køre« har -r til sidst.',
    why:'Når handlingen foregår nu, hedder det »kører«. Det er nutidsformen af »at køre«.'
  },
  {
    skill:'Sammenhæng og tidsord',type:'order',
    question:'Skyggeskriveren har flyttet rundt på fire sætninger. Sæt dem i den rækkefølge, der giver en sammenhængende historie.',
    parts:['Først fandt Sara en lille messingnøgle.','Derefter åbnede hun den låste dør.','Bag døren opdagede børnene et brev fra Mette.','Til sidst læste de brevet højt for hinanden.'],
    hint:'Find tidsordene: først, derefter, bag døren og til sidst.',
    why:'Du har arbejdet med rækkefølge og forbindelser, der hjælper læseren gennem et handlingsforløb.'
  },
  {
    skill:'Replikker og anførselstegn',type:'choice',
    question:'Mette hvisker inde fra bogen. Hvilken sætning gengiver hendes ord som direkte tale?',
    options:['Mette sagde, at hun var tæt på at slippe fri.','Mette sagde: »Jeg er tæt på at slippe fri.«','Mette sagde jeg er tæt på at slippe fri.'],answer:1,
    hint:'Direkte tale gengiver personens egne ord. Se efter kolon og anførselstegn.',
    why:'I direkte tale citerer vi personens ord. Kolon og anførselstegn gør replikken tydelig.'
  },
  {
    skill:'Billedsprog og betydning',type:'match',
    question:'Byens skilte bruger billedsprog. Find den betydning, der passer til hvert udtryk.',
    pairs:[['Sneen var et hvidt tæppe.','Sneen dækkede landskabet.'],['Tiden fløj af sted.','Det føltes, som om tiden gik hurtigt.'],['Hjertet sad helt oppe i halsen.','Personen var meget nervøs.']],
    hint:'Udtrykkene skal ikke forstås bogstaveligt. Hvad får de dig til at forestille dig?',
    why:'Du har fortolket billedlige udtryk og oversat dem til almindeligt, konkret sprog.'
  },
  {
    skill:'Fakta, holdning og kildekritik',type:'sort',
    question:'Den falske julemand hænger opslag op på torvet. Sortér udsagnene: Kan de efterprøves, eller er de holdninger?',
    groups:['Kan undersøges','Holdning'],
    items:[['December har 31 dage.','Kan undersøges'],['Varm kakao smager bedre end te.','Holdning'],['En uge har syv dage.','Kan undersøges'],['Alle bør hænge stjerner i vinduerne.','Holdning']],
    hint:'Kan du undersøge udsagnet og afgøre, om det er rigtigt? Eller er det en personlig vurdering?',
    why:'Du har skelnet mellem udsagn, der kan efterprøves, og holdninger, der udtrykker vurderinger.'
  },
  {
    skill:'Genrekendetegn',type:'match',
    question:'Tre tekster om julebyen er blandet sammen. Forbind hver tekstbid med dens genre.',
    pairs:[['»Rør smør, sukker og mel sammen. Bag i otte minutter.«','Opskrift'],['»Kære Mette. Vi arbejder på at få dig fri.«','Brev'],['»Sneen daler, klokken taler.«','Digt']],
    hint:'En opskrift giver trin, et brev har en modtager, og et digt bruger ofte rytme og sproglige billeder.',
    why:'Du har identificeret genrer ved at se på deres formål og typiske sproglige træk.'
  },
  {
    skill:'Læs mellem linjerne',type:'choice',
    question:'»Nissen gemte brevet under frakken, da børnene nærmede sig. Han smilede, men hans hænder rystede.« Hvad antyder teksten?',
    options:['Han forsøger at skjule noget og er nervøs.','Han er helt rolig og vil vise brevet frem.','Han kan ikke finde sin frakke.'],answer:0,
    hint:'Læg mærke til, hvad han gør med brevet, og hvordan hans hænder reagerer.',
    why:'Du har draget en slutning ud fra tekstspor, selvom følelsen ikke står direkte i teksten.'
  },
  {
    skill:'Sammensatte ord og fuge-s',type:'type',
    question:'To juleord skal sættes sammen: »juletræ« + »tæppe«. Hvad hedder ét tæppe til at lægge under et juletræ? Skriv ordet i ét.',
    answers:['juletræstæppe'],
    hint:'Sammensatte ord skrives ofte i ét. Her kommer der et binde-s mellem de to dele.',
    why:'Det hedder »juletræstæppe«: juletræ + s + tæppe. Bogstavet s kaldes et fuge-s.'
  },
  {
    skill:'Instruerende tekst og rækkefølge',type:'write',
    question:'Julemandens kane skal kunne flyve uden rensdyr i en nødsituation. Skriv en ultrakort brugsanvisning med tre trin, der forklarer, hvordan den nye kane sættes i gang.',
    starter:'1. Først skal du …',minWords:25,
    criteria:['Jeg har tre trin i en logisk rækkefølge.','Jeg bruger tydelige handleord som »tryk«, »drej« eller »kontrollér«.','Min instruktion er så præcis, at en anden kan følge den.'],
    hint:'En brugsanvisning fortæller, hvad man gør, og i hvilken rækkefølge. Skriv 1, 2 og 3.',
    why:'Du har skrevet en instruerende tekst med rækkefølge og præcise handlinger.'
  },
  {
    skill:'Personkarakteristik med belæg',type:'write',
    question:'Skyggeskriveren siger, at ingen gider læse hans historier, og han kigger ned i bordet. Forklar med 2–3 sætninger, hvad han måske føler, og brug to spor fra teksten.',
    starter:'Jeg tror, at Skyggeskriveren …',minWords:24,
    criteria:['Jeg nævner en mulig følelse eller indre egenskab.','Jeg bruger mindst to konkrete spor fra teksten.','Jeg skriver »måske« eller »jeg tror«, fordi min tolkning ikke er sikker.'],
    hint:'Han taler om, at ingen læser hans historier, og han ser ned. Hvad kan det fortælle?',
    why:'Du har fortolket en persons følelser og begrundet det med konkrete oplysninger fra teksten.'
  },
  {
    skill:'Kronologi og sammenhæng',type:'write',
    question:'I har næsten fundet Mette. Skriv en kort logbog over redningsaktionen. Fortæl i tre sætninger, hvad I gjorde først, hvad I opdagede, og hvad næste skridt bliver.',
    starter:'Først …',minWords:24,
    criteria:['Jeg beskriver tre hændelser i en tydelig rækkefølge.','Jeg bruger tidsord som »først«, »bagefter« eller »til sidst«.','Mine sætninger hænger sammen og gør det let at følge planen.'],
    hint:'En logbog giver overblik over det, der er sket, og det næste, man skal gøre.',
    why:'Du har brugt kronologi og tidsmarkører til at formidle et handlingsforløb.'
  },
  {
    skill:'Dagbog og fortællerperspektiv',type:'write',
    question:'Mette er reddet! Skriv hendes dagbogsnotat fra den 24. december. Skriv i jeg-form, og fortæl både om dagens vigtigste begivenhed og om hendes følelser.',
    starter:'Torsdag den 24. december 2026\nKære dagbog,',minWords:30,
    criteria:['Jeg har dato og indleder med »Kære dagbog«.','Jeg skriver i jeg-form, som om jeg er Mette.','Jeg beskriver en begivenhed og en følelse og slutter notatet naturligt.'],
    hint:'En dagbog er personlig. Brug »jeg« og fortæl om både det, der skete, og hvordan det føltes.',
    why:'Du har skrevet en dagbogstekst i første person med begivenhed, oplevelse og genretræk.'
  }
];
if (typeof TASKS === 'undefined' || TASKS.length !== 24 || TASKS_REVISION.length !== 24) {
 throw new Error('Danskmissionernes antal passer ikke til de 24 låger.');
}
TASKS.splice(0, TASKS.length, ...TASKS_REVISION);
DAYS.forEach((day,i) => { day.task = TASKS_REVISION[i]; });