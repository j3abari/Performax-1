import os
import re

def get_footer(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'<footer.*?</footer\s*>', content, re.DOTALL)
    if match:
        return match.group(0)
    return "NO FOOTER"

index_footer = get_footer(r"D:\Lead Intelligence - Performax 1\Claude\Claude\Performax1_Website\index.html")
privacy_footer = get_footer(r"D:\Lead Intelligence - Performax 1\Claude\Claude\Performax1_Website\privacy.html")

if index_footer == privacy_footer:
    print("Footers are identical.")
else:
    print("Footers are different.")
    # save to diff
    with open(r"D:\Lead Intelligence - Performax 1\Claude\Claude\Performax1_Website\f1.txt", "w", encoding="utf-8") as f:
        f.write(index_footer)
    with open(r"D:\Lead Intelligence - Performax 1\Claude\Claude\Performax1_Website\f2.txt", "w", encoding="utf-8") as f:
        f.write(privacy_footer)
