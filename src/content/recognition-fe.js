const parseTranscript = require('./co-commands.js');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
// const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


/*////////////////////////////////////////////////
######## Handle Speech Recognition Events ########
*/////////////////////////////////////////////////
recognition.onresult = (e) => {
    let transcript = e.results[0][0].transcript;

    parseTranscript(transcript);
}

recognition.onerror = (e) => {
    console.log(e);
}

recognition.onend = onEnd;
function onEnd() {
    console.log(`End Event!`);
    recognition.start();
};

console.log("Recognition Started...");
recognition.start();


/*///////////////////////////////////////////////////
### Start Recognition when navigating to that tab ###
*////////////////////////////////////////////////////
function startRecognition() {
    recognition.start();
    recognition.onend = onEnd;
    console.log("Recognition Re-Started...");
}


/*//////////////////////////////////////////////////
######## Stop Recognition when leaving tab ########
*///////////////////////////////////////////////////
function stopRecognition() {
    recognition.stop();
    recognition.onend = null;
    console.log("Recognition Stopped...");
}


/*//////////////////////////////////////////////////////////////////////
############## Listen to Messages from Extension to Start ##############
################# and Stop Recognition on Current Tab ##################
*///////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    if(msg.run === 'startRecognition') {
        startRecognition();

    } else if(msg.run === 'stopRecognition') {
        stopRecognition();
    }
});