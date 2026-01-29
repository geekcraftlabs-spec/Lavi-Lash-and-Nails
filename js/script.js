document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.querySelector('[name="name"]').value.trim();
      const surname = document.querySelector('[name="surname"]').value.trim();
      const phone   = document.querySelector('[name="phone"]').value.trim();
      const date    = document.querySelector('[name="date"]').value;
      const service = document.querySelector('[name="service"]').value;
      const notes   = document.querySelector('[name="notes"]').value.trim();

      if (!service) {
        alert('Please select Lashes or Nails.');
        return;
      }

      // International format for South Africa
      const lashesNumber = '27711734337';
      const nailsNumber  = '27740289418';
      const number = service === 'Lashes' ? lashesNumber : nailsNumber;

      // Clean, short message
      const message = [
        `New booking via Lavi Lash & Nails website`,
        `Name: ${name} ${surname}`,
        `Phone: ${phone}`,
        `Date: ${date}`,
        `Service: ${service}`,
        `Notes: ${notes || 'None'}`
      ].join('\n');

      const encoded = encodeURIComponent(message);

      // Use api.whatsapp.com (usually more reliable)
      const url = `https://api.whatsapp.com/send?phone=${number}&text=${encoded}`;

      console.log('Message length:', message.length);
      console.log('Full URL:', url);

      window.open(url, '_blank');

      // Nice feedback alert after a tiny delay (so it doesn't interrupt the WhatsApp open)
      setTimeout(() => {
        alert("Booking request sent! We'll chat on WhatsApp shortly. 💅✨");
      }, 500);

      form.reset();
    });
  }
});
