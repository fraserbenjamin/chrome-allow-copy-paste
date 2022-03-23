document.getElementById("btnToggleEnabled").addEventListener("click", () => {
    // Toggle Site Enabled
    console.log("Toggle Enabled");
    enableCopyPaste();
});


const enableCopyPaste = async () => {
    const currentTab = await getCurrentTab();
    const hostname = new URL(currentTab.url).hostname.replace("www.", "");
    
    const enabledSites = await getChromeValue("enabledSites");
    if(Array.isArray(enabledSites)) {
        if(!enabledSites.includes(hostname)) setChromeValue("enabledSites", [...enabledSites, hostname]);
    } else {
        setChromeValue("enabledSites", [hostname]);
    }

    sendMessage({
        type: "enable"
    });
}

const sendMessage = async (message) => {
    const currentTab = await getCurrentTab();
    chrome.tabs.sendMessage(currentTab.id, message);
}

const getCurrentTab = async () => new Promise((resolve) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const currentTab = tabs[0]; // there will be only one in this array
        resolve(currentTab);
    });
});

const getChromeValue = async (key) => new Promise((resolve) => {
    chrome.storage.sync.get([key], function (result) {
        resolve(result[key]);
    });
});

const setChromeValue = async (key, value) => new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, function () {
        resolve();
    });
});