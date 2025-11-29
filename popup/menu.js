// get checkbox element
const toggle = document.getElementById('answerToggle');

// add event listener
toggle.addEventListener("change", function(e) {
  const isChecked = e.target.checked;

  if (isChecked) {
    console.log("Switched ON: hiding answers");
  } else {
    console.log("Switch OFF: showing answers");
  }

  // query active tab to send a message to it
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs.length===0) return;

    // send message to content script running on that tab
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggle",
      hide: isChecked
    });
  });
});