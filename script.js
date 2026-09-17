const toggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('[data-track]').forEach((element) => {
  element.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: element.dataset.track });
  });
});

const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();
    const text = ['Hello, I would like a private conversation about your lifestyle support services.', 'Name: ' + name, 'Phone: ' + phone, message ? 'Message: ' + message : ''].filter(Boolean).join('\\n');

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', lead_method: 'whatsapp_form' });
    window.open('https://wa.me/917972435258?text=' + encodeURIComponent(text), '_blank', 'noopener');
    enquiryForm.reset();
  });
}

const callDialog = document.getElementById('callDialog');
if (callDialog) {
  callDialog.querySelector('[data-close-call]').addEventListener('click', () => callDialog.close());
  callDialog.addEventListener('click', (event) => {
    if (event.target === callDialog) callDialog.close();
  });

  window.setTimeout(() => {
    if (typeof callDialog.showModal === 'function' && !callDialog.open) callDialog.showModal();
  }, 900);
}
