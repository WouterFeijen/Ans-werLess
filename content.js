chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    toggle_answers(request.hide);
  }
})

function toggle_answers(shouldHide) {
  // ---=| Hide Answers |=---
  if (shouldHide) {
    console.log("Content Script: Hiding answers now...");

    // handle icons
    document.querySelectorAll(".material-icons").forEach(icon => {

      // find checked boxes 
      if (icon.textContent.trim() === "check_box") {

        // tag correct answer so we remember
        icon.setAttribute("data-correct-checked","true");
        // change visual to empty box
        icon.textContent = "check_box_outline_blank";
      }
    });


    // handle bold text
    const answerTextElements = document.querySelectorAll(".choice .text-semi-bold");

    // loop through all elements in .choice and .text-semi-bold
    answerTextElements.forEach(el => {
    
      // tag correct answer so we remember
      el.setAttribute("data-correct-bold", "true");

      // force fontWeight to be normal
      el.style.setProperty("font-weight", "normal", "important");
    });
  } 
  
  // ---=| Show Answers |=---
  else {
    console.log("Content Script: Restoring answers now...");

    // restore icons
    document.querySelectorAll('[data-correct-checked="true"]').forEach(icon => {
      icon.textContent = "check_box";
      // clean up tag
      icon.removeAttribute("data-correct-checked");
    });

    // restore boldness
    document.querySelectorAll('[data-correct-bold="true"]').forEach(el => {
      // el.style.fontWeight = "bold";
      el.style.removeProperty("font-weight");
      el.removeAttribute("data-correct-bold");
    });

  }  
}