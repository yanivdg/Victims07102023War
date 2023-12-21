fetch('https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/index.html')
  .then(response => response.text())
  .then(htmlContent => {
    // Manipulate the HTML content
    const modifiedContent = htmlContent.replace(/(href|src)="([^"]*)"/g, (match, attribute, value) => {
      // Assuming your files are in the same directory as the HTML file
      const fullPath = 'https://cdn.jsdelivr.net/gh/yanivdg/Victims07102023War@main/dist/my-app/browser/' + value; // Replace 'full_path/' with your actual path
      return `${attribute}="${fullPath}"`;
    });

    // Create a new HTML document
    const newHTMLDocument = new DOMParser().parseFromString(modifiedContent, 'text/html');

    // Replace the entire content of the current document body with the modified HTML content
    document.body.innerHTML = newHTMLDocument.documentElement.outerHTML;
  })
  .catch(error => {
    console.error('Error fetching HTML:', error);
  });
