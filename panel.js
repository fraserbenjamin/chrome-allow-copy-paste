const blockListener = `
console.log("Disabling Adding Listeners");
Window.prototype._addEventListener = Window.prototype.addEventListener;
Window.prototype.addEventListener = function(type,listener,useCapture=false) {
  if(type !== "copy" && type !== "paste") this._addEventListener(type,listener,useCapture);
};
`;

const installBlockListener = () => {
  chrome.devtools.inspectedWindow.reload({ injectedScript: blockListener });
}

document.getElementById("test").addEventListener("click", installBlockListener);