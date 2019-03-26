function sendtoBackground(cmd, options) {
    chrome.runtime.sendMessage({
        command: cmd,
        options: options ? options : null
    });
}

function parseTranscript(transcript) {
    console.log(`Transcript: ${transcript}`);

    if(transcript.includes('click')) {
        let query = transcript.split('on')[1].trim();
        let links = Array.from(document.getElementsByTagName('a'));
        let link = links.find( li => li.innerText.trim().toLowerCase() === query.toLowerCase());
        console.log(query, link.href);
        location.assign(link.href);
    } 
    else if(transcript.includes('reload')) {
        console.log("Reloading Tab...");
        sendtoBackground('reload');
    }
    else if(transcript.includes('new tab')) {
        let url = `https://${transcript.split('in')[0].trim().split(' ')[1]}`;
        console.log("Creating New Tab...");
        sendtoBackground('new tab', {url: url});
    }    
}

module.exports = parseTranscript;