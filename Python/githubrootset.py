from bs4 import BeautifulSoup
import os
from datetime import datetime

##compile program##
# Run ng build
os.system('ng build')
#################
# Define the full path
fullPath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/'
htmlfilecontentpath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/index.html'
# Open and parse the HTML file
with open(htmlfilecontentpath, 'r') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Update href attribute for link elements
for link in soup.find_all('link', href=True):
    link['href'] = fullPath + link['href']

# Update src attribute for script elements
for script in soup.find_all('script', src=True):
    script['src'] = fullPath + script['src']

# Get the modification time of the file
mod_time = os.path.getmtime(htmlfilecontentpath)

# Convert the timestamp to datetime object and format it
formatted_date_time = datetime.fromtimestamp(mod_time).strftime('%d%m%Y_%H%M')

# Set the title of the new HTML file
soup.title.string = "War victims 07-OCT-2023(ver."+ formatted_date_time + ")"
# Write the updated HTML to a new file in the root directory
with open('../index.html', 'w') as f:
    f.write(str(soup))
