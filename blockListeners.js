console.log("Disabling Adding Listeners");

Window.prototype._addEventListener = Window.prototype.addEventListener;
Window.prototype.addEventListener = function (type, listener, useCapture = false) {
  console.log(type)
  // declare listener
  if (type !== "copy" && type !== "paste") this._addEventListener(type, listener, useCapture);
};