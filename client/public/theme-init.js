(function () {
  try {
    // Dark by default. Only use light if the visitor chose it with the Theme button.
    var saved = localStorage.getItem('theme');
    document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark';
  } catch (e) {
    /* storage unavailable: keep the default dark theme */
  }
})();