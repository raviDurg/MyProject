document.getElementById('download-btn').addEventListener('click', function() {
    // Get the current page's HTML content
    let pageContent = document.documentElement.outerHTML;

    // Create a Blob from the HTML content
    let blob = new Blob([pageContent], { type: 'text/html' });

    // Create a link element
    let a = document.createElement('a');
    
    // Set the download attribute with a filename
    a.download = 'current-page.html';

    // Create an object URL for the Blob
    a.href = URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(a);

    // Programmatically click the link to trigger the download
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
});