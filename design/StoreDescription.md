# Description

Some websites block your ability to copy and paste text and content from them, this extension works to prevent these restrictions from being added.

There are two features to attempt to remove the restrictions available with this extension. You can navigate to the page you'd like to copy/paste from and click the extension icon in Chrome and then "Allow Copy/Paste". Generally this should work for most sites and allow you to carry on like normal. The extension will also store your preferences so you'll only need to do this once for each site.

However, if that doesn't work you can also open Chrome Developer Tools and select the "Allow Copy/Paste" tab which will then give you a button to reload the page and attempt to prevent the blocking script from being added. https://developer.chrome.com/docs/devtools/open

# Privacy Practices

These are the privacy practice comments submitted for the review process.

## Storage

This allows a list of allowed websites that the extension has been used on to be synced across other devices so the user doesn't need to keep adding them.

## Tabs

This is used to get the URL of the tab so it can be added to the list of user selected sites the extension should be triggered on. It is also used to send messages between the popup and the content script.

## Host Permission

This is to allow the scripts to be easily enabled and run on any site though the script to enable copy/paste will only be run once the user opts in.

## Remote Code

This is needed to prevent specific event listeners being added to the window object of the page which could block a user's ability to copy and paste.

