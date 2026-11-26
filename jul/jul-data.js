/* Dansk 5.D – originale juleopgaver, 4 escape rooms × 5 missioner × 3 udfordringer. */
window.JUL5D_CONTENT = {
 "title": "Julens danske mysterier",
 "year": 2026,
 "openUntil": "2026-12-29",
 "rooms": [
  {
   "id": "bogen",
   "title": "Nissens forsvundne bog",
   "tag": "Mysteriet på det gamle bibliotek",
   "icon": "📚",
   "color": "blue",
   "letter": "NISSE",
   "intro": "Da bibliotekets sidste klokke ringer, forsvinder den bog, som indeholder alle julens fortællinger. En lille nisse har efterladt fem spor. Uden bogen kan ingen huske, hvordan juleeventyrene ender.",
   "finish": "Du fandt historiebogen under bibliotekets hemmelige gulvlem. Nissen forklarer, at han gemte den, fordi de gamle fortællinger var ved at blive glemt. Nu kan julehistorierne læses igen.",
   "skills": "Læseforståelse, stavning, tegnsætning, fortolkning og genrekendskab",
   "scenes": [
    {
     "title": "Spor mellem hylderne",
     "story": "En tynd stribe sne fører ind mellem bogreolerne. Vinduet er lukket, men på et bord står en kop te, der stadig damper. Nissen er ikke langt væk.",
     "goal": "Find tekstens spor, og skeln mellem det, der står, og det, du udleder.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad kan du med rimelighed udlede af den varme te?",
       "choices": [
        "At nogen kan have været der for nylig.",
        "At biblioteket altid er åbent.",
        "At koppen er lavet af sølv."
       ],
       "answer": "At nogen kan have været der for nylig.",
       "hint": "Brug detaljen om dampen. Giver den viden om tid eller sted?",
       "why": "Dampen tyder på, at teen endnu er varm. Det kan pege på et nyligt besøg, men er ikke et bevis."
      },
      {
       "type": "input",
       "prompt": "Bogryggene er støvede, men én har et frisk håndaftryk. Hvad kalder man et tegn i teksten, der kan hjælpe læseren med at slutte noget? Skriv ét fagord.",
       "accept": [
        "spor",
        "tekstspor"
       ],
       "hint": "Det er et konkret tegn, som du kan bruge som belæg.",
       "why": "Et tekstspor er en detalje, du kan bruge til at begrunde en fortolkning."
      },
      {
       "type": "order",
       "prompt": "Sæt nissens første besked i en tydelig sætning.",
       "tokens": [
        "Den lille nisse",
        "efterlod",
        "et hemmeligt spor",
        "ved bogreolen."
       ],
       "hint": "Find først grundled og udsagnsled.",
       "why": "I en helsætning fortæller grundled og udsagnsled, hvem der gør noget."
      }
     ],
     "tip": "Læs detaljer omhyggeligt. Et godt gæt skal kunne begrundes med noget i teksten."
    },
    {
     "title": "Låsen med de drilske ord",
     "story": "På en hylde sidder en gammel ordlås. Den åbner kun, hvis bogens titler bliver stavet rigtigt.",
     "goal": "Brug staveregler og betydningsbærende orddele.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilket ord er stavet korrekt?",
       "choices": [
        "fortryllende",
        "fortyllende",
        "fortrylende"
       ],
       "answer": "fortryllende",
       "hint": "Tænk på ordet trylle, og bevar ordets stamme.",
       "why": "Fortryllende er dannet af for- og trylle med endelsen -ende; den dobbelte l bevares."
      },
      {
       "type": "input",
       "prompt": "Skriv navneordet i bestemt flertal: »en nisse – flere nisser – alle …«.",
       "accept": [
        "nisserne"
       ],
       "hint": "Læg mærke til, hvilken endelse der viser, at vi taler om bestemte nisser.",
       "why": "Nisserne er bestemt flertal af nisse."
      },
      {
       "type": "order",
       "prompt": "Sæt sætningen sammen, så ordet får sin rette sammenhæng.",
       "tokens": [
        "Den uforståelige",
        "besked",
        "stod skrevet",
        "på bagsiden."
       ],
       "hint": "Prøv at læse sætningen højt, når du har sat ordene sammen.",
       "why": "Uforståelige beskriver beskeden og står derfor foran navneordet."
      }
     ],
     "tip": "Når du er i tvivl om stavning, så find ordets stamme og undersøg endelsen."
    },
    {
     "title": "Kommaets hemmelige dør",
     "story": "En dør er fuld af sætninger uden tegn. Når tegnene kommer på plads, kan nissen åbne døren.",
     "goal": "Undersøg tegnsætning i replikker og ledsætninger.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken sætning bruger startkomma korrekt?",
       "choices": [
        "Da sneen faldt, blev der stille.",
        "Da, sneen faldt blev der stille.",
        "Da sneen, faldt blev der stille."
       ],
       "answer": "Da sneen faldt, blev der stille.",
       "hint": "Den første del fortæller, hvornår noget sker.",
       "why": "Med startkomma sættes komma efter den indledende ledsætning »Da sneen faldt«."
      },
      {
       "type": "input",
       "prompt": "Hvilket sluttegn skal afslutte dette spørgsmål: »Hvor gemte nissen bogen«? Skriv tegnets navn.",
       "accept": [
        "spørgsmålstegn"
       ],
       "hint": "Det er et direkte spørgsmål.",
       "why": "Et spørgsmålstegn viser, at en sætning er et spørgsmål."
      },
      {
       "type": "order",
       "prompt": "Byg en tydelig sætning med direkte tale.",
       "tokens": [
        "»Jeg fandt nøglen,«",
        "hviskede",
        "den lille nisse."
       ],
       "hint": "Replikken står i anførselstegn. Udsagnsleddet kommer derefter.",
       "why": "Kommaet står før det afsluttende anførselstegn i denne replikform."
      }
     ],
     "tip": "Find først sætningsgrænsen. Tegn hjælper læseren med at forstå meningen."
    },
    {
     "title": "Stemmen i bogens skygge",
     "story": "En stemme siger: »Jeg er slet ikke bange.« Alligevel knuger nissen sin hue, så hans fingre bliver hvide.",
     "goal": "Fortolk handlinger og sproglige virkemidler.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken fortolkning har bedst belæg?",
       "choices": [
        "Nissen er måske bange, selv om han siger noget andet.",
        "Nissen tænker kun på sin hue.",
        "Nissen er helt sikkert meget vred."
       ],
       "answer": "Nissen er måske bange, selv om han siger noget andet.",
       "hint": "Sammenlign replikken med det, nissen gør.",
       "why": "De hvide fingre viser, at han knuger huen hårdt. Det kan være et tegn på frygt."
      },
      {
       "type": "input",
       "prompt": "Hvilket fagord bruges om en sammenligning uden »som«, fx »mørket var et tæppe«?",
       "accept": [
        "metafor",
        "en metafor"
       ],
       "hint": "Det er en slags billedsprog.",
       "why": "En metafor beskriver noget gennem et billede uden at bruge »som«."
      },
      {
       "type": "order",
       "prompt": "Byg en sætning, der viser frygt uden at nævne følelsen.",
       "tokens": [
        "Hans hænder",
        "rystede",
        "ved den tunge",
        "biblioteksdør."
       ],
       "hint": "Vælg en konkret kropslig reaktion.",
       "why": "Sætningen viser følelsen gennem en handling frem for blot at fortælle, at han var bange."
      }
     ],
     "tip": "En fortolkning er stærk, når du både har en idé og kan pege på et tekstbelæg."
    },
    {
     "title": "Bogens sidste kapitel",
     "story": "Bag døren ligger den sidste side af historien. Nu skal du forstå fortællingens opbygning for at finde bogen.",
     "goal": "Genkend fortællingens konflikt, klimaks og tema.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad sker der typisk ved en fortællings klimaks?",
       "choices": [
        "Konflikten når et afgørende højdepunkt.",
        "Fortællingen begynder med en præsentation.",
        "Alle spor bliver introduceret på én gang."
       ],
       "answer": "Konflikten når et afgørende højdepunkt.",
       "hint": "Tænk på det sted, hvor spændingen er stærkest.",
       "why": "Klimaks er det afgørende punkt, hvor konflikten spidser til."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man en større problemstilling som venskab, mod eller ensomhed i en fortælling?",
       "accept": [
        "tema",
        "et tema"
       ],
       "hint": "Det er ikke det samme som et handlingsreferat.",
       "why": "Temaet er fortællingens centrale idé eller problemstilling."
      },
      {
       "type": "order",
       "prompt": "Saml nissens afsluttende besked.",
       "tokens": [
        "Nu kan",
        "alle julehistorierne",
        "finde hjem",
        "til læserne."
       ],
       "hint": "Sæt først tidsordet og udsagnsleddet sammen.",
       "why": "En sammenhængende afslutning samler fortællingens handling."
      }
     ],
     "tip": "Prøv at forklare forskellen på handling og tema med dine egne ord."
    }
   ]
  },
  {
   "id": "brevet",
   "title": "Brevet med det røde segl",
   "tag": "En kode i det gamle posthus",
   "icon": "✉️",
   "color": "red",
   "letter": "BREVE",
   "intro": "En pose med julepost dukker op uden afsender. På hvert brev sidder et rødt segl. Hvis de ikke bliver sorteret, modtager landsbyens beboere aldrig deres julehilsner.",
   "finish": "Brevene er sorteret, og afsenderen er fundet: Det var posthusets gamle julebud, som ville sikre sig, at ingen blev glemt. Nu når julehilsnerne frem.",
   "skills": "Genreforståelse, ordforråd, morfemer, argumentation og kildekritik",
   "scenes": [
    {
     "title": "Brevet på trappen",
     "story": "Et brev ligger i sneen foran posthuset. På forsiden står kun »Til den, der savner nogen«. Der er ingen afsender.",
     "goal": "Forstå afsender, modtager og formål.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken oplysning mangler på brevet?",
       "choices": [
        "Afsenderens navn.",
        "Modtagerens følelse.",
        "Brevets farve."
       ],
       "answer": "Afsenderens navn.",
       "hint": "Tænk på, hvem brevet er fra.",
       "why": "Afsenderen er den person, der har sendt brevet. Her er afsenderen ikke oplyst."
      },
      {
       "type": "input",
       "prompt": "Hvad kaldes den person, der skal læse eller modtage et brev? Skriv ét fagord.",
       "accept": [
        "modtager",
        "modtageren"
       ],
       "hint": "Det er det modsatte af afsender.",
       "why": "Modtageren er den, brevet er skrevet til."
      },
      {
       "type": "order",
       "prompt": "Saml indledningen til en venlig julehilsen.",
       "tokens": [
        "Kære venner,",
        "jeg håber,",
        "I får en",
        "dejlig juleaften."
       ],
       "hint": "Begynd med hilsenen.",
       "why": "Et personligt brev har ofte en indledende hilsen, et budskab og en afslutning."
      }
     ],
     "tip": "Spørg altid: Hvem skriver, til hvem og med hvilket formål?"
    },
    {
     "title": "Koden i konvolutten",
     "story": "Inde i konvolutten ligger ord, som er klippet i stykker. Du må samle betydningen for at finde den næste adresse.",
     "goal": "Brug forstavelser, endelser og ordforråd.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad betyder »misforståelse«?",
       "choices": [
        "Når noget bliver forstået forkert.",
        "Når noget bliver fortalt igen.",
        "Når noget bliver skrevet med store bogstaver."
       ],
       "answer": "Når noget bliver forstået forkert.",
       "hint": "Undersøg betydningen af forstavelsen mis-.",
       "why": "Mis- kan ændre betydningen til, at noget går galt eller bliver forkert."
      },
      {
       "type": "input",
       "prompt": "Hvilket ord er et synonym til »hemmelig« og begynder med s? Skriv ordet.",
       "accept": [
        "skjult"
       ],
       "hint": "Du kan også sige, at noget ikke skal opdages.",
       "why": "Skjult og hemmelig kan bruges om noget, andre ikke må få kendskab til."
      },
      {
       "type": "order",
       "prompt": "Sæt den nye besked sammen.",
       "tokens": [
        "Den skjulte",
        "kode",
        "førte børnene",
        "til posthuset."
       ],
       "hint": "Lad tillægsordet beskrive navneordet kode.",
       "why": "Den skjulte kode er grundled. Førte er udsagnsled."
      }
     ],
     "tip": "Se på ordets dele. Små ændringer kan give et ord en helt ny betydning."
    },
    {
     "title": "Postmesterens samtale",
     "story": "Postmesteren siger, at alle brevene er i orden. Men et barn bemærker, at tre konvolutter har samme mærkelige stempel.",
     "goal": "Brug dialog og tegnsætning til at undersøge en tekst.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken dialog er tegnsat tydeligt?",
       "choices": [
        "»Se på stemplet,« sagde pigen.",
        "»Se på stemplet sagde pigen.«",
        "»Se på stemplet« sagde, pigen."
       ],
       "answer": "»Se på stemplet,« sagde pigen.",
       "hint": "Anførselstegnene skal kun omslutte replikken.",
       "why": "Direkte tale markeres med anførselstegn, og replikken adskilles fra »sagde pigen«."
      },
      {
       "type": "input",
       "prompt": "Hvilken ordklasse tilhører »mærkelige« i »de mærkelige breve«?",
       "accept": [
        "tillægsord",
        "adjektiv"
       ],
       "hint": "Ordet beskriver brevene.",
       "why": "Mærkelige er et tillægsord, fordi det beskriver et navneord."
      },
      {
       "type": "order",
       "prompt": "Byg en beskrivelse med én tydelig helsætning.",
       "tokens": [
        "Postmesteren",
        "undersøgte",
        "de tre breve",
        "meget grundigt."
       ],
       "hint": "Hvem gør noget, og hvad gør personen?",
       "why": "Grundleddet er postmesteren; udsagnsleddet er undersøgte."
      }
     ],
     "tip": "Læs dialogen højt. Hører du, hvor replikken slutter?"
    },
    {
     "title": "Den falske julebesked",
     "story": "En seddel hævder: »Posthuset lukker for altid!« Men der står hverken dato eller navn på den.",
     "goal": "Vurdér kilders troværdighed og skeln mellem påstand og belæg.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad bør børnene gøre først?",
       "choices": [
        "Undersøge, hvem der har skrevet sedlen, og om oplysningen kan bekræftes.",
        "Dele sedlen straks med alle.",
        "Tro på beskeden, fordi den bruger udråbstegn."
       ],
       "answer": "Undersøge, hvem der har skrevet sedlen, og om oplysningen kan bekræftes.",
       "hint": "Kan oplysningerne efterprøves?",
       "why": "En påstand uden tydelig afsender eller dokumentation bør undersøges."
      },
      {
       "type": "input",
       "prompt": "Hvilket fagord betyder det, der understøtter en påstand med oplysninger eller eksempler? Skriv ét ord.",
       "accept": [
        "belæg"
       ],
       "hint": "Det er den dokumentation, man bruger for at begrunde noget.",
       "why": "Belæg er oplysninger, eksempler eller kilder, der støtter en påstand."
      },
      {
       "type": "order",
       "prompt": "Saml en kildekritisk sætning.",
       "tokens": [
        "Vi undersøgte",
        "beskedens afsender,",
        "før vi",
        "delte den."
       ],
       "hint": "Tænk på rækkefølgen: først kontrol, derefter deling.",
       "why": "At kontrollere en afsender før deling er en vigtig kildekritisk handling."
      }
     ],
     "tip": "Kildekritik handler ikke om at tvivle på alt, men om at undersøge, hvad der er belæg for."
    },
    {
     "title": "Seglet brydes",
     "story": "Det sidste brev indeholder en undskyldning til en ven. Det kan kun sendes, hvis teksten er tydelig og venlig.",
     "goal": "Arbejd med argumentation og sprogets virkning på modtageren.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken formulering er mest hensynsfuld?",
       "choices": [
        "Jeg er ked af, at jeg ikke lyttede. Vil du tale med mig?",
        "Du skal tilgive mig med det samme!",
        "Det var bare din egen skyld."
       ],
       "answer": "Jeg er ked af, at jeg ikke lyttede. Vil du tale med mig?",
       "hint": "Tænk på ansvar og respekt for modtageren.",
       "why": "En god undskyldning tager ansvar og giver den anden mulighed for at reagere."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man den person, der skriver brevet?",
       "accept": [
        "afsender",
        "afsenderen"
       ],
       "hint": "Du arbejdede med dette begreb i første mission.",
       "why": "Afsenderen er den, som sender eller skriver beskeden."
      },
      {
       "type": "order",
       "prompt": "Byg den afsluttende julehilsen.",
       "tokens": [
        "Tak, fordi",
        "du læste brevet.",
        "Jeg ønsker dig",
        "en fredelig jul."
       ],
       "hint": "Begynd med en tak, og slut med ønsket.",
       "why": "Hilsenen er personlig, venlig og henvendt til en modtager."
      }
     ],
     "tip": "Når du skriver til andre, betyder både indhold, tone og modtager noget."
    }
   ]
  },
  {
   "id": "klokken",
   "title": "Klokketårnets hemmelighed",
   "tag": "Den tavse klokke ved midnat",
   "icon": "🔔",
   "color": "green",
   "letter": "LYSET",
   "intro": "Klokketårnets juleklokke er frosset fast. Uden dens lyd opdager byen ikke, at juleaftenen er begyndt. Et gammelt ur gemmer på fem litterære gåder.",
   "finish": "Den gamle klokke ringer igen, og lyset fra tårnet breder sig over den snedækkede by. Tårnets hemmelighed var en fortælling om mod og samarbejde.",
   "skills": "Kronologi, sproglige virkemidler, rytme, fortæller og fortolkning",
   "scenes": [
    {
     "title": "Den frosne klokke",
     "story": "Klokken tier. På torvet står folk stille, og sneen daler uden en lyd. Kun en svag knirken kommer fra tårnets dør.",
     "goal": "Find stemningsskabende detaljer i en fortælling.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad skaber især den stille, urolige stemning?",
       "choices": [
        "Kontrasten mellem stilheden og den svage knirken.",
        "At der findes et torv.",
        "At snefnug har seks kanter."
       ],
       "answer": "Kontrasten mellem stilheden og den svage knirken.",
       "hint": "Hvilke lyde bliver nævnt – og hvilke mangler?",
       "why": "Stilhed og en uventet lyd kan få læseren til at mærke spændingen."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man en beskrivelse, der får læseren til at forestille sig lyd, lys eller lugt? Skriv ét fagord.",
       "accept": [
        "sansning",
        "sansebeskrivelse",
        "sanseindtryk"
       ],
       "hint": "Det handler om noget, vi opfatter med sanserne.",
       "why": "En sansebeskrivelse gør en tekst mere levende ved at bruge sansninger."
      },
      {
       "type": "order",
       "prompt": "Byg en sætning med et tydeligt sanseindtryk.",
       "tokens": [
        "Den kolde vind",
        "piskede",
        "gennem tårnets",
        "smalle vinduer."
       ],
       "hint": "Find den handling, som vinden udfører.",
       "why": "Piskede gør vinden nærværende og understøtter den hårde stemning."
      }
     ],
     "tip": "Vis stemning med lyd, lys og handling i stedet for bare at kalde noget spændende."
    },
    {
     "title": "Urets fem minutter",
     "story": "På gulvet ligger fem sider af en dagbog. Siderne er blandet sammen, og tidspunktet på uret giver ikke længere mening.",
     "goal": "Undersøg tidsmarkører og rækkefølge i fortællinger.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilket ord viser tydeligst, at der går tid?",
       "choices": [
        "Bagefter",
        "hemmelig",
        "glitrende"
       ],
       "answer": "Bagefter",
       "hint": "Find et ord, der knytter to hændelser sammen.",
       "why": "Bagefter er en tidsmarkør, som hjælper læseren med at forstå rækkefølgen."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man rækkefølgen af hændelser i en fortælling? Skriv ét fagord.",
       "accept": [
        "kronologi"
       ],
       "hint": "Det handler om tid og forløb.",
       "why": "Kronologi er hændelsernes tidsmæssige rækkefølge."
      },
      {
       "type": "order",
       "prompt": "Sæt hændelserne i den logiske rækkefølge.",
       "tokens": [
        "Først fandt de nøglen.",
        "Derefter låste de døren op.",
        "Til sidst gik de ind."
       ],
       "hint": "Læg mærke til Først, Derefter og Til sidst.",
       "why": "Tidsmarkørerne hjælper med at skabe et tydeligt forløb."
      }
     ],
     "tip": "En tekst bliver lettere at følge, når tidsmarkørerne passer til handlingen."
    },
    {
     "title": "Rim på trappen",
     "story": "Hvert trin har et rim skrevet i isen. Når rytmen er rigtig, tænder en lille lampe i væggen.",
     "goal": "Genkend rim, rytme og billedsprog.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilket ord rimer på »nat«?",
       "choices": [
        "skat",
        "lys",
        "sne"
       ],
       "answer": "skat",
       "hint": "Lyt til den sidste del af ordene.",
       "why": "Nat og skat har samme trykstærke vokal og slutlyd."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man ord, der har samme slutlyd, som »sne« og »se«? Skriv ét ord.",
       "accept": [
        "rim"
       ],
       "hint": "Vi bruger det ofte i digte og remser.",
       "why": "Rim bygger på lydlige ligheder mellem ord."
      },
      {
       "type": "order",
       "prompt": "Sæt en lille vinterlinje sammen.",
       "tokens": [
        "Stjernerne",
        "lyser blidt",
        "over byens",
        "snedækte tage."
       ],
       "hint": "Begynd med det, der lyser.",
       "why": "Ordstillingen giver en flydende, billedskabende sætning."
      }
     ],
     "tip": "Prøv at læse højt. Rim handler om lyd, ikke kun bogstaver."
    },
    {
     "title": "Fortælleren i mørket",
     "story": "En gammel bog fortæller: »Jeg kunne se lys gennem sprækken, men jeg turde ikke åbne døren.«",
     "goal": "Genkend synsvinkel og forklar, hvad fortælleren ved.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken fortællertype bruges i citatet?",
       "choices": [
        "Jegfortæller",
        "Altvidende tredjepersonsfortæller",
        "En fortæller uden personer"
       ],
       "answer": "Jegfortæller",
       "hint": "Se efter et personligt stedord.",
       "why": "Jegfortælleren er selv en del af historien og taler med »jeg«."
      },
      {
       "type": "input",
       "prompt": "Hvilket stedord viser tydeligst, at fortælleren selv deltager? Skriv ordet.",
       "accept": [
        "jeg"
       ],
       "hint": "Det står som det første ord i citatet.",
       "why": "Stedordet »jeg« markerer jegfortællerens synsvinkel."
      },
      {
       "type": "order",
       "prompt": "Omskriv udsagnet til tredjeperson.",
       "tokens": [
        "Hun kunne se lyset,",
        "men hun turde ikke",
        "åbne den gamle dør."
       ],
       "hint": "Brug hun i stedet for jeg.",
       "why": "Tredjepersonsfortælleren omtaler personen med hun, han eller de."
      }
     ],
     "tip": "En fortæller ved ikke nødvendigvis alt. Undersøg, hvad der fortælles, og hvad der holdes skjult."
    },
    {
     "title": "Juleklokkens sidste slag",
     "story": "Børnene finder en håndsvingmekanisme bag klokken. Hjulet kan drejes, men kun hvis de først kan forstå historien om den tapre klokker.",
     "goal": "Forklar konflikt, klimaks og afslutning.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad er konfliktens afgørende punkt i historien?",
       "choices": [
        "Da børnene tør dreje hjulet og opdager, om klokken virker.",
        "Da byen første gang bliver beskrevet.",
        "Da sneen begynder at falde."
       ],
       "answer": "Da børnene tør dreje hjulet og opdager, om klokken virker.",
       "hint": "Find det sted, hvor deres handling afgør udfaldet.",
       "why": "Det afgørende handlingspunkt kan fungere som klimaks i fortællingen."
      },
      {
       "type": "input",
       "prompt": "Hvad kaldes den del af fortællingen, der afrunder handlingen efter klimaks? Skriv fagordet.",
       "accept": [
        "udtoning",
        "afslutning"
       ],
       "hint": "Det er den sidste del af berettermodellen.",
       "why": "Udtoningen afrunder fortællingen og viser følgerne af det afgørende øjeblik."
      },
      {
       "type": "order",
       "prompt": "Sæt tårnets afsluttende sætning sammen.",
       "tokens": [
        "Da klokken ringede,",
        "vågnede byen",
        "under den stille",
        "julenat."
       ],
       "hint": "Lad den indledende ledsætning komme først.",
       "why": "Startkommaet efter »ringede« gør sætningsgrænsen tydelig."
      }
     ],
     "tip": "Klimaks ændrer noget. I en god afslutning kan læseren mærke, hvad der blev anderledes."
    }
   ]
  },
  {
   "id": "gaven",
   "title": "Den glemte julegave",
   "tag": "Et mysterium om den rette modtager",
   "icon": "🎁",
   "color": "gold",
   "letter": "GAVEN",
   "intro": "På skolens trappe står en gave uden navn. Ingen vil tage den, for ingen ved, hvem den er til. Inde i pakken ligger fem små opgaver, der kan føre jer til den rette modtager.",
   "finish": "Pakken var tiltænkt alle, der havde hjulpet hinanden gennem året. Indeni var et brev med tak og en invitation til at dele glæden videre. Den bedste gave var fællesskabet.",
   "skills": "Personkarakteristik, fagtekster, argumentation, empati og fortælleopbygning",
   "scenes": [
    {
     "title": "Pakken i sneen",
     "story": "En elev finder en gave foran skolen. Papiret er vådt, men silkebåndet er pænt bundet. Ved siden af ligger spor af små støvler.",
     "goal": "Udled oplysninger ud fra handling og detaljer.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvad ved vi med sikkerhed?",
       "choices": [
        "Gaven står foran skolen.",
        "Gaven tilhører skolens pedel.",
        "Gaven har ligget der i en uge."
       ],
       "answer": "Gaven står foran skolen.",
       "hint": "Vælg kun det, teksten faktisk fortæller.",
       "why": "Teksten siger direkte, at gaven står foran skolen. Ejeren kender vi ikke."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man et konkret tegn i teksten, der kan støtte en fortolkning? Skriv ét ord.",
       "accept": [
        "spor",
        "tekstspor"
       ],
       "hint": "Tænk på fodaftrykkene i sneen.",
       "why": "Et tekstspor er en detalje, som kan bruges som belæg i en tolkning."
      },
      {
       "type": "order",
       "prompt": "Byg en præcis beskrivelse.",
       "tokens": [
        "Det røde silkebånd",
        "lå snoet",
        "rundt om",
        "den våde pakke."
       ],
       "hint": "Start med det, der ligger rundt om pakken.",
       "why": "Sætningen viser en konkret detalje frem for en vag vurdering."
      }
     ],
     "tip": "Skeln mellem fakta i teksten og noget, du kun kan gætte dig til."
    },
    {
     "title": "Kvitteringen uden pris",
     "story": "Inde i pakken ligger en kvittering uden beløb. Der står: »Én gave. Mange taknemmelige modtagere.«",
     "goal": "Undersøg faktatekst, information og modtager.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken oplysning ville normalt være vigtig på en kvittering?",
       "choices": [
        "Varens pris",
        "En novellefortæller",
        "Et magisk væsen"
       ],
       "answer": "Varens pris",
       "hint": "En kvittering dokumenterer en handel.",
       "why": "Pris og køb er typiske oplysninger på en kvittering."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man en kort tekst, der oplyser om noget virkeligt frem for at fortælle en opdigtet historie?",
       "accept": [
        "fagtekst",
        "sagtekst",
        "informerende tekst"
       ],
       "hint": "Det er en informerende teksttype.",
       "why": "En sagtekst eller fagtekst har som hovedformål at informere."
      },
      {
       "type": "order",
       "prompt": "Saml en faglig sætning om kvitteringen.",
       "tokens": [
        "En kvittering",
        "kan dokumentere",
        "et køb",
        "og dets pris."
       ],
       "hint": "Lad grundleddet komme først.",
       "why": "En kvittering er en sagtekst, der oplyser om et køb."
      }
     ],
     "tip": "Vælg læsestrategi efter tekstens formål. En kvittering læses ikke som en novelle."
    },
    {
     "title": "Hvem fortjener gaven?",
     "story": "Tre elever vil give pakken videre. De er enige om at vælge den person, som har gjort noget godt for andre. Nu skal de begrunde valget.",
     "goal": "Skeln mellem påstand, begrundelse og eksempel.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilken sætning indeholder et tydeligt argument?",
       "choices": [
        "Vi bør give gaven til Amina, fordi hun hjalp hele klassen.",
        "Amina går i skole.",
        "Der ligger en gave på trappen."
       ],
       "answer": "Vi bør give gaven til Amina, fordi hun hjalp hele klassen.",
       "hint": "Et argument skal både have en påstand og en begrundelse.",
       "why": "Sætningen har en påstand og en begrundelse indledt med »fordi«."
      },
      {
       "type": "input",
       "prompt": "Hvad kalder man en oplysning eller et eksempel, der støtter et argument?",
       "accept": [
        "belæg"
       ],
       "hint": "Det er den del, som viser, hvorfor en påstand kan være rimelig.",
       "why": "Belæg gør et argument stærkere ved at støtte det med oplysninger eller eksempler."
      },
      {
       "type": "order",
       "prompt": "Saml et begrundet forslag.",
       "tokens": [
        "Jeg foreslår,",
        "at vi deler gaven,",
        "fordi mange",
        "har hjulpet hinanden."
       ],
       "hint": "Begynd med dit forslag og afslut med begrundelsen.",
       "why": "Sætningen forklarer både valg og årsag, og startkommaet markerer ledsætningerne."
      }
     ],
     "tip": "Et godt argument bliver stærkere, når du forklarer hvorfor og giver et eksempel."
    },
    {
     "title": "Et brev fra giveren",
     "story": "Giveren har skrevet: »Jeg lagde pakken her, fordi den skulle glæde nogen, som ikke forventede det.«",
     "goal": "Fortolk personens hensigt og skriv med en passende tone.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilket motiv passer bedst til giverens ord?",
       "choices": [
        "At overraske og glæde andre.",
        "At vise, hvor dyr pakken er.",
        "At gøre alle elever jaloux."
       ],
       "answer": "At overraske og glæde andre.",
       "hint": "Find formålet i giverens egen forklaring.",
       "why": "Giveren nævner direkte glæde og overraskelse som hensigt."
      },
      {
       "type": "input",
       "prompt": "Hvilket ord betyder evnen til at sætte sig i andres sted? Skriv ét fagord.",
       "accept": [
        "empati"
       ],
       "hint": "Det handler om at forstå andres følelser.",
       "why": "Empati er evnen til at forestille sig og forstå, hvordan andre har det."
      },
      {
       "type": "order",
       "prompt": "Sæt en venlig besked til giveren sammen.",
       "tokens": [
        "Tak for gaven.",
        "Den fik os",
        "til at tænke på",
        "hinandens glæde."
       ],
       "hint": "Begynd med takken.",
       "why": "Den korte besked er venlig og henvender sig til modtageren."
      }
     ],
     "tip": "Vælg ord, der passer til modtageren, og vis i sproget, at du har forstået hensigten."
    },
    {
     "title": "Gaven åbnes",
     "story": "Børnene samler hele klassen. De har besluttet at åbne gaven sammen, men fortællingen mangler stadig sin afslutning.",
     "goal": "Skab en sammenhængende afslutning og find fortællingens tema.",
     "tasks": [
      {
       "type": "choice",
       "prompt": "Hvilket tema passer bedst til historien?",
       "choices": [
        "Fællesskab og omtanke.",
        "Vejret på Nordpolen.",
        "Hvordan man bygger en skole."
       ],
       "answer": "Fællesskab og omtanke.",
       "hint": "Et tema er større end én enkelt handling.",
       "why": "Historien handler om, hvordan mennesker viser omsorg og deler glæde."
      },
      {
       "type": "input",
       "prompt": "Hvilken del af en fortælling afrunder handlingen? Skriv ét ord.",
       "accept": [
        "afslutning",
        "udtoning"
       ],
       "hint": "Den kommer efter det afgørende øjeblik.",
       "why": "Afslutningen eller udtoningen samler fortællingen og viser resultatet."
      },
      {
       "type": "order",
       "prompt": "Saml historiens sidste sætning.",
       "tokens": [
        "Den største gave",
        "var glæden ved",
        "at være noget",
        "for hinanden."
       ],
       "hint": "Lad udsagnet begynde med, hvad den største gave var.",
       "why": "Afslutningen binder handlingen sammen med temaet om fællesskab."
      }
     ],
     "tip": "En god afslutning viser, hvad personerne har lært eller opdaget."
    }
   ]
  }
 ],
 "wordSearch": [
  {
   "title": "Juleord på sporet",
   "size": 11,
   "words": [
    "NISSE",
    "LYS",
    "GAVE",
    "SNE",
    "KANE"
   ],
   "theme": "genkendelse af juleord og præcis bogstavfølge"
  },
  {
   "title": "Ord med julestemning",
   "size": 12,
   "words": [
    "JULETRÆ",
    "KLOKKE",
    "KRYBBE",
    "JULEKORT",
    "KANEL"
   ],
   "theme": "lange sammensatte juleord"
  },
  {
   "title": "Julesprogets orddele",
   "size": 13,
   "words": [
    "JULEAFTEN",
    "JULEPOST",
    "RUDOLF",
    "MISTELTEN",
    "STJERNE",
    "FÆLLESSKAB"
   ],
   "theme": "orddele, morfemer og ordkendskab"
  }
 ],
 "chains": [
  {
   "start": "JUL",
   "goal": 5,
   "words": [
    "LYS",
    "SNE",
    "ENGEL",
    "LANTERNE",
    "EVENTYR",
    "RENSDYR",
    "STJERNE",
    "KLOKKE"
   ],
   "hint": "Et nyt ord skal begynde med det sidste bogstav i det forrige ord."
  },
  {
   "start": "JULETRÆ",
   "goal": 6,
   "words": [
    "ÆBLE",
    "ENGEL",
    "LYS",
    "STJERNE",
    "EVENTYR",
    "RENSDYR",
    "RIM",
    "MISTELTEN",
    "KLØVER"
   ],
   "hint": "Brug sidste bogstav i JULETRÆ til at finde det næste ord."
  },
  {
   "start": "RISENGRØD",
   "goal": 7,
   "words": [
    "DECEMBER",
    "RENSDYR",
    "RIM",
    "MISTELTEN",
    "NISSE",
    "EVENTYR",
    "RØD",
    "DØR",
    "LYS"
   ],
   "hint": "Kæden skal hænge sammen bogstav for bogstav. Tænk på, hvilke ord der kan følge efter hinanden."
  }
 ],
 "sentenceGames": [
  [
   [
    "Først",
    "åbnede nissen",
    "den lille dør.",
    "Bagefter",
    "tændte han lyset."
   ],
   [
    "Den kolde vind",
    "fik",
    "juleklokkerne",
    "til at ringe."
   ],
   [
    "»Hvor er bogen?«",
    "spurgte",
    "den nysgerrige pige."
   ]
  ],
  [
   [
    "Da sneen begyndte,",
    "løb børnene",
    "ind i det varme bibliotek."
   ],
   [
    "Julemanden",
    "havde glemt",
    "det røde brev",
    "på skrivebordet."
   ],
   [
    "»Jeg har fundet den,«",
    "sagde Emil",
    "og løftede nøglen."
   ]
  ],
  [
   [
    "Selv om vinden tog til,",
    "fortsatte de",
    "gennem den mørke skov."
   ],
   [
    "De havde undersøgt sporene,",
    "før de",
    "åbnede den sidste pakke."
   ],
   [
    "»Vi må hjælpe hinanden,«",
    "sagde Maja,",
    "mens klokken ringede."
   ]
  ]
 ],
 "synonyms": [
  [
   {
    "type": "choice",
    "prompt": "Hvilket ord betyder omtrent det samme som »glad« i sætningen »Nissen var glad for gaven«?",
    "choices": [
     "fornøjet",
     "udmattet",
     "mistænksom"
    ],
    "answer": "fornøjet",
    "hint": "Tænk på en positiv følelse.",
    "why": "Fornøjet og glad er synonymer i denne sammenhæng."
   },
   {
    "type": "choice",
    "prompt": "Hvilket ord ligger tættest på betydningen af »kold«?",
    "choices": [
     "iskold",
     "lystig",
     "stille"
    ],
    "answer": "iskold",
    "hint": "Det handler om temperatur.",
    "why": "Iskold er en forstærket grad af kold."
   },
   {
    "type": "choice",
    "prompt": "Hvilket ord kan erstatte »hurtigt« i »Hun gik hurtigt gennem sneen«?",
    "choices": [
     "raskt",
     "langsommere",
     "helt tilfældigt"
    ],
    "answer": "raskt",
    "hint": "Find et ord for højt tempo.",
    "why": "Raskt beskriver en hurtig bevægelse."
   },
   {
    "type": "choice",
    "prompt": "Hvad betyder »hemmeligt« her: »Nissen læste brevet hemmeligt«?",
    "choices": [
     "uden at andre fik det at vide",
     "meget langsomt",
     "med høj stemme"
    ],
    "answer": "uden at andre fik det at vide",
    "hint": "Hvem må vide, hvad nissen gør?",
    "why": "Hemmelighed handler om, at noget holdes skjult for andre."
   }
  ],
  [
   {
    "type": "choice",
    "prompt": "Hvilket ord kan erstatte »anelse« i »Der var en anelse uro«?",
    "choices": [
     "smule",
     "katastrofe",
     "sikkerhed"
    ],
    "answer": "smule",
    "hint": "En anelse er en lille mængde.",
    "why": "En anelse og en smule betyder her omtrent det samme."
   },
   {
    "type": "choice",
    "prompt": "Hvilket ord er nærmest et synonym til »betragte«?",
    "choices": [
     "iagttage",
     "glemme",
     "forstyrre"
    ],
    "answer": "iagttage",
    "hint": "Tænk på at se nøje på noget.",
    "why": "Betragte og iagttage handler begge om at se på noget med opmærksomhed."
   },
   {
    "type": "choice",
    "prompt": "Hvad kan erstatte »varsom« i »Hun åbnede døren varsomt«?",
    "choices": [
     "forsigtigt",
     "højlydt",
     "stædigt"
    ],
    "answer": "forsigtigt",
    "hint": "Ordet handler om måde, ikke hastighed.",
    "why": "Varsomt og forsigtigt betyder her omtrent det samme."
   },
   {
    "type": "choice",
    "prompt": "Hvad betyder »fornemme« i »Han kunne fornemme, at nogen var nær«?",
    "choices": [
     "ane",
     "bevise",
     "glemme"
    ],
    "answer": "ane",
    "hint": "Man ved det ikke sikkert.",
    "why": "At ane eller fornemme noget er ikke det samme som at have sikkert bevis."
   }
  ],
  [
   {
    "type": "choice",
    "prompt": "Hvilket ord ligger nærmest »tvetydig«?",
    "choices": [
     "flertydig",
     "åbenlys",
     "lydløs"
    ],
    "answer": "flertydig",
    "hint": "En besked kan forstås på mere end én måde.",
    "why": "En tvetydig formulering kan have flere mulige betydninger."
   },
   {
    "type": "choice",
    "prompt": "Hvilket ord ligger nærmest »symbolisere«?",
    "choices": [
     "stå for",
     "kopiere",
     "måle"
    ],
    "answer": "stå for",
    "hint": "Et symbol repræsenterer noget andet.",
    "why": "At symbolisere er at stå for eller repræsentere noget."
   },
   {
    "type": "choice",
    "prompt": "Hvad kan »nuanceret« betyde i en vurdering?",
    "choices": [
     "med blik for flere sider",
     "helt sort-hvid",
     "uden forklaring"
    ],
    "answer": "med blik for flere sider",
    "hint": "Tænk på flere perspektiver.",
    "why": "En nuanceret vurdering undersøger flere sider af en sag."
   },
   {
    "type": "choice",
    "prompt": "Hvilket udtryk ligger tættest på »indleve sig i«?",
    "choices": [
     "forestille sig andres oplevelse",
     "ignorere en andens følelser",
     "beslutte på andres vegne"
    ],
    "answer": "forestille sig andres oplevelse",
    "hint": "Det handler om empati.",
    "why": "At indleve sig i nogen er at forsøge at forstå deres oplevelse."
   }
  ]
 ],
 "quizzes": [
  [
   {
    "type": "choice",
    "prompt": "»Koppen var varm, men rummet var tomt.« Hvad kan du udlede?",
    "choices": [
     "Nogen kan netop have været der.",
     "Der bor helt sikkert en nisse i rummet.",
     "Koppen er lavet af keramik."
    ],
    "answer": "Nogen kan netop have været der.",
    "hint": "Brug ordet varm som et tidsligt spor.",
    "why": "En varm kop kan pege på nylig aktivitet, men ikke på hvem."
   },
   {
    "type": "choice",
    "prompt": "Hvilket genretræk passer til et folkeeventyr?",
    "choices": [
     "magiske hjælpere og gentagelser",
     "bilag og litteraturliste",
     "kundeklub og annoncepris"
    ],
    "answer": "magiske hjælpere og gentagelser",
    "hint": "Tænk på klassiske eventyr.",
    "why": "Folkeeventyr bruger ofte gentagelser og magiske elementer."
   },
   {
    "type": "choice",
    "prompt": "Hvad er en hovedperson?",
    "choices": [
     "En central person i fortællingens handling.",
     "En, der kun er med i én sætning.",
     "En person, som altid fortæller historien."
    ],
    "answer": "En central person i fortællingens handling.",
    "hint": "Det handler om personens betydning for handlingen.",
    "why": "Hovedpersonen er central for fortællingens forløb."
   },
   {
    "type": "choice",
    "prompt": "Hvilket ord er et udsagnsord?",
    "choices": [
     "fandt",
     "gave",
     "venlig"
    ],
    "answer": "fandt",
    "hint": "Kan du sætte jeg foran?",
    "why": "Fandt er datid af finde."
   }
  ],
  [
   {
    "type": "choice",
    "prompt": "»Han sagde, at det var fint, men han så ned.« Hvilken tolkning er rimelig?",
    "choices": [
     "Han er måske ikke så tilfreds, som han siger.",
     "Han er helt sikkert syg.",
     "Han har aldrig været glad."
    ],
    "answer": "Han er måske ikke så tilfreds, som han siger.",
    "hint": "Se på forholdet mellem ord og kropssprog.",
    "why": "Når ord og handling ikke stemmer, kan læseren fortolke en skjult følelse."
   },
   {
    "type": "choice",
    "prompt": "Hvorfor kan en forfatter bruge korte sætninger under en jagt?",
    "choices": [
     "For at øge tempoet.",
     "For at fjerne alle personer.",
     "For at gøre fortællingen til en fagtekst."
    ],
    "answer": "For at øge tempoet.",
    "hint": "Hvordan føles rytmen, når man læser hurtigt?",
    "why": "Korte sætninger kan øge tekstens tempo."
   },
   {
    "type": "choice",
    "prompt": "Hvad er forskellen på en påstand og et belæg?",
    "choices": [
     "Belæg støtter en påstand med oplysninger.",
     "En påstand har altid flere kommaer.",
     "Belæg er altid en personlig mening."
    ],
    "answer": "Belæg støtter en påstand med oplysninger.",
    "hint": "Tænk på begrundelser.",
    "why": "Belæg er konkrete oplysninger eller eksempler, der støtter en påstand."
   },
   {
    "type": "choice",
    "prompt": "Hvilket tegn afslutter et direkte spørgsmål?",
    "choices": [
     "spørgsmålstegn",
     "komma",
     "kolon"
    ],
    "answer": "spørgsmålstegn",
    "hint": "Tænk på sætningsformål.",
    "why": "Direkte spørgsmål markeres med spørgsmålstegn."
   }
  ],
  [
   {
    "type": "choice",
    "prompt": "Hvad er en metafor?",
    "choices": [
     "Et billede i sproget uden »som«.",
     "Et afsnit med kildeangivelser.",
     "Et tegn for direkte tale."
    ],
    "answer": "Et billede i sproget uden »som«.",
    "hint": "»Mørket var et tæppe« er et eksempel.",
    "why": "En metafor bruger billedsprog uden sammenligningsordet »som«."
   },
   {
    "type": "choice",
    "prompt": "Hvilken kilde er mest egnet til at undersøge et konkret udgivelsesår?",
    "choices": [
     "Forlagets oplysninger om bogens udgivelse.",
     "En tilfældig kommentar uden afsender.",
     "En reklame, der nævner en helt anden bog."
    ],
    "answer": "Forlagets oplysninger om bogens udgivelse.",
    "hint": "Kan man efterprøve oplysningen hos afsenderen?",
    "why": "En udgivelsesoplysning fra forlaget er normalt lettere at kontrollere."
   },
   {
    "type": "choice",
    "prompt": "Hvad er et tema i en historie?",
    "choices": [
     "En central problemstilling som venskab eller mod.",
     "Alle karakterernes navne.",
     "Kun den første hændelse."
    ],
    "answer": "En central problemstilling som venskab eller mod.",
    "hint": "Tema er større end selve handlingsreferatet.",
    "why": "Temaet er en større idé eller problemstilling i fortællingen."
   },
   {
    "type": "choice",
    "prompt": "Hvad kendetegner en god fortolkning?",
    "choices": [
     "En påstand med tydelige tekstbelæg.",
     "Et gæt uden spor.",
     "En genfortælling uden forklaring."
    ],
    "answer": "En påstand med tydelige tekstbelæg.",
    "hint": "Vis hvor i teksten du har fundet spor.",
    "why": "Fortolkninger kan begrundes med citater og detaljer fra teksten."
   }
  ]
 ],
 "workshops": {
  "story": {
   "id": "story",
   "title": "Julehistoriens værksted",
   "description": "Skriv en original fortælling med anslag, konflikt, stemning og afslutning. Arbejd som en forfatter: planlæg, skriv og revidér.",
   "steps": [
    {
     "title": "1 · Planlæg din fortælling",
     "prompt": "Vælg en hovedperson, et sted og et problem. Hvad ønsker hovedpersonen sig, og hvad står i vejen?",
     "fields": [
      [
       "Hovedperson",
       "Hvem handler historien om?"
      ],
      [
       "Miljø",
       "Hvor og hvornår foregår historien?"
      ],
      [
       "Konflikt",
       "Hvad går galt eller skal løses?"
      ]
     ]
    },
    {
     "title": "2 · Skriv julehistorien",
     "prompt": "Skriv en fortælling på cirka 150–300 ord. Start med noget, der vækker nysgerrighed, og lad hovedpersonen træffe et vigtigt valg.",
     "fields": [
      [
       "Fortælling",
       "Skriv din julehistorie her. Brug afsnit og dialog, når det passer."
      ]
     ]
    },
    {
     "title": "3 · Gennemlæs og forbedr",
     "prompt": "Læs historien højt for dig selv. Ret mindst to steder, så handlingen, sproget eller tegnsætningen bliver tydeligere.",
     "fields": [
      [
       "Det har jeg forbedret",
       "Skriv kort, hvilke steder du har ændret, og hvorfor."
      ]
     ]
    }
   ],
   "check": [
    "Min fortælling har et tydeligt anslag og en konflikt.",
    "Jeg viser følelser gennem handling eller sanser.",
    "Jeg har valgt en fortæller og holder synsvinklen tydelig.",
    "Jeg har brugt afsnit og tegn, så teksten er let at læse.",
    "Jeg har forbedret mindst to formuleringer."
   ],
   "tip": "En god julehistorie er ikke nødvendigvis sukkersød. Overrask læseren med et valg, et problem eller et vendepunkt."
  },
  "wish": {
   "id": "wish",
   "title": "Ønskeseddel-værksted",
   "description": "Skriv en personlig, velbegrundet og venlig ønskeseddel. Skeln mellem ønsker og behov, og tænk over modtageren.",
   "steps": [
    {
     "title": "1 · Tænk over dine ønsker",
     "prompt": "Skriv tre ønsker. Vælg mindst ét, der ikke kan købes for penge, for eksempel tid, hjælp eller en oplevelse.",
     "fields": [
      [
       "Tre ønsker",
       "1.\n2.\n3."
      ],
      [
       "Det betyder mest for mig",
       "Forklar kort hvorfor."
      ]
     ]
    },
    {
     "title": "2 · Formulér din ønskeseddel",
     "prompt": "Skriv en venlig hilsen og en tydelig ønskeseddel. Begrund dit vigtigste ønske med et eksempel eller en forklaring.",
     "fields": [
      [
       "Min ønskeseddel",
       "Kære …\nJeg ønsker mig …\n…\nKærlig hilsen …"
      ]
     ]
    },
    {
     "title": "3 · Tilpas til modtageren",
     "prompt": "Gennemgå din tekst. Er tonen venlig? Fremgår det, at ønsker ikke er krav? Er stave- og tegnsætningen forståelig?",
     "fields": [
      [
       "Det har jeg ændret",
       "Hvilken formulering forbedrede du?"
      ]
     ]
    }
   ],
   "check": [
    "Jeg har en venlig indledning og afslutning.",
    "Jeg har skrevet tydelige ønsker, som modtageren kan forstå.",
    "Jeg har begrundet mindst ét af mine ønsker.",
    "Jeg viser, at et ønske ikke er et krav.",
    "Jeg har læst korrektur på stavning og tegn."
   ],
   "tip": "En ønskeseddel er også en tekst til en modtager. Vælg en venlig tone, og tænk over, hvad der faktisk betyder noget for dig."
  }
 },
 "faq": "Alt indhold er selvstændigt skrevet til dansk i 5. klasse. Opgaverne arbejder med læsning, fremstilling, fortolkning og kommunikation."
};
