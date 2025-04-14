function showPopup(name, role, email, imgSrc, bio, linkins) {
    document.getElementById('popup-name').innerText = name;
    document.getElementById('popup-role').innerText = role;
    document.getElementById('popup-email').innerText = email;
    document.getElementById('popup-img').src = imgSrc;
    document.getElementById('popup-bio').innerText = bio;
    // document.getElementById('linkedins').hre = linkins;
    const anchorTag = document.getElementById('linkedins');
    anchorTag.href = linkins;
    document.getElementById('team-popup').style.display = 'flex';
    document.getElementById('mbcbtns').style.display = 'none';
}

function closePopup() {
    document.getElementById('team-popup').style.display = 'none';
    document.getElementById('mbcbtns').style.display = 'block';
}
