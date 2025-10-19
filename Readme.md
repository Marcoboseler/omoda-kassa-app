Omoda kassa app assesment

Hieronder de simpele stappen om de app op te starten;

1. Start Docker Desktop (Ik ga er van uit dat jullie hier bekend mee zijn ^^)
2. Open een terminal en navigeer naar de root folder van dit project
3. Draai de commando "docker-compose up --build"
4. Open localhost:3000 in je browser.

Eenmaal in de app, zie je 3 input velden;
Voer een totaalprijs in, en een hoeveelheid gegeven cash. De "Get cash change" knop maakt dan een request naar de server om
het wisselgeld op te halen, en deze wordt dan getoond.

De docker-compose in de root bevat een image voor de front- en backend, en daarnaast ook nog voor een postgres database,
maar ik ben er qua tijd niet meer aan toegekomen om deze te benutten.
