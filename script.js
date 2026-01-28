// Set a target launch date: 30 days from first load
const FIRST_LOAD_KEY = 'bn_first_load_ts';
let targetDate;
const stored = localStorage.getItem(FIRST_LOAD_KEY);
if (stored) {
    targetDate = new Date(parseInt(stored, 10));
} else {
    const d = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem(FIRST_LOAD_KEY, String(d));
    targetDate = new Date(d);
}

function pad(n) { return String(n).padStart(2, '0') }

function tick(elem) {
    if (!elem) return;
    elem.classList.add('tick');
    setTimeout(() => elem.classList.remove('tick'), 600);
}

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<div style="grid-column:1/-1;text-align:center">We\'re live — thanks for waiting!</div>';
        clearInterval(timer);
        return;
    }
    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl.textContent !== pad(days)) { dEl.textContent = pad(days); tick(dEl); }
    if (hEl.textContent !== pad(hours)) { hEl.textContent = pad(hours); tick(hEl); }
    if (mEl.textContent !== pad(minutes)) { mEl.textContent = pad(minutes); tick(mEl); }
    if (sEl.textContent !== pad(seconds)) { sEl.textContent = pad(seconds); tick(sEl); }
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// Email form handling (front-end only)
const form = document.getElementById('notify');
const email = document.getElementById('email');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!valid) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    // Simulate successful signup: store locally and show message
    const list = JSON.parse(localStorage.getItem('bn_waitlist') || '[]');
    if (!list.includes(v)) list.push(v);
    localStorage.setItem('bn_waitlist', JSON.stringify(list));
    showMessage('Thanks — we\'ll notify you when we launch.', 'success');
    email.value = '';
});

function showMessage(text, type) {
    msg.textContent = text;
    msg.classList.remove('success', 'error');
    msg.classList.add(type);
    msg.style.opacity = '1';
    setTimeout(() => { msg.style.opacity = '0'; }, 4000);
}

// Small housekeeping
document.getElementById('year').textContent = new Date().getFullYear();
