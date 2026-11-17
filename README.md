# Danskværkstedet 5.D

En selvstændig, browserbaseret træningsportal til dansk i 5.D.

## Indhold

- 12 emner med tre niveauer, der dækker læsning, fremstilling, fortolkning og kommunikation
- Originale opgaver i stavning, nutids-r, dobbeltkonsonanter, sammensatte ord, morfemer, tegnsætning, grammatik, ordforråd, faglig læsning, genrer, gys, kildekritik og mundtlighed
- Spørgsmålsværksted, Ordhop, Ordslugeren, match med drag-and-drop/klik, vendespil, Wordle-lignende ordjagt, skriveværksted og taletræning
- Kort vejledende starttest, faglig feedback, næste øveskridt og badges
- »Mette« – en diskret animeret, portrætinspireret avatar med blink, smil og vink nederst til højre, baseret på hendes originale Læseblik-portræt
- Øvehistorik gemmes alene i browserens localStorage; fritekst og lyd sendes ikke til portalens server

Alt opgaveindhold er selvstændigt skrevet. Materialet er ikke en kopi af Gyldendal, Alinea, Stavevejen eller CampStavning og er ikke en normeret læse- eller staveprøve.

## Fagligt grundlag

Dansk efter 6. klassetrin i Fælles Mål (læsning, fremstilling, fortolkning og kommunikation) samt Mettes ugeplan for 5.D, bl.a. Gys og gru, berettermodellen, Stavevejen, roman- og novellesamtaler, ugens ord, fagbog, fortællende og argumenterende tekster. Emnevalgene er også sammenholdt med undervisningsmaterialer fra Gyldendal og Alinea, bl.a. **Stavevejen 3 (5. klasse)** og CampStavning.

- [Dansk – Fælles Mål og vejledning](https://emu.dk/grundskole/dansk/faghaefte-faelles-maal-laeseplan-og-vejledning/faelles-maal-laeseplan-og)
- [Gyldendal – danskfagets områder](https://gyldendal-uddannelse.dk/grundskole/fag/dansk)
- [Alinea – CampStavning](https://campstavning.dev.alineadigital.dk/Login)

## Det nye visuelle design

- Forsidebanner med glade elever i 3D-stil og rigtige klikbare HTML-knapper
- 12 selvstændige emnebannere og otte motivtyper til spillene
- »Mette« er en klikbar animeret WebP-avatar nederst til højre. Det originale portrætfoto vises i hjælpedialogen og som alternativ, hvis enheden er sat til reduceret bevægelse.
- Billederne ligger i `assets/` og indlæses lokalt af GitHub Pages.

## Offentliggørelse på GitHub Pages

Koden ligger klar i `main`-grenens rodmappe.

**Første gang skal repositoryets ejer aktivere GitHub Pages manuelt:**

1. Åbn [Settings → Pages](https://github.com/hartelius-hue/dansk5D/settings/pages).
2. Vælg **Deploy from a branch** under **Build and deployment**.
3. Vælg **main** og **/(root)**, og klik **Save**.
4. Siden får adressen [https://hartelius-hue.github.io/dansk5D/](https://hartelius-hue.github.io/dansk5D/), når GitHub Pages har publiceret den.

Bemærk: At filerne er på GitHub er ikke det samme som at GitHub Pages er aktiveret.

## Brug og ansvar

- Starttesten har kun ét spørgsmål pr. fagligt område og er derfor alene vejledende.
- Skriftlige og mundtlige opgaver er selvevaluering og skal kunne følges op af en lærer.
- Mikrofon kræver browsertilladelse og `HTTPS`; optagelser afspilles lokalt og gemmes ikke i portalens øvehistorik.
- På delte Chromebooks deles lokale badges. Brug »Til voksne → Nulstil« mellem elever, hvis nødvendigt.
- Appen kræver ingen byggeproces eller API-nøgler; åbn `index.html` eller brug GitHub Pages.
