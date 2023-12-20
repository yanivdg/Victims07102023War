import os
import zipfile
import json
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import sys          
python_version = sys.version
print("Python Version:", python_version)
import subprocess
# Run the command 'pip show greenlet'
result = subprocess.run(['pip', 'show', 'greenlet'], capture_output=True, text=True)
# Print the output (stdout) of the command
print(result.stdout)
# Run the command 'pip list'
result = subprocess.run(['pip', 'list'], capture_output=True, text=True)
# Print the output (stdout) of the command
print(result.stdout)

def get_dynamic_soup(url: str) -> BeautifulSoup:
     with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            page.goto(url)
            soup = BeautifulSoup(page.content(), "html.parser")
            browser.close()
     return soup

def not_full_width(tag):
     classes = tag.get('class')
     return classes is None or not any('full-width' in cls for cls in classes)

def lambda_handler(event, context):
    try:
        # URL of the website to scrape
        url = 'https://kidnappedfromisrael.n12.co.il/'  # Replace this with the URL of the website you want to scrape
        # Get the dynamic HTML content using Playwright and BeautifulSoup
        soup = get_dynamic_soup(url)
        # Find the div with the specific class
        div = soup.find('div', class_='items-grid--c6reG')
        # Find all img tags in this div
        img_tags = div.find_all('img') if div else []
        total_images = 0
        black_images = 0
        yellow_images = 0  
        # For demonstration, returning HTML content as JSON
        html_content = '<style>\n'
        html_content += '.image-container {\n'
        html_content += '  display: flex;\n'
        html_content += '  flex-wrap: wrap;\n'
        html_content += '}\n'
        html_content += '.image-container img {\n'
        html_content += '  margin: 10px;\n'
        html_content += '}\n'
        html_content += '</style>\n'
        html_content += '<div class="image-container">\n'
        for img in img_tags:
            total_images += 1
            src = img.get('src', '')
            if not src.lower().endswith('.svg'):
                alt = img.get('alt', '')
                if "ז\"ל" in alt:
                    img['style'] = "border: 20px solid black; border-radius: 0; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);"
                    black_images += 1
                else:
                    img['style'] = "border: 10px solid #FFD700; border-radius: 50%; box-shadow: 0 0 10px #FFD700;"  # Yellow border with a slight glow and circular shape
                    yellow_images += 1
                    #filename = os.path.splitext(os.path.basename(src))[0]
                    html_content += f'<figure>\n<img src="{src}" alt="{alt}" style="{img["style"]}">\n'
                    font_family = "Arial, sans-serif"  # Change this to your desired font family
                    font_size = "30px"  # Change this to your desired font size
                    # Assuming f is your file object or file handler
                    html_content += f'<figcaption style="font-family: {font_family}; font-size: {font_size};">{alt}</figcaption>\n</figure>\n\n'
        html_content += '</div>\n'
        html_content += f'<p font-family="Arial" font_size = "30px">Total Kidnapped: {total_images}</p>\n'
        html_content += f'<p font-family="Arial" font_size = "30px">Kidnapped Murdered: {black_images}</p>\n'
        html_content += f'<p font-family="Arial" font_size = "30px">Kidnapped Alive: {yellow_images}</p>\n'
        return {
            'statusCode': 200,
            'body': json.dumps(html_content)   
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }


if __name__ == "__main__":
    event = {}  # Replace with your event data
    context = {}  # Replace with your context data
    print(lambda_handler(event, context))