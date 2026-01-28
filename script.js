// --- Configuration ---
const LAUNCH_DAYS = 14; // Number of days until launch
const STORAGE_KEY = 'baknova_launch_date';

// --- Logic ---
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initForm();
    document.getElementById('year').textContent = new Date().getFullYear();
});

function initCountdown() {
    let targetDate;
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        targetDate = new Date(parseInt(stored, 10));
    } else {
        targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + LAUNCH_DAYS);
        localStorage.setItem(STORAGE_KEY, targetDate.getTime());
    }

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML =
                '<div style="grid-column: 1/-1; text-align: center; padding: 20px;">We represent Live!</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateTime('days', days);
        updateTime('hours', hours);
        updateTime('minutes', minutes);
        updateTime('seconds', seconds);

    }, 1000);
}

function updateTime(id, value) {
    const el = document.getElementById(id);
    const strVal = value < 10 ? '0' + value : value;
    if (el.innerText !== strVal) el.innerText = strVal;
}

function initForm() {
    const form = document.getElementById('notify');
    const msg = document.getElementById('msg');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!emailInput.value || !emailInput.value.includes('@')) {
            showMsg('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate API call
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            showMsg("Success! We'll keep you posted.", 'success');
            form.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });

    function showMsg(text, type) {
        msg.textContent = text;
        msg.className = `msg ${type}`;
        setTimeout(() => { msg.textContent = ''; }, 4000);
    }
}