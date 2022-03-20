[].forEach.call(['copy', 'cut', 'paste'], (event) => {
  document.addEventListener(event, (e) => {
    e.stopPropagation();
  }, true);
});