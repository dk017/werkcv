import json, os, re, urllib.request, concurrent.futures as cf
KEY=os.environ["OPENAI_API_KEY"]
MODEL="gpt-5.5"
ROLES={
 "customer service representative":{"notes":"Name: Sam Example, Amsterdam. Since 2023 customer service at a Dutch energy company, phone and email, handling complaints, onboarding new colleagues. 2021-2023 cashier at a supermarket in Lisbon. Education: vocational diploma in sales (2021). Languages: Portuguese, English, Dutch beginner. Tools: Zendesk.","missing":["Salesforce","live chat experience"]},
 "nurse":{"notes":"Name: Aisha Example, Rotterdam. 2018-2024 registered nurse on an internal medicine ward in Cairo; care plans, medication, night shifts. Since 2024 care assistant at a Dutch nursing home while BIG registration is in progress. Education: Bachelor of Nursing (2018). Languages: Arabic, English, Dutch B1.","missing":["BIG registration","experience with HiX"]},
 "warehouse operative":{"notes":"Name: Piotr Example, Venlo. Since 2022 order picker at a distribution centre: handheld scanner, forklift, loading and unloading. 2019-2022 delivery driver in Poland. Forklift certificate. Driving licence B. Languages: Polish, English basic.","missing":["reach truck certificate","SAP experience"]},
 "administrative assistant":{"notes":"Name: Lena Example, Utrecht. Since 2020 office assistant at an installation company: booking invoices, calling debtors, post and planning. Education: vocational diploma in finance administration (Germany). Languages: German, English, Dutch A2. Tools: Exact Online, Excel.","missing":["AFAS","Dutch at B2 level"]},
 "primary school teacher":{"notes":"Name: Mark Example, The Hague. Since 2019 teacher Year 4 at an international school; parent meetings, maths coordinator since 2022. Education: PGCE (2019), UK. Languages: English, Dutch A2. Certificate of good conduct (VOG).","missing":["Dutch teaching qualification","Kanjertraining"]},
 "software developer":{"notes":"Name: Priya Example, Amsterdam. Since 2021 backend developer at a Dutch fintech, Java and Spring, REST APIs, code reviews. 2019-2021 developer in Bangalore, Java. Education: BTech computer science (2019). Languages: English, Hindi, Dutch A2.","missing":["Kotlin","Kubernetes"]},
 "sales assistant":{"notes":"Name: Jesse Example, Groningen. Since 2022 sales assistant at a sports shop, advising customers on running shoes, till, stock. 2019-2022 part-time in hospitality. Education: secondary school, now part-time retail course. Languages: English, Spanish, Dutch B1.","missing":["team leader experience","LightSpeed POS"]},
 "project manager":{"notes":"Name: Eva Example, Eindhoven. Since 2019 project lead at an engineering firm: infrastructure projects, budget, tenders, stakeholder meetings. 2015-2019 consultant in Madrid. Education: MSc civil engineering (2015). PRINCE2 Foundation. Languages: Spanish, English, Dutch B2.","missing":["PRINCE2 Practitioner","IPM experience"]},
}
RULES="""Rules:
- Use only facts from my details. Do not add personality traits, skills, software, numbers or results that are not in them.
- Write plain text: no formatting symbols such as ** or #, and no placeholders such as [phone number]. Leave unknown details out.
- Use the headings Profile, Work experience, Education, Skills and Languages, most recent job first.
- Give every language as native or with a CEFR level (A1 to C2).
- Do not put explanations, tips or alternatives in the CV. Start directly with the CV.
- After the CV, add a line ---END OF CV--- and below it at most 3 questions about missing information."""
def call(prompt):
    body=json.dumps({"model":MODEL,"messages":[{"role":"user","content":prompt}]}).encode()
    req=urllib.request.Request("https://api.openai.com/v1/chat/completions",data=body,headers={"Authorization":"Bearer "+KEY,"Content-Type":"application/json"})
    with urllib.request.urlopen(req,timeout=180) as r: return json.load(r)["choices"][0]["message"]["content"]
jobs=[]
for role,d in ROLES.items():
    vac=f"Vacancy: {role}, Netherlands. Requirements: relevant work experience, {d['missing'][0]}, {d['missing'][1]}, good communication skills, good command of Dutch."
    jobs+=[(role,"p1_example",f"Write a CV for a {role} in the Netherlands.",d),
           (role,"p2_notes",f"Create a CV from these details:\n{d['notes']}",d),
           (role,"p3_tailor",f"Here is my CV:\n{d['notes']}\n\nTailor my CV to this job so I have the best chance:\n{vac}",d),
           (role,"o2_notes",f"Create a CV in English from my details for jobs in the Netherlands.\n{RULES}\n\nMy details:\n{d['notes']}",d),
           (role,"o3_tailor",f"Tailor my CV to the job below. Emphasise what I already have that the job asks for.\n{RULES}\n- Do not add anything from the job ad as experience if it is not in my CV. Mention missing requirements only in the questions after the CV.\n\nMy CV:\n{d['notes']}\n\nJob ad:\n{vac}",d)]
def run(j):
    role,kind,prompt,d=j
    try: out=call(prompt)
    except Exception as e: out="ERROR "+str(e)
    return dict(role=role,kind=kind,prompt=prompt,missing=d["missing"],notes=d["notes"],output=out)
with cf.ThreadPoolExecutor(8) as ex: res=list(ex.map(run,jobs))
json.dump(dict(model=MODEL,date="2026-09-27",rules=RULES,results=res),open(os.path.join(os.path.dirname(__file__),"outputs_en.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(sum(1 for r in res if not r["output"].startswith("ERROR")),"ok of",len(res))
