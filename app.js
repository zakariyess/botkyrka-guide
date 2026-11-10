document.addEventListener('DOMContentLoaded', () => {
    // --- 1. AI CHATT LOGIK ---
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');

    if (sendBtn && userInput && chatOutput) {
        function handleSend() {
            const query = userInput.value.trim().toLowerCase();
            if (!query) return;

            appendMessage('Du', userInput.value);
            userInput.value = '';

            setTimeout(() => {
                const botReply = generateResponse(query);
                appendMessage('Botkyrka AI', botReply);
            }, 500);
        }

        function generateResponse(text) {
            if (text.includes('öppettider') || text.includes('öppet') || text.includes('tid')) {
                return 'Medborgarkontoret Tumba har öppet Mån–Fre 09:00–16:30. Fittja Bibliotek har öppet Mån–Tors 10:00–19:00 och Fre 10:00–17:00.';
            } else if (text.includes('bistånd') || text.includes('pengar') || text.includes('ekonomi') || text.includes('stöd')) {
                return 'För att söka ekonomiskt bistånd behöver du kontoutdrag och hyresavier för 3 månader. Ansökan görs via Botkyrka kommuns e-tjänst med BankID.';
            } else if (text.includes('telefon') || text.includes('ring') || text.includes('nummer') || text.includes('kontakt')) {
                return 'Du når Botkyrka kommuns kundcenter på 08-530 610 00 (vardagar). Fittja bibliotek nås på 08-530 626 40.';
            } else if (text.includes('adress') || text.includes('var') || text.includes('ligger') || text.includes('hitta')) {
                return 'Medborgarkontoret finns på Tumba Torg 101. Fittja Bibliotek ligger på Fittja Torg 3, och Socialtjänsten finns på Munkhättevägen 45.';
            } else if (text.includes('hej') || text.includes('tjena') || text.includes('hallo')) {
                return 'Hej! Jag kan svara på frågor om öppettider, adresser, telefonnummer och hur du söker ekonomiskt bistånd.';
            } else {
                return 'Tack för din fråga! Jag är en prototyp-assistent. För mer information kan du klicka på direktlänkarna till Botkyrka kommuns officiella undersidor ovan.';
            }
        }

        function appendMessage(sender, text) {
            const msgDiv = document.createElement('div');
            msgDiv.style.marginBottom = '8px';
            msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
            chatOutput.appendChild(msgDiv);
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }

        sendBtn.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // --- 2. SÖK & FILTER LOGIK ---
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- 3. TILLGÄNGLIGHET & SPRÅK LOGIK ---
    const ttsBtn = document.getElementById('tts-btn');
    const langSelect = document.getElementById('lang-select');

    if (ttsBtn) {
        ttsBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const mainText = document.querySelector('main').innerText;
                const utterance = new SpeechSynthesisUtterance(mainText);
                utterance.lang = langSelect ? (langSelect.value === 'en' ? 'en-US' : 'sv-SE') : 'sv-SE';
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Talsyntes stöds tyvärr inte i din webbläsare.');
            }
        });
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            if (e.target.value === 'en') {
                alert('English view toggled! (In a full production version, text strings dynamically load in English).');
            }
        });
    }
});