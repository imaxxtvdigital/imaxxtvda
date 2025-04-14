function openDetail(title, description, image, url) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').textContent = description;
    document.getElementById('popup-image').src = image;
    document.getElementById('popup-modal').style.display = 'flex';
    document.getElementById('mbcbtn').style.display = 'none';

}

function closePopup() {
    document.getElementById('popup-modal').style.display = 'none';
    document.getElementById('mbcbtn').style.display = 'block';
}

// Function to open the new page when the button is clicked
function openNewPage() {
    window.location.href = '/register.html'; // Replace with the URL you want to open
}
function openExternalPage(url) {
    window.open('/register.html', '_blank'); // Relative path (go up one level)
}

function openNewPage() {
    window.location.href = '/register.html'; // Ensure the relative path is correct
}


