import json, os, re, urllib.request, concurrent.futures as cf, importlib.util
spec=importlib.util.spec_from_file_location("base", os.path.join(os.path.dirname(__file__),"run.py"))
src=open(os.path.join(os.path.dirname(__file__),"run.py"),encoding="utf-8").read().split("jobs=[]")[0]
exec(src)
RULES="""Regels:
- Gebruik alleen feiten uit mijn gegevens. Voeg geen eigenschappen, vaardigheden, programma's, cijfers of resultaten toe die er niet in staan.
- Schrijf platte tekst: geen opmaaktekens zoals ** of #, en geen invulvelden zoals [telefoonnummer]. Laat onbekende gegevens gewoon weg.
- Gebruik de kopjes Profiel, Werkervaring, Opleiding, Vaardigheden en Talen, met de nieuwste functie bovenaan.
- Noteer elke taal als moedertaal of met een ERK-niveau (A1 t/m C2).
- Zet geen uitleg, tips of alternatieven in het cv. Begin direct met het cv.
- Zet na het cv een regel met ---EINDE CV--- en daaronder maximaal 3 vragen over informatie die ontbreekt."""
jobs=[]
for role,d in ROLES.items():
    jobs.append((role,"o2_notities",f"Maak een Nederlands cv van mijn gegevens.\n{RULES}\n\nMijn gegevens:\n{d['notes']}",d))
    vac=f"Vacature {role}. Wat vragen wij: relevante werkervaring, {d['missing'][0]}, {d['missing'][1]}, goede communicatieve vaardigheden, beheersing van de Nederlandse taal."
    jobs.append((role,"o3_vacature",f"Pas mijn cv aan op de vacature hieronder. Leg de nadruk op wat ik al heb dat de vacature vraagt.\n{RULES}\n- Neem niets uit de vacature over als ervaring als het niet in mijn cv staat. Noem ontbrekende eisen alleen onder de vragen na het cv.\n\nMijn cv:\n{d['notes']}\n\nVacature:\n{vac}",d))
def run(j):
    role,kind,prompt,d=j
    try: out=call(prompt)
    except Exception as e: out="ERROR "+str(e)
    return dict(role=role,kind=kind,prompt=prompt,missing=d["missing"],notes=d["notes"],output=out)
with cf.ThreadPoolExecutor(6) as ex: res=list(ex.map(run,jobs))
json.dump(dict(model=MODEL,rules=RULES,results=res),open(os.path.join(os.path.dirname(__file__),"outputs_ours.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(sum(1 for r in res if not r["output"].startswith("ERROR")),"ok of",len(res))
