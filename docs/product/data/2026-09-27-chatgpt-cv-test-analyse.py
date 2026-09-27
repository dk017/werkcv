import json, re, os, collections
d=json.load(open(os.path.join(os.path.dirname(__file__),"outputs.json"),encoding="utf-8"))
R=d["results"]
def flags(r):
    o=r["output"]; low=o.lower(); f={}
    f["placeholders"]=re.findall(r"\[[^\]\n]{2,40}\]|\bX{2,}\b|\bxx\b|\b0?6-?\s?X+|jouw ?naam|bedrijfsnaam|naam werkgever|\{[^}]{2,30}\}",o,re.I)[:5]
    f["chat_framing"]=bool(re.search(r"^(natuurlijk|zeker|hier is|hieronder|graag)|wil je dat ik|laat (het )?me weten|succes met|tip:|let op:",low,re.M))
    f["markdown"]=bool(re.search(r"\*\*|^#{1,4} |^---$",o,re.M))
    src=(r["notes"] if r["kind"]!="p1_voorbeeld" else "")
    nums_out=set(re.findall(r"\d+(?:[.,]\d+)?\s?%|\b\d{2,}\+?\b(?!\s?-\s?\d)",o))
    nums_in=set(re.findall(r"\d+(?:[.,]\d+)?\s?%|\b\d{2,}\b",src))
    years=lambda s:{n for n in s if re.fullmatch(r"(19|20)\d\d",n.strip())}
    f["new_numbers"]=sorted(n for n in nums_out if n not in nums_in and n not in years(nums_out))[:8] if r["kind"]!="p1_voorbeeld" else []
    f["percent_claims"]=len(re.findall(r"\d+\s?%",o))
    if r["kind"]=="p3_vacature":
        f["missing_claimed"]=[m for m in r["missing"] if m.split()[-1].lower() in low]
    f["cefr"]=bool(re.search(r"\b[ABC][12]\b|moedertaal|native",o))
    f["english_headers"]=re.findall(r"^\W*(summary|skills|work experience|experience|education|profile|references|resume|core competencies|key skills)\W*$",o,re.I|re.M)[:4] if r["role"]!="software developer" else []
    f["references_line"]=bool(re.search(r"referenties (zijn )?op (aan)?vraag|references available",low))
    f["personal_fields"]=re.findall(r"geboortedatum|geboorteplaats|nationaliteit|burgerlijke staat|rijbewijs",low)
    f["words"]=len(o.split())
    f["ik_vorm"]=len(re.findall(r"\bik\b",low))
    return f
rows=[]
for r in R:
    f=flags(r); rows.append((r,f))
    print(f"{r['role'][:18]:18} {r['kind']:13} w={f['words']:4} ph={len(f['placeholders'])} chat={int(f['chat_framing'])} md={int(f['markdown'])} %={f['percent_claims']} new#={f['new_numbers'][:5]} miss={f.get('missing_claimed','')} cefr={int(f['cefr'])} refs={int(f['references_line'])} pers={sorted(set(f['personal_fields']))}")
agg=collections.Counter()
for r,f in rows:
    k=r["kind"]
    agg[(k,"n")]+=1
    agg[(k,"placeholders")]+=bool(f["placeholders"]); agg[(k,"chat")]+=f["chat_framing"]; agg[(k,"md")]+=f["markdown"]; agg[(k,"pct")]+=f["percent_claims"]>0
    agg[(k,"new_numbers")]+=bool(f["new_numbers"]); agg[(k,"cefr")]+=f["cefr"]; agg[(k,"refs")]+=f["references_line"]
    agg[(k,"missing_claimed")]+=bool(f.get("missing_claimed"))
print(); 
for k in ["p1_voorbeeld","p2_notities","p3_vacature"]:
    print(k, {m:agg[(k,m)] for m in ["n","placeholders","chat","md","pct","new_numbers","missing_claimed","cefr","refs"]})
