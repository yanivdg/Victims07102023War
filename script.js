fetch('https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/index.html')
  .then(response => response.text())
  .then(newHTML => {
    // Parse the new HTML content
    const parser = new DOMParser();
    const newHTMLDocument = parser.parseFromString(newHTML, 'text/html');
    const fullPath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/';

    // Update href attribute for link elements
    newHTMLDocument.querySelectorAll('link[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        link.setAttribute('href', fullPath + href);
      }
    });

    // Update src attribute for script elements
    newHTMLDocument.querySelectorAll('script[src]').forEach(script => {
      const src = script.getAttribute('src');
      if (src) {
        script.setAttribute('src', fullPath + src);
      }
    });
    
    const titleTag = newHTMLDocument.querySelector('title');
    titleTag.textContent = 'War Victims 07-Oct-2023 (ver.22122023_0023)';
    // Replace the entire HTML content
    document.documentElement.innerHTML = newHTMLDocument.documentElement.outerHTML;
  })
  .catch(error => {
    console.error('Error fetching or updating HTML:', error);
  });
