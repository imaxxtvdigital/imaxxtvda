function submitForm() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;
    const message = document.getElementById('message').value;

    if (name && contact && email && reason && message) {
        alert(`Thank you ${name}, your inquiry for '${reason}' has been submitted. We will contact you shortly.`);
    } else {
        alert('Please fill out all the fields.');
    }
}
