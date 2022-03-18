// Needs to call method in dev tools to prevent listeners being added
chrome.runtime.sendMessage({greeting: "hello"});