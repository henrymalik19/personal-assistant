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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
});

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