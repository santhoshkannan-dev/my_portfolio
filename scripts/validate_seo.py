import json
import re
import xml.etree.ElementTree as ET

print("=== 1. Validating index.html JSON-LD ===")
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

m = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
if not m:
    print("ERROR: JSON-LD script tag not found!")
else:
    try:
        ld = json.loads(m.group(1))
        print("PASS: JSON-LD is valid JSON.")
        print("Context:", ld.get("@context"))
        for item in ld.get("@graph", []):
            print(f" - Item: {item.get('@type')} -> {item.get('name')}")
    except Exception as e:
        print("ERROR parsing JSON-LD:", e)

print("\n=== 2. Validating public/sitemap.xml ===")
try:
    tree = ET.parse("public/sitemap.xml")
    root = tree.getroot()
    print("PASS: sitemap.xml is well-formed XML.")
    print("Root tag:", root.tag)
    for url in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
        loc = url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text
        lastmod = url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod").text
        print(f" - URL: {loc} (lastmod: {lastmod})")
except Exception as e:
    print("ERROR parsing sitemap.xml:", e)

print("\n=== 3. Validating public/robots.txt ===")
with open("public/robots.txt", "r", encoding="utf-8") as f:
    robots = f.read()
print(robots.strip())

print("\n=== 4. Checking open graph & metadata tags ===")
for tag in ["canonical", "og:image", "og:title", "twitter:image", "robots", "description"]:
    has_tag = tag in html
    print(f" - Tag '{tag}' present: {has_tag}")

