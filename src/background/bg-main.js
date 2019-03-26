const menu = require('./bg-commands.js');

chrome.contentSettings.microphone.set({
    primaryPattern: 'https://*/*',
    setting: "allow"
});

let tabState = {
    previous: '',
    current: '',
    openTabs: []
}

chrome.tabs.query({}, (tabArray) => {
    tabState.openTabs = tabArray;
});

chrome.tabs.query({
    active: true,
    currentWindow: true
}, (tabArray) => {
    tabState.current = {
        tabId: tabArray[0].id,
        windowId: tabArray[0].windowId
    }
});

// Listen for Active Tab Change Events
chrome.tabs.onActivated.addListener(activeTab => {
    
    tabState = {
        previous: tabState.current,
        current: activeTab,
        openTabs: tabState.openTabs
    }
    console.log(tabState);

    chrome.tabs.sendMessage(tabState.previous.tabId, {run: "stopRecognition", currentTab: false});
    chrome.tabs.sendMessage(tabState.current.tabId, {run: "startRecognition", currentTab: true});
})

// Listen to Command Messages from Tabs
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    menu(msg.command, sender.tab.id, msg.options);
});