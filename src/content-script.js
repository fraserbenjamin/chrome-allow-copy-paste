const enableCopyPaste = () => {
  [].forEach.call(['copy', 'cut', 'paste'], (event) => {
    document.addEventListener(event, (e) => {
      e.stopPropagation();
    }, true);
  });  
}

const hostname = window.location.hostname.replace("www.", "");

chrome.storage.sync.get(['enabledSites'], function(result) {
  if(Array.isArray(result.enabledSites) && result.enabledSites.includes(hostname)) {
    enableCopyPaste();
  }
});

chrome.runtime.onMessage.addListener((e) => {
  if(e.type === "enable") enableCopyPaste();
})