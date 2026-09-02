import os
import re

files = ["index.html", "about.html", "services.html", "contact.html"]

mobile_fixes = '''
    <style>
        /* --- Mobile Overrides for Inline Styles --- */
        @media (max-width: 768px) {
            /* Navbar CTA */
            .nav-cta {
                padding: 6px 10px !important;
                font-size: 12px !important;
            }
            
            /* Process Grid (index.html) */
            section#process > .container > div {
                grid-template-columns: 1fr !important;
                padding-bottom: 3rem !important; /* Fix spacing below last card */
            }
            
            section#process .container > div > div {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
            }
            
            section#process .container > div > div > div:first-child {
                left: 50% !important;
                transform: translateX(-50%) !important;
                text-align: center !important;
            }
            
            section#process .container > div > div ul {
                display: inline-block !important;
                text-align: left !important;
            }

            /* Footer */
            footer > .container {
                align-items: center !important;
            }
            footer > .container > div:first-child {
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
            }
            footer .footer-links {
                flex-direction: column !important;
                align-items: center !important;
                gap: 1rem !important;
            }
            footer > .container > div:last-child {
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
                gap: 1rem !important;
            }
        }
    </style>
'''

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '/* --- Mobile Overrides for Inline Styles --- */' in content:
            continue
            
        # insert before </head>
        content = content.replace('</head>', mobile_fixes + '\n</head>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("Fixes applied.")
