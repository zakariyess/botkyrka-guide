document.addEventListener('DOMContentLoaded', () => {
    // --- 1. AI CHATT LOGIK (ENGLISH RESPONSES) ---
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');

    if (sendBtn && userInput && chatOutput) {
        function handleSend() {
            const query = userInput.value.trim().toLowerCase();
            if (!query) return;

            appendMessage('You', userInput.value);
            userInput.value = '';

            setTimeout(() => {
                const botReply = generateResponse(query);
                appendMessage('Botkyrka AI', botReply);
            }, 500);
        }

        function generateResponse(text) {
            // Specificering för digitala tjänster (Ny funktion utifrån feedback!)
            if (text.includes('digital') || text.includes('dator') || text.includes('it-hjälp') || text.includes('internet')) {
                return 'For digital services and computer assistance, Fittja Library is your best option. You can also get general digital guidance at Citizen Center Tumba.';
            }
            // Öppettider / Hours
            else if (text.includes('öppet') || text.includes('tid') || text.includes('hour') || text.includes('open')) {
                return 'Citizen Center Tumba is open Mon–Fri 09:00–16:30. Fittja Library is open Mon–Thu 10:00–19:00 and Fri 10:00–17:00.';
            } 
            // Bistånd & Ekonomi / Financial support
            else if (text.includes('bistånd') || text.includes('pengar') || text.includes('ekonomi') || text.includes('stöd') || text.includes('money') || text.includes('benefit')) {
                return 'To apply for financial support, prepare 3 months of bank statements and rent receipts. Apply online via Botkyrka Municipality’s e-service using BankID.';
            } 
            // Telefon & Kontakt / Phone & Contact
            else if (text.includes('telefon') || text.includes('ring') || text.includes('nummer') || text.includes('kontakt') || text.includes('phone') || text.includes('call')) {
                return 'You can reach Botkyrka Municipality Contact Center at +46 8-530 610 00 (weekdays). Fittja Library can be reached at +46 8-530 626 40.';
            } 
            // Adress & Plats / Address & Location
            else if (text.includes('adress') || text.includes('var') || text.includes('ligger') || text.includes('hitta') || text.includes('where') || text.includes('address')) {
                return 'Citizen Center: Tumba Torg 101. Fittja Library: Fittja Torg 3. Social Services: Munkhättevägen 45, Tumba.';
            } 
            // Hälsningar / Greetings
            else if (text.includes('hej') || text.includes('tjena') || text.includes('hallo') || text.includes('hi') || text.includes('hello')) {
                return 'Hello! I can answer questions about opening hours, addresses, contact details, and how to apply for financial aid in Botkyrka.';
            } 
            // Tydligare fallback när boten INTE vet svaret (Förbättrat utifrån feedback!)
            else {
                return 'I do not have that specific information in my database. Please contact the service directly using the provided links or phone numbers to ask.';
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
                alert('Text-to-speech is not supported in your browser.');
            }
        });
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            if (e.target.value === 'en') {
                alert('English view toggled! The AI chat will reply in English.');
            }
        });
    }
});