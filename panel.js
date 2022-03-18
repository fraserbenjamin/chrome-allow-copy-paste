// test = "alert('Hi')";

// chrome.devtools.inspectedWindow.eval(test);

// chrome.devtools.inspectedWindow.eval(
//   "inspect($$('head script[data-soak=main]')[0])",
//   function (result, isException) { }
// );



// let win = chrome.devtools.inspectedWindow
// let code = `
// (function () {
//     let doc = window.document
//     let insertFrm = doc.createElement('IFRAME')
//     insertFrm.src = 'about:runner'
//     body.appendChild(insertFrm)
// })()`
// win.eval(code, function (result, error) {
//     if (error) {
//         console.log('Eror in insertFrame(), result:', result)
//         console.error(error)
//     } else {
//         let code = `
//         (function () {
//             let doc = window.document
//             let sc = doc.createElement('script')
//             sc.src = '${chrome.runtime.getURL('views/index.js')}'
//             doc.head.appendChild(sc)
//         })()`
//         win.eval(code, { frameURL: 'about:bela-runner' }, function (result, error) {
//             if (error) {
//                 console.log('Eror in insertFrame(), result:', result)
//                 console.error(error)
//             }
//         })
//     }
// })



const blockListener = `
console.log("Disabling Adding Listeners");
Window.prototype._addEventListener = Window.prototype.addEventListener;
Window.prototype.addEventListener = function(type,listener,useCapture=false) {
  // declare listener
  if(type !== "copy" && type !== "paste") this._addEventListener(type,listener,useCapture);
};
`;

const installBlockListener = () => {
  chrome.devtools.inspectedWindow.reload({ injectedScript: blockListener });
}

console.log("Init")
chrome.devtools.inspectedWindow.eval('console.log(' + "Hiya" + ');');
chrome.devtools.inspectedWindow.eval("document.body.style.backgroundColor ='red';");
console.log(chrome.devtools.inspectedWindow.getResources(console.log));
console.log(chrome.devtools.inspectedWindow);

document.getElementById("test").addEventListener("click", () => {
  chrome.devtools.inspectedWindow.eval('console.log(' + "Bye" + ');');
  chrome.devtools.inspectedWindow.eval('window.aaa="Test";');
  chrome.devtools.inspectedWindow.eval("document.body.style.backgroundColor ='blue';");

  chrome.devtools.inspectedWindow.reload({ injectedScript: blockListener });
  // chrome.devtools.inspectedWindow.reload({ injectedScript: () => console.log("Hello World") });

  // chrome.devtools.inspectedWindow.reload({
  //   injectedScript: () => {
  //     console.log("Disabling Adding Listeners");

  //     Window.prototype._addEventListener = Window.prototype.addEventListener;
  //     Window.prototype.addEventListener = function (type, listener, useCapture = false) {
  //       console.log(type)
  //       // declare listener
  //       if (type !== "copy" && type !== "paste") this._addEventListener(type, listener, useCapture);
  //     };
  //   }
  // });


  // chrome.runtime.onInstalled.addListener(() => {
  //   chrome.windows.getCurrent(function (currentWindow) {
  //     chrome.tabs.query({ windowId: currentWindow.id }, function (activeTabs) {
  //       activeTabs.map(function (tab) {
  //         console.log("Tab ID", tab.id)
  //         chrome.scripting.executeScript(
  //           {
  //             target: { tabId: tab.id },
  //             func: () => console.log("Test!"),
  //           },
  //           () => {
  //             console.log("I'm here")
  //           });
  //       });
  //     });
  //   });
  // })


  // chrome.devtools.inspectedWindow.eval("window", null, console.log);
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request);
    chrome.devtools.inspectedWindow.eval(blockListener);
    sendResponse();
  }
);