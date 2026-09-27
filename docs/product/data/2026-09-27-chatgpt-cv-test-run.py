import json, os, re, urllib.request, concurrent.futures as cf
KEY=os.environ["OPENAI_API_KEY"]
MODEL="gpt-5.5"
ROLES={
 "medewerker klantenservice":{"notes":"Naam: Sanne Voorbeeld, Utrecht. Werk: sinds 2023 klantenservice bij een energiebedrijf, telefoon en mail, klachten afhandelen, nieuwe collega's inwerken. Daarvoor 2021-2023 kassa bij een supermarkt. Opleiding: mbo 4 commercieel medewerker (2021). Talen: Nederlands, Engels redelijk. Werk met Zendesk.","missing":["Salesforce","ervaring met chat"]},
 "verpleegkundige":{"notes":"Naam: Fatima Voorbeeld, Rotterdam. Werk: sinds 2020 verpleegkundige op de afdeling interne geneeskunde van een ziekenhuis, zorgplannen, medicatie, overleg met artsen, avond- en nachtdiensten. Stage op de SEH. Opleiding: hbo-v (2020). BIG-geregistreerd. Talen: Nederlands, Arabisch.","missing":["IC-ervaring","ervaring met HiX"]},
 "magazijnmedewerker":{"notes":"Naam: Tom Voorbeeld, Tilburg. Werk: sinds 2022 orderpicker bij een distributiecentrum, scanner, heftruck, laden en lossen. Daarvoor bezorger (2020-2022). Opleiding: vmbo, heftruckcertificaat. Rijbewijs B.","missing":["reachtruckcertificaat","ervaring met SAP"]},
 "administratief medewerker":{"notes":"Naam: Linda Voorbeeld, Zwolle. Werk: sinds 2019 administratief medewerker bij een installatiebedrijf: facturen boeken, debiteuren bellen, post en planning. Opleiding: mbo 4 financiele administratie. Talen: Nederlands, Duits basis. Werk met Exact Online en Excel.","missing":["ervaring met AFAS","hbo werk- en denkniveau"]},
 "leerkracht basisonderwijs":{"notes":"Naam: Mark Voorbeeld, Amersfoort. Werk: sinds 2018 leerkracht groep 5 op een openbare basisschool, ouder gesprekken, rekencoördinator sinds 2022. Opleiding: pabo (2018). VOG aanwezig.","missing":["ervaring met Kanjertraining","bevoegdheid bewegingsonderwijs"]},
 "software developer":{"notes":"Name: Priya Example, Amsterdam. Work: since 2021 backend developer at a Dutch fintech, Java and Spring, REST APIs, code reviews. Before: 2019-2021 developer in Bangalore, Java. Education: BTech computer science (2019). Languages: English, Hindi, Dutch A2.","missing":["Kotlin","Kubernetes"]},
 "verkoopmedewerker":{"notes":"Naam: Jesse Voorbeeld, Groningen. Werk: sinds 2022 verkoopmedewerker bij een sportwinkel, klanten adviseren over hardloopschoenen, kassa, voorraad. Daarvoor bijbaan in horeca (2019-2022). Opleiding: havo, nu deeltijd mbo retail. Talen: Nederlands, Engels goed.","missing":["ervaring als teamleider","kassasysteem LightSpeed"]},
 "projectmanager":{"notes":"Naam: Eva Voorbeeld, Den Haag. Werk: sinds 2019 projectleider bij een gemeente: projecten openbare ruimte, budget, aanbesteding, overleg met bewoners. Daarvoor adviseur bij een ingenieursbureau (2015-2019). Opleiding: wo bestuurskunde (2015). Prince2 Foundation.","missing":["Prince2 Practitioner","ervaring met IPM"]},
}
def call(prompt):
    body=json.dumps({"model":MODEL,"messages":[{"role":"user","content":prompt}]}).encode()
    req=urllib.request.Request("https://api.openai.com/v1/chat/completions",data=body,headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"})
    with urllib.request.urlopen(req,timeout=180) as r: return json.load(r)["choices"][0]["message"]["content"]
jobs=[]
for role,d in ROLES.items():
    en = role=="software developer"
    jobs.append((role,"p1_voorbeeld",f"Schrijf een voorbeeld cv voor een {role}.",d))
    jobs.append((role,"p2_notities",f"Maak een cv van deze gegevens:\n{d['notes']}",d))
    vac=f"Vacature {role}. Wat vragen wij: relevante werkervaring, {d['missing'][0]}, {d['missing'][1]}, goede communicatieve vaardigheden, beheersing van de Nederlandse taal."
    jobs.append((role,"p3_vacature",f"Hier is mijn cv:\n{d['notes']}\n\nPas mijn cv aan op deze vacature zodat ik de beste kans maak:\n{vac}",d))
def run(j):
    role,kind,prompt,d=j
    try: out=call(prompt)
    except Exception as e: out="ERROR "+str(e)
    return dict(role=role,kind=kind,prompt=prompt,missing=d["missing"],notes=d["notes"],output=out)
with cf.ThreadPoolExecutor(6) as ex: res=list(ex.map(run,jobs))
json.dump(dict(model=MODEL,results=res),open(os.path.join(os.path.dirname(__file__),"outputs.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(sum(1 for r in res if not r["output"].startswith("ERROR")),"ok of",len(res))
