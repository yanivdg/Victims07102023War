from bs4 import BeautifulSoup
import os
from datetime import datetime
import re

def is_url_or_path(string):
    # Regular expression patterns for URL and file path
    url_pattern = re.compile(r'^https?://(?:www\.)?[\w\.-]+(?:\.[\w]+)+[\w\W]*$')
    path_pattern = re.compile(r'^[a-zA-Z]:\\(?:\w+\\?)*$|^/(\w+/)*\w+$')

    if re.match(url_pattern, string):
        return True
    elif re.match(path_pattern, string):
        return True
    else:
        return False

##compile program##
# Run ng build
os.system('ng build')
#################
# Define the full path

fullPath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/'
htmlfilecontentpath = '../dist/my-app/browser/index.html'
cdnmain = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main'
#fullPath = f'{cdnmain}/dist/my-app/browser'//serverless
#htmlfilecontentpath = f'{fullPath}/index.html'//serverless
# Open and parse the HTML file
with open(htmlfilecontentpath, 'r') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Update href attribute for link elements
for link in soup.find_all('link', href=True):
    link['href'] = ('' if is_url_or_path(link['href']) else fullPath) + link['href']

# Update src attribute for script elements
for script in soup.find_all('script', src=True):
        script['src'] = ('' if is_url_or_path(script['src']) else fullPath) + script['src']

# Get the modification time of the file
mod_time = os.path.getmtime(htmlfilecontentpath)

# Convert the timestamp to datetime object and format it
formatted_date_time = datetime.fromtimestamp(mod_time).strftime('%d%m%Y_%H%M')

# Set the title of the new HTML file
soup.title.string = "War victims 07-OCT-2023(ver."+ formatted_date_time + ")"
# Write the updated HTML to a new file in the root directory
with open('../index.html', 'w') as f:
    f.write(str(soup))
#with open(f'{cdnmain}/index.html', 'w') as f:
#    f.write(str(soup))
