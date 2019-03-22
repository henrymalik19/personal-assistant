chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    if(msg.transcript === 'reload') {
        console.log("Reloading Tab...");
        chrome.tabs.reload(sender.tab.id);
    }
    if(msg.transcript === 'new tab') {
        console.log("Creating New Tab...");
        chrome.tabs.create({
            url: 'http://nba.com'
        });
    }
});