import json, os, urllib.request, concurrent.futures as cf
src=open(os.path.join(os.path.dirname(__file__),"run.py"),encoding="utf-8").read().split("jobs=[]")[0]
exec(src)  # ROLES, call(), MODEL
COMPANY={
 "medewerker klantenservice":("Voorbeeld Energie","een energieleverancier in Utrecht met 400 medewerkers. Je helpt klanten via telefoon, mail en chat."),
 "verpleegkundige":("Ziekenhuis Voorbeeldstad","een algemeen ziekenhuis in Rotterdam. Je werkt op de afdeling Chirurgie in een team van 30 collega's."),
 "magazijnmedewerker":("Voorbeeld Logistiek","een distributiecentrum in Tilburg voor supermarkten. Je werkt in wisseldiensten."),
 "administratief medewerker":("Voorbeeld Installatietechniek","een installatiebedrijf in Zwolle met 80 medewerkers."),
 "leerkracht basisonderwijs":("Basisschool De Voorbeeldhoek","een openbare basisschool in Amersfoort met 300 leerlingen."),
 "software developer":("Voorbeeld Payments","een fintech-bedrijf in Amsterdam met 150 medewerkers. Het team bouwt betaal-API's."),
 "verkoopmedewerker":("Voorbeeld Sport","een sportwinkel met 12 filialen in Noord-Nederland."),
 "projectmanager":("Gemeente Voorbeeldstad","een middelgrote gemeente. Je leidt projecten in de openbare ruimte."),
}
RULES="""Regels:
- Gebruik alleen feiten uit mijn cv en de vacature. Verzin niets over mij of over de organisatie, zoals waarden, prijzen of projecten die niet in de vacature staan.
- Claim geen eisen uit de vacature die niet in mijn cv staan. Noem die alleen onder de vragen na de brief.
- Maximaal 250 woorden, in de ik-vorm, zonder standaardopening als 'Hierbij solliciteer ik'. Begin met waarom deze functie bij mij past.
- Schrijf platte tekst: geen opmaaktekens zoals ** of #, en geen invulvelden zoals [datum] of [naam]. Laat onbekende gegevens gewoon weg.
- Zet geen uitleg, tips of alternatieven in de brief. Begin direct met de aanhef.
- Zet na de brief een regel met ---EINDE BRIEF--- en daaronder maximaal 3 vragen over informatie die ontbreekt."""
jobs=[]
for role,d in ROLES.items():
    co,desc=COMPANY[role]
    vac=f"Vacature: {role} bij {co}, {desc} Wat vragen wij: relevante werkervaring, {d['missing'][0]}, {d['missing'][1]}, goede communicatieve vaardigheden. Reageren kan tot 15 oktober."
    jobs+=[(role,"l1_zonder_gegevens",f"Schrijf een motivatiebrief voor de functie {role} bij {co}.",d,vac,co),
           (role,"l2_cv_vacature",f"Schrijf een sollicitatiebrief op basis van mijn cv en deze vacature.\n\nMijn cv:\n{d['notes']}\n\n{vac}",d,vac,co),
           (role,"o2_regels",f"Schrijf een sollicitatiebrief op basis van mijn cv en de vacature hieronder.\n{RULES}\n\nMijn cv:\n{d['notes']}\n\n{vac}",d,vac,co)]
def run(j):
    role,kind,prompt,d,vac,co=j
    try: out=call(prompt)
    except Exception as e: out="ERROR "+str(e)
    return dict(role=role,kind=kind,company=co,vacancy=vac,prompt=prompt,missing=d["missing"],notes=d["notes"],output=out)
with cf.ThreadPoolExecutor(8) as ex: res=list(ex.map(run,jobs))
json.dump(dict(model=MODEL,date="2026-09-27",rules=RULES,results=res),open(os.path.join(os.path.dirname(__file__),"outputs_letters.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(sum(1 for r in res if not r["output"].startswith("ERROR")),"ok of",len(res))
