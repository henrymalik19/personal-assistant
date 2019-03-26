function reloadTab(id) {
    console.log(`Reloading Tab: ${id}`);
    chrome.tabs.reload(id);
}

function createTab(url) {
    console.log(`Opening ${url} in a New Tab`);
    chrome.tabs.create({
        url: url
    });
}

function menu(command, TabID, options) {
    switch (command) {
        case 'reload':
            reloadTab(TabID);
            break;
        case 'new tab':
            createTab(options.url);
            break;
        default:
            console.log('Default CMD')
            break;
    }  
}

module.exports = menu;
// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    // else if(msg.transcript.includes('close tab')) {
    //     console.log("Closing Tab...");
    //     chrome.tabs.remove(sender.tab.id);
    // }
    // else if(msg.transcript.includes('go to')) {
    //     let url = `https://${msg.transcript.split('go to')[1].trim()}`;

    //     console.log("Updating Tab...");
    //     chrome.tabs.update({
    //         url: url
    //     });
    // }
    // else if(msg.transcript.includes('go back')) {
    //     console.log("Going Back...");
    //     chrome.tabs.goBack();
    // }
    // else if(msg.transcript.includes('go forward')) {
    //     console.log("Going Forward...");
    //     chrome.tabs.goForward();
    // }
// });