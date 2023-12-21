const fullPath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/';

fetch('https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/index.html')
  .then(response => response.text())
  .then(newHTML => {
    // Parse the new HTML content
    const parser = new DOMParser();
    const newHTMLDocument = parser.parseFromString(newHTML, 'text/html');

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
    titleTag.textContent = 'War Victims 07-Oct-2023 (ver.22122023_0119)';

    // Manipulate specific elements before appending to the existing document
    const newHead = newHTMLDocument.head.innerHTML;
    const newBody = newHTMLDocument.body.innerHTML;

    // Replace specific elements or append them to the existing document
    document.head.innerHTML = newHead;
    document.body.innerHTML = newBody;
  })
  .catch(error => {
    console.error('Error fetching or updating HTML:', error);
  });
