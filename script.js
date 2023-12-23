const fullPath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/';

fetch('https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/index.html')
  .then(response => response.text())
  .then(newHTML => {
    // Parse the new HTML content
    const parser = new DOMParser();
    const newHTMLDocument = parser.parseFromString(newHTML, 'text/html');

    // Update HTML language attribute and add custom attribute
    newHTMLDocument.documentElement.lang = 'en';
    newHTMLDocument.documentElement.setAttribute('data-critters-container', '');

    // Update charset in meta tag
    const metaCharset = newHTMLDocument.querySelector('meta[charset]');
    if (metaCharset) {
      metaCharset.setAttribute('charset', 'utf-8');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('charset', 'utf-8');
      newHTMLDocument.head.appendChild(meta);
    }

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

  /*************************/
// Create a document fragment to hold the content
const fragment = document.createDocumentFragment();

// Create a temporary div element for head content
const tempDivHead = document.createElement('div');
tempDivHead.innerHTML = newHead;

// Move the child nodes of the temporary div to the fragment
while (tempDivHead.firstChild) {
  fragment.appendChild(tempDivHead.firstChild);
}

// Create a temporary div element for body content
const tempDivBody = document.createElement('div');
tempDivBody.innerHTML = newBody;

// Move the child nodes of the temporary div to the fragment
while (tempDivBody.firstChild) {
  fragment.appendChild(tempDivBody.firstChild);
}

// Append the fragment (head and body content) to the #content element
document.getElementById('content').appendChild(fragment);
 /************************/
  })
  .catch(error => {
    console.error('Error fetching or updating HTML:', error);
  });
