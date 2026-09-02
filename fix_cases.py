import os

file = "index.html"

extra_css = '''
            /* --- Global Fixes --- */
            section#cases {
                padding-bottom: 6rem !important; /* Fix spacing below FASHION BRAND card */
            }
            .cases-grid {
                padding-bottom: 2rem !important;
            }
'''

with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Insert right after the <style> tag we added earlier
content = content.replace('<style>', '<style>\n' + extra_css)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fix applied to index.html")
