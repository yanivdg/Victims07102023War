import os
import zipfile
import json
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import sys
from flask import Flask
import argparse    
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
     
def save_to_file(content):
     # Extract the "body" from JSON content
     html_body = content.get("body", "")  # Get the "body" value, defaulting to an empty string if not present
     # Decode Unicode escape sequences in the JSON string
     decoded_content = bytes(html_body, "utf-8").decode("unicode-escape")
     # Save decoded content to an HTML file
     with open('kidnapped.html', 'w', encoding='utf-8') as file:
        file.write(html_body)
         
def insert_after_substring(original_string, search_string, insert_string):
    index = original_string.find(search_string)
    if index != -1:
        first_part = original_string[:index + len(search_string)]
        second_part = original_string[index + len(search_string):]
        return first_part + insert_string + second_part
    return original_string  # If the search_string is not found, return the original string

app = Flask(__name__)
@app.route('/api/BringThemHome', methods=['GET'])
def  get_resource():
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


  
        html_content = '<html>\n'
        #
        #html_content += '<style>\n .image-container {\n  display: flex;\n flex-wrap:wrap; \n margin: 0; \n}\n'
        #html_content += '.image-container img { \nwidth: 20 ;\n height: auto;\n}\n'
        #html_content += 'figure {\n margin: 0; \n padding: 0;\n}\n'

        #html_content += 'table {width: 100%;}\n'
        #html_content += 'td {width: 50%;vertical-align: top;}\n'
        #html_content += '.sum-logic {padding: 20px;}\n'
        #html_content += '.image-section {padding: 20px;}'
        #html_content += '</style>\n'
        #html_content += "<body>\n<div class='image-container'>\n"
        #

        html_content += "\n<head>\n<style>\n"
        html_content += ".right\n{display: flex;\nflex-wrap: wrap;\njustify-content: center;\nwidth: 80%;\npadding: 1px;\nbox-sizing: border-box;\n}\n"
        html_content += "\nfigure\n{width: 5vw;\nmax-width: 80px;\n text-align: center; \nmargin: 0;\n}\n"
        html_content += "\nimg {\nwidth: auto;\nheight:auto;\nmax-width: 70%;\n border: 5vw solid #FFD700;\n border-radius: 50%;\nbox-shadow: 0 0 1vw #FFD700;\n}\n"
        html_content += "\nfigcaption {\nmargin-top: 0vw;\nfont-family: 'Arial, sans-serif';\nfont-size: '10px'; }\n";
        html_content += "\n@media screen and (max-width: 768px) {\nfigcaption \n{font-size: '5px'}\n}\n"
        html_content += "\n.container {\ndisplay: flex;\nflex-wrap: wrap;\njustify-content: space-between;\n}\n"
        html_content += "\n.left{\nwidth: 20%;\npadding: 1px;\nbox-sizing: border-box;\n}\n"
        html_content += "\n.left p \n{margin: 0;\nfont-family:'Arial';\nfont-size:3vw;}\n"
        html_content += "\n.alive\n{\nborder: 10px solid #FFD700;\n border-radius: 50%;\n box-shadow: 0 0 10px #FFD700;\n}\n"
        html_content += "\n.dead\n{\nborder: 10px solid black;\nborder-radius: 0;\nbox-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);\n}\n"
        html_content += "\n</style>\n</head>\n<body>\n<div class='container'>\n"
        html_content += "<div class='right'>\n"
        for img in img_tags:
            total_images += 1
            src = img.get('src', '')
            print(src)
            if not src.lower().endswith('.svg'):
                alt = img.get('alt', '')
                print(alt)
                classname = ''
                if "ז\"ל" in alt:
                    print("black")
                    classname = 'dead'
                    black_images += 1
                else:
                    print("yellow")
                    classname = 'alive'
                    yellow_images += 1
                filename = os.path.splitext(os.path.basename(src))[0]
                html_content += f'<figure>\n<img class="{classname}" src="{src}" alt="{alt}">\n'
                # Assuming f is your file object or file handler
                html_content += f'<figcaption>{filename}<br>{alt}</figcaption>\n</figure>\n\n'
        html_content += '</div>\n'
        totalall = "<div class='left'>\n"
        totalall +=  f'<p color:red;">Kidnapped: {total_images}</p>\n'
        totalall += f'<p color:black;">Murdered: {black_images}</p>\n'
        totalall +=  f'<p color:#FFD700;">Alive: {yellow_images}</p>\n'
        totalall += "</div>\n"
        html_content = insert_after_substring( html_content , "<div class='container'>\n", totalall)
        html_content += "\n</div>\n</body>\n</html>"
        return {
            'header':{'Content-Type': 'text/html'},
            'statusCode': 200,
            'body': html_content   
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", help="run mode: api or console")
    args = parser.parse_args()

    if args.mode == "api":
        app.run(debug=True)  # This starts the Flask app in debug mode
    elif args.mode == "console":
        content = get_resource()
        save_to_file(content)
    else:
        print("Invalid mode. Please choose 'api' or 'console'.")
