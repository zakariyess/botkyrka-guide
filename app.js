document.addEventListener('DOMContentLoaded', () => {
    // --- 1. AI CHATT LOGIK (SVENSKA & ENGLISH) ---
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');
    const langSelect = document.getElementById('lang-select');

    if (sendBtn && userInput && chatOutput) {
        function handleSend() {
            const query = userInput.value.trim().toLowerCase();
            if (!query) return;

            const currentLang = langSelect ? langSelect.value : 'sv';
            appendMessage(currentLang === 'en' ? 'You' : 'Du', userInput.value);
            userInput.value = '';

            setTimeout(() => {
                const botReply = generateResponse(query, currentLang);
                appendMessage('Botkyrka AI', botReply);
            }, 500);
        }

        function generateResponse(text, lang) {
            const isEn = lang === 'en';

            // Språkfrågor / Languages spoken by staff
            if (text.includes('språk') || text.includes('language') || text.includes('talar') || text.includes('speak')) {
                return isEn 
                    ? 'I do not have information about which specific languages the staff speak. Please contact Fittja Library directly at +46 8-530 626 40 to ask.'
                    : 'Jag har tyvärr ingen information om vilka specifika språk personalen talar. Kontakta Fittja bibliotek direkt på 08-530 626 40 för att fråga.';
            }
            // Digital hjälp / Digital support
            else if (text.includes('digital') || text.includes('dator') || text.includes('it-hjälp') || text.includes('internet') || text.includes('computer')) {
                return isEn 
                    ? 'For digital services, computer assistance, and printing, Fittja Library is your primary location. General guidance is also available at Citizen Center Tumba.'
                    : 'För hjälp med digitala tjänster, datorer och utskrifter är Fittja bibliotek den bästa platsen. Allmän vägledning finns även på Medborgarkontoret i Tumba.';
            }
            // Öppettider / Hours
            else if (text.includes('öppet') || text.includes('tid') || text.includes('hour') || text.includes('open')) {
                return isEn 
                    ? 'Citizen Center Tumba is open Mon–Fri 09:00–16:30. Fittja Library is open Mon–Thu 10:00–19:00 and Fri 10:00–17:00.'
                    : 'Medborgarkontoret Tumba har öppet Mån–Fre 09:00–16:30. Fittja bibliotek har öppet Mån–Tors 10:00–19:00 och Fre 10:00–17:00.';
            } 
            // Bistånd & Ekonomi / Financial support
            else if (text.includes('bistånd') || text.includes('pengar') || text.includes('ekonomi') || text.includes('stöd') || text.includes('money') || text.includes('benefit')) {
                return isEn 
                    ? 'To apply for financial support, prepare 3 months of bank statements and rent receipts. Apply online via Botkyrka Municipality’s e-service using BankID.'
                    : 'För att ansöka om försörjningsstöd behöver du förbereda 3 månaders kontoutdrag och hyresavier. Ansökan görs via Botkyrka kommuns e-tjänst med BankID.';
            } 
            // Telefon & Kontakt / Phone & Contact
            else if (text.includes('telefon') || text.includes('ring') || text.includes('nummer') || text.includes('kontakt') || text.includes('phone') || text.includes('call')) {
                return isEn 
                    ? 'You can reach Botkyrka Municipality Contact Center at +46 8-530 610 00 (weekdays). Fittja Library can be reached at +46 8-530 626 40.'
                    : 'Du kan nå Botkyrka kommuns kontaktcenter på 08-530 610 00 (vardagar). Fittja bibliotek nås på 08-530 626 40.';
            } 
            // Adress & Plats / Address & Location
            else if (text.includes('adress') || text.includes('var') || text.includes('ligger') || text.includes('hitta') || text.includes('where') || text.includes('address')) {
                return isEn 
                    ? 'Citizen Center: Tumba Torg 101. Fittja Library: Fittja Torg 3. Social Services: Munkhättevägen 45, Tumba.'
                    : 'Medborgarkontoret: Tumba Torg 101. Fittja bibliotek: Fittja Torg 3. Socialtjänsten: Munkhättevägen 45, Tumba.';
            } 
            // Hälsningar / Greetings
            else if (text.includes('hej') || text.includes('tjena') || text.includes('hallo') || text.includes('hi') || text.includes('hello')) {
                return isEn 
                    ? 'Hello! I can answer questions about opening hours, addresses, contact details, and digital assistance in Botkyrka.'
                    : 'Hej! Jag kan svara på frågor om öppettider, adresser, kontaktuppgifter och digital hjälp i Botkyrka.';
            } 
            // Fallback om information saknas
            else {
                return isEn 
                    ? 'I do not have that specific information in my database. Please contact the service directly using the provided links or phone numbers to ask.'
                    : 'Jag har tyvärr inte den specifika informationen i min databas. Vänligen kontakta verksamheten direkt via telefon eller länkarna för att fråga.';
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
                card.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    // --- 3. DYNAMISK ÖVERSÄTTNING & TILLGÄNGLIGHET ---
    const ttsBtn = document.getElementById('tts-btn');

    const translations = {
        sv: {
            headerTitle: "Botkyrka Assistent & Vägvisare",
            headerSubtitle: "Hitta rätt kommunal service och stöd i Botkyrka",
            searchPlaceholder: "Sök service eller plats...",
            ttsText: "🔊 Läs upp text",
            chatTitle: "Botkyrka AI-Assistent",
            privacyWarning: "⚠️ Observera: Skriv inte in personnummer, BankID-koder eller känslig personlig information här.",
            initialBotMsg: "Botkyrka AI: Hej! Fråga mig om öppettider, adresser, kontaktuppgifter eller digital hjälp i Botkyrka.",
            inputPlaceholder: "Skriv din fråga här...",
            sendBtnText: "Skicka",
            card1Title: "1. Medborgarkontoret Tumba",
            card1Desc: "Få hjälp med konsumentvägledning, blanketter och allmänna frågor.",
            card2Title: "2. Fittja Bibliotek & Digital Hjälp",
            card2Desc: "Låna böcker, använda datorer, skriva ut och få hjälp med digitala tjänster.",
            card3Title: "3. Socialtjänstens Mottagning",
            card3Desc: "Rådgivning och akut stöd för vuxna och familjer.",
            labels: { address: "Adress", hours: "Öppettider", phone: "Telefon" }
        },
        en: {
            headerTitle: "Botkyrka Assistant & Guide",
            headerSubtitle: "Find municipal services and support in Botkyrka",
            searchPlaceholder: "Search service or location...",
            ttsText: "🔊 Read Aloud",
            chatTitle: "Botkyrka AI Assistant",
            privacyWarning: "⚠️ Note: Do not enter personal identity numbers, BankID codes, or sensitive personal information here.",
            initialBotMsg: "Botkyrka AI: Hello! Ask me about opening hours, addresses, contact info, or digital aid in Botkyrka.",
            inputPlaceholder: "Type your question here...",
            sendBtnText: "Send",
            card1Title: "1. Citizen Center Tumba",
            card1Desc: "Get assistance with consumer guidance, forms, and general inquiries.",
            card2Title: "2. Fittja Library & Digital Aid",
            card2Desc: "Borrow books, use computers, print, and get help with digital services.",
            card3Title: "3. Social Services Reception",
            card3Desc: "Guidance and emergency support for adults and families.",
            labels: { address: "Address", hours: "Hours", phone: "Phone" }
        }
    };

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            const t = translations[lang];

            document.getElementById('header-title').textContent = t.headerTitle;
            document.getElementById('header-subtitle').textContent = t.headerSubtitle;
            document.getElementById('search-input').placeholder = t.searchPlaceholder;
            document.getElementById('tts-btn').textContent = t.ttsText;
            document.getElementById('chat-title').textContent = t.chatTitle;
            
            const warningEl = document.getElementById('privacy-warning');
            if (warningEl) warningEl.innerHTML = t.privacyWarning;

            const inputEl = document.getElementById('user-input');
            if (inputEl) inputEl.placeholder = t.inputPlaceholder;

            const btnEl = document.getElementById('send-btn');
            if (btnEl) btnEl.textContent = t.sendBtnText;

            document.querySelector('#card-1 .card-title').textContent = t.card1Title;
            document.querySelector('#card-1 .card-desc').textContent = t.card1Desc;
            document.querySelector('#card-2 .card-title').textContent = t.card2Title;
            document.querySelector('#card-2 .card-desc').textContent = t.card2Desc;
            document.querySelector('#card-3 .card-title').textContent = t.card3Title;
            document.querySelector('#card-3 .card-desc').textContent = t.card3Desc;

            document.querySelectorAll('.label-address').forEach(el => el.textContent = t.labels.address);
            document.querySelectorAll('.label-hours').forEach(el => el.textContent = t.labels.hours);
            document.querySelectorAll('.label-phone').forEach(el => el.textContent = t.labels.phone);
        });
    }

    if (ttsBtn) {
        ttsBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const mainText = document.querySelector('main').innerText;
                const utterance = new SpeechSynthesisUtterance(mainText);
                utterance.lang = langSelect && langSelect.value === 'en' ? 'en-US' : 'sv-SE';
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Text-to-speech is not supported in your browser.');
            }
        });
    }
});