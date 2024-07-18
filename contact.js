// scripts.js
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you for reaching out, ${name}! We will get back to you at ${email}.`);
        // You can add additional form submission logic here, like sending the data to a server
        document.getElementById('contact-form').reset(); // Reset the form fields
    } else {
        alert('Please fill in all fields.');
    }
});
