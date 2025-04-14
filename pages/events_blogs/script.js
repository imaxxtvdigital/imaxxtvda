function openDetail(title, description, image) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').textContent = description;
    document.getElementById('popup-image').src = image;
    document.getElementById('iframes').src = image;
    
    document.getElementById('popup-modal').style.display = 'flex';
    document.getElementById('mbcbtn').style.display = 'none';
}

function closePopup() {
    document.getElementById('popup-modal').style.display = 'none';
    document.getElementById('mbcbtn').style.display = 'block';
}
