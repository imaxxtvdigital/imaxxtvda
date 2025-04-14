const url = '/Assests/pdfs/Produceruideline .pdf'; // Replace with your PDF file path

const loadingTask = pdfjsLib.getDocument(url);

loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    const pdfContainer = document.getElementById('pdf-container');
    const totalPages = pdf.numPages;
    
    // Loop through all pages
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.getPage(pageNum).then(function(page) {
            const scale = 1.5; // Adjust scale to fit your needs
            const viewport = page.getViewport({ scale: scale });

            // Create a canvas element to render the page
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            pdfContainer.appendChild(canvas);

            // Render the page into the canvas context
            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });
    }
}).catch(function(error) {
    console.error('Error loading PDF:', error);
});
