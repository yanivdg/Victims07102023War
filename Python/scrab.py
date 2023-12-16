from selenium import webdriver
import webbrowser
from bs4 import BeautifulSoup
import requests
import os

def not_full_width(tag):
     classes = tag.get('class')
     return classes is None or not any('full-width' in cls for cls in classes)
   
# Initialize the Chrome driver
driver = webdriver.Chrome()

# URL of the website to scrape
url = 'https://kidnappedfromisrael.n12.co.il/'  # Replace this with the URL of the website you want to scrape

# Open the webpage
driver.get(url)  # replace with your URL

# Get the HTML of the webpage
html = driver.page_source

# Now you can parse the HTML with BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Find the div with the specific class
div = soup.find('div', class_='items-grid--c6reG')

# Find all img tags in this div
img_tags = div.find_all('img') if div else []

total_images = 0
black_images = 0
yellow_images = 0  
# Write the img tags to a new HTML file
with open('kidnapped.html', 'w', encoding='utf-8') as f:
        f.write('<style>\n')
        f.write('.image-container {\n')
        f.write('  display: flex;\n')
        f.write('  flex-wrap: wrap;\n')
        f.write('}\n')
        f.write('.image-container img {\n')
        f.write('  margin: 10px;\n')
        f.write('}\n')
        f.write('</style>\n')
        f.write('<div class="image-container">\n')
        for img in img_tags:
            total_images += 1
            src = img.get('src', '')
            if not src.lower().endswith('.svg'):
                alt = img.get('alt', '')
                if "ז\"ל" in alt:
                     img['style'] = "border: 20px solid black; border-radius: 0; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);"
                     black_images += 1
                else:
                     #img['style'] = "border: 10px solid #FFD700; box-shadow: 0 0 10px #FFD700;"  # Yellow border with a slight glow
                     img['style'] = "border: 10px solid #FFD700; border-radius: 50%; box-shadow: 0 0 10px #FFD700;"  # Yellow border with a slight glow and circular shape
                     yellow_images += 1
                filename = os.path.splitext(os.path.basename(src))[0]
                f.write(f'<figure>\n<img src="{src}" alt="{alt}" style="{img["style"]}">\n')
                font_family = "Arial, sans-serif"  # Change this to your desired font family
                font_size = "30px"  # Change this to your desired font size
                # Assuming f is your file object or file handler
                f.write(f'<figcaption style="font-family: {font_family}; font-size: {font_size};">{filename}{alt}</figcaption>\n</figure>\n\n')
                #f.write(f'<figcaption>{filename}{alt}</figcaption>\n</figure>\n\n')  # add a newline between figures
        f.write('</div>\n')
        f.write(f'<p font-family="Arial" font_size = "30px">Total Kidnapped: {total_images}</p>\n')
        f.write(f'<p font-family="Arial" font_size = "30px">Kidnapped Murdered: {black_images}</p>\n')
        f.write(f'<p font-family="Arial" font_size = "30px">Kindnaped Alive: {yellow_images}</p>\n')
file_path = "C:\\Users\\yaniv\\OneDrive\\Documents\\Python\\kidnapped.html"  # Replace this with the path to your local HTML file
webbrowser.open("file://" + file_path)
