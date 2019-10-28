let fillIn = document.getElementById('fill-in');
let fillInSubmit = document.getElementById('fill-in-submit');

const activeCurrent = {
  active: true, currentWindow: true
};

fillIn.addEventListener('click', () => {
  chrome.tabs.query(activeCurrent, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { file: 'autoFill.js' });
  });
});

fillInSubmit.addEventListener('click', () => {
  chrome.tabs.query(activeCurrent, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { file: 'autoSubmit.js' });
  });
});
