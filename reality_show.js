function openDetail(title, description, image, url) {
    document.getElementById('popup-title').textContent = title;
    // Render description as bullet list if string contains bullets, otherwise as paragraph
    var descEl = document.getElementById('popup-description');
    if (description && description.includes('•')) {
        var items = description.split('•').map(function (s) { return s.trim(); }).filter(Boolean);
        var html = '<ul>' + items.map(function (it) { return '<li>' + it + '</li>'; }).join('') + '</ul>';
        descEl.innerHTML = html;
    } else {
        descEl.innerHTML = '<p>' + (description || '') + '</p>';
    }
    document.getElementById('popup-image').src = image;
    // Ensure clicking the image directs to the correct registration page for this show
    var imgEl = document.getElementById('popup-image');
    if (imgEl) {
        imgEl.onclick = function () { openExternalPage(title); };
    }
    document.getElementById('popup-modal').style.display = 'flex';
    var backBtn = document.getElementById('mbcbtns');
    if (backBtn) backBtn.style.display = 'none';

}

function closePopup() {
    document.getElementById('popup-modal').style.display = 'none';
    var backBtn = document.getElementById('mbcbtns');
    if (backBtn) backBtn.style.display = 'block';
}

// Close when clicking outside the content (on overlay)
document.addEventListener('click', function (e) {
    var modal = document.getElementById('popup-modal');
    var content = document.querySelector('.popup-content');
    if (!modal || !content) return;
    // Only close if the actual overlay itself is clicked
    if (modal.style.display === 'flex' && e.target === modal) {
        closePopup();
    }
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        var modal = document.getElementById('popup-modal');
        if (modal && modal.style.display === 'flex') {
            closePopup();
        }
    }
});

// Function to open the new page when the button is clicked
function openNewPage() {
    window.location.href = '/register.html'; // Replace with the URL you want to open
}
function openExternalPage(show) {
    var map = {
        'Laughter Akhada': '/register_laughter_akhada.html',
        'Home Chef': '/register_home_chef.html',
        'Candid Confessions': '/register_candid_confessions.html'
    };
    var href = map[show] || '/register.html';
    window.open(href, '_blank');
}

function openNewPage() {
    window.location.href = '/register.html'; // Ensure the relative path is correct
}


