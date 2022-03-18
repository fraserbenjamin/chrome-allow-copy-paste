console.log("Extension Active")
const blackList = ["copy", "paste"];


console.log(window.document.body)
console.log(window.document.body?.innerHTML)
Window.prototype._addEventListener = window.addEventListener;

Window.prototype.addEventListener = function (type, listener, useCapture = false) {
  // declare listener
  console.log("Add Listener")
  console.log({ type })
  if (false) this._addEventListener(type, listener, useCapture);

  // if (!this.eventListenerList) this.eventListenerList = {};
  // if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

  // add listener to  event tracking list
  // this.eventListenerList[type].push({ type, listener, useCapture });
};


window.aaa = "Test"
console.log("Extension Window", window)


// const removeEventListeners = () => {
//   const listeners = window.getEventListeners();
//   console.log(listeners)

//   if (listeners.copy) listeners.copy.forEach(element => {
//     window.removeEventListener("copy", element.listener);
//   });

//   if (listeners.paste) listeners.paste.forEach(element => {
//     window.removeEventListener("paste", element.listener);
//   });

//   console.log(window.getEventListeners())
// }

// removeEventListeners();

// setTimeout(() => removeEventListeners(), 2000)