import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# adding Tailwind CDN
head_replacement = """
    <!-- CSS File -->
    <link rel="stylesheet" href="styles.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#bc13fe',
              secondary: '#08ba8d',
              darkbg: '#050505',
              cardbg: '#111111'
            }
          }
        }
      }
    </script>
"""
content = re.sub(r'(\s*<!-- CSS File -->\s*<link rel="stylesheet" href="styles\.css" />)', head_replacement, content)

# update body class
content = re.sub(r'<body>', '<body class="bg-darkbg text-white font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-white">', content)

# update main sections
content = content.replace('class="hero-container"', 'class="hero-container relative z-10 text-center flex flex-col items-center justify-center min-h-screen"')
content = content.replace('class="about-content"', 'class="about-content flex flex-col md:flex-row items-center gap-12"')
content = content.replace('id="about"\n      >', 'id="about" class="py-24 bg-darkbg bg-opacity-90"\n      >') # just in case
content = content.replace('<section id="about">', '<section id="about" class="py-24 bg-darkbg relative border-t border-gray-900 border-opacity-50">')
content = content.replace('<section id="timeline">', '<section id="timeline" class="py-24 bg-black relative border-t border-gray-900">')
content = content.replace('<section id="portfolio">', '<section id="portfolio" class="py-24 bg-darkbg relative border-t border-gray-900 border-opacity-50">')
content = content.replace('<section id="contact">', '<section id="contact" class="py-24 bg-black relative border-t border-gray-900">')

# update containers
content = content.replace('class="container"', 'class="container mx-auto px-6 max-w-6xl"')

# update buttons
# To not break custom JS relying on .btn, we keep it but add tailwind padding and hover styles
# We'll just append tailwind classes for sleek dark mode styling
content = re.sub(r'class="btn btn-primary"', 'class="btn btn-primary bg-transparent text-primary border-2 border-primary py-3 px-8 rounded-full hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(188,19,254,0.3)] hover:shadow-[0_0_25px_rgba(188,19,254,0.6)]"', content)
content = re.sub(r'class="btn btn-secondary"', 'class="btn btn-secondary bg-transparent text-secondary border-2 border-secondary py-3 px-8 rounded-full hover:bg-secondary hover:text-white transition-all shadow-[0_0_15px_rgba(8,186,141,0.3)] hover:shadow-[0_0_25px_rgba(8,186,141,0.6)]"', content)

# specific fixes for project cards
content = content.replace('class="portfolio-item"', 'class="portfolio-item relative overflow-hidden rounded-2xl bg-cardbg ring-1 ring-white/10 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(188,19,254,0.2)]"')
content = content.replace('class="portfolio-overlay"', 'class="portfolio-overlay absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300"')

# Skills categories buttons
content = content.replace('class="skills-filter', 'class="skills-filter px-5 py-2 m-2 rounded-full border border-primary text-sm backdrop-blur-sm transition-all hover:bg-primary hover:text-white shadow-[0_0_10px_rgba(188,19,254,0.1)]')

# Timeline items
content = content.replace('class="timeline-content"', 'class="timeline-content bg-cardbg p-8 rounded-2xl border border-white/5 shadow-xl hover:shadow-[0_0_20px_rgba(8,186,141,0.2)] transition-all relative z-10"')

# Headings
content = content.replace('class="section-title"', 'class="section-title text-4xl md:text-5xl font-bold text-center mb-16 tracking-wider drop-shadow-lg text-white"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

