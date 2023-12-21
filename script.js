fetch('https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/index.html')
  .then(response => response.text())
  .then(newHTML => {
    // Parse the new HTML content
    const parser = new DOMParser();
    const newHTMLDocument = parser.parseFromString(newHTML, 'text/html');

    // Update the base href attribute
    const baseTag = newHTMLDocument.querySelector('base');
    if (baseTag) {
      baseTag.setAttribute('href', '//https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/');
    }
    const titleTag = newHTMLDocument.querySelector('title');
    titleTag.textContent = 'War Victims 07-Oct-2023 (ver.22122023_0023)';
    // Replace the entire HTML content
    document.documentElement.innerHTML = newHTMLDocument.documentElement.outerHTML;
  })
  .catch(error => {
    console.error('Error fetching or updating HTML:', error);
  });
