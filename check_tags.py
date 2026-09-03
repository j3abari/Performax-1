import re

with open(r"D:\Lead Intelligence - Performax 1\Claude\Claude\Performax1_Website\privacy.html", 'r', encoding='utf-8') as f:
    html = f.read()

div_open = len(re.findall(r'<div', html, re.IGNORECASE))
div_close = len(re.findall(r'</div', html, re.IGNORECASE))
print(f"Open divs: {div_open}, Close divs: {div_close}")

section_open = len(re.findall(r'<section', html, re.IGNORECASE))
section_close = len(re.findall(r'</section', html, re.IGNORECASE))
print(f"Open sections: {section_open}, Close sections: {section_close}")

