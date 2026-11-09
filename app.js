document.getElementById('send-btn').addEventListener('click', function() {
    const inputField = document.getElementById('user-input');
    const outputDiv = document.getElementById('chat-output');
    const userText = inputField.value.trim().toLowerCase();

    if (!userText) return;

    // Lägg till användarens meddelande
    outputDiv.innerHTML += `<p><strong>Du:</strong> ${inputField.value}</p>`;

    let aiResponse = "Jag är en AI-guide för Botkyrka. Prova att fråga om 'ekonomiskt bistånd', 'tumba' eller 'kontakt'.";

    // Enkel regelbaserad "GenAI"-logik för prototypen
    if (userText.includes('bistånd') || userText.includes('ekonomi')) {
        aiResponse = "AI-tips för bistånd: Förbered hyreskontrakt, inkomstuppgifter och kontoutdrag de senaste 3 månaderna innan du kontaktar Socialtjänsten.";
    } else if (userText.includes('tumba') || userText.includes('medborgarkontor')) {
        aiResponse = "Medborgarkontoret i Tumba ligger centralt och hjälper till med blanketter och kommunala tjänster.";
    } else if (userText.includes('kontakt') || userText.includes('ringa')) {
        aiResponse = "Tips för att nå kommunen effektivt: Använd kommunens e-tjänst eller ring via växel under morgonen för kortare kötid.";
    }

    // Lägg till AI-svar
    setTimeout(() => {
        outputDiv.innerHTML += `<p><strong>AI-Assistent:</strong> ${aiResponse}</p>`;
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }, 500);

    inputField.value = '';
});
