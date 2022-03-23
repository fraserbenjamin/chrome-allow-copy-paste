const enableCopyPaste = async () => {
    const currentTab = await getCurrentTab();
    const hostname = new URL(currentTab.url).hostname.replace("www.", "");

    sendMessage({
        type: "enable"
    });
    toggleButtons();

    const enabledSites = await getChromeValue("enabledSites");
    if (Array.isArray(enabledSites)) {
        if (!enabledSites.includes(hostname)) setChromeValue("enabledSites", [...enabledSites, hostname]);
    } else {
        setChromeValue("enabledSites", [hostname]);
    }
}

const toggleButtons = () => {
    document.getElementById("btnEnable").classList.toggle("hidden");
    document.getElementById("btnRestore").classList.toggle("hidden");
}

const restoreCopyPaste = async () => {
    toggleButtons();

    const currentTab = await getCurrentTab();
    const hostname = new URL(currentTab.url).hostname.replace("www.", "");

    const enabledSites = await getChromeValue("enabledSites");
    if (Array.isArray(enabledSites) && enabledSites.includes(hostname)) {
        setChromeValue("enabledSites", enabledSites.filter(url => url !== hostname));
    }
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

const init = async () => {
    const currentTab = await getCurrentTab();
    const hostname = new URL(currentTab.url).hostname.replace("www.", "");
    
    document.getElementById("btnEnable").addEventListener("click", enableCopyPaste);
    document.getElementById("btnRestore").addEventListener("click", restoreCopyPaste);

    const enabledSites = await getChromeValue("enabledSites");
    if (Array.isArray(enabledSites) && enabledSites.includes(hostname)) {
        toggleButtons();
    }
};
init();
