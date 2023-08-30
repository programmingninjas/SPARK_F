const draggableListItems = document.querySelectorAll(".draggable-list li");
const endMessage = document.getElementById("endMessage");

// current phrase being dragged
let selectedId;

// target phrase
let dropTargetId;

// counter for correct phrases
let matchingCounter = 0;

addEventListeners();

function dragStart() {
  selectedId = this.id;
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(ev) {
  ev.preventDefault();
}

function dragDrop() {
  dropTargetId = this.id;

  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = "none";
    document.getElementById(dropTargetId).style.display = "none";
    matchingCounter++;
  } else if (checkForMatch2(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = "none";
    document.getElementById(dropTargetId).style.display = "none";
    matchingCounter++;
  }

  if (matchingCounter === 5) {
    endMessage.style.display = "block";
  }

  this.classList.remove("over");
}

function checkForMatch(selected, dropTarget) {
  switch (selected) {
    case "e1":
      return dropTarget === "s1" ? true : false;

    case "e2":
      return dropTarget === "s2" ? true : false;

    case "e3":
      return dropTarget === "s3" ? true : false;

    case "e4":
      return dropTarget === "s4" ? true : false;

    case "e5":
      return dropTarget === "s5" ? true : false;

    default:
      return false;
  }
}

function checkForMatch2(selected, dropTarget) {
  switch (selected) {
    case "s1":
      return dropTarget === "e1" ? true : false;

    case "s2":
      return dropTarget === "e2" ? true : false;

    case "s3":
      return dropTarget === "e3" ? true : false;

    case "s4":
      return dropTarget === "e4" ? true : false;

    case "s5":
      return dropTarget === "e5" ? true : false;

    default:
      return false;
  }
}

function playAgain() {
  matchingCounter = 0;
  endMessage.style.display = "none";
  draggableListItems.forEach((item) => {
    document.getElementById(item.id).style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const homeButton = document.getElementById("homeButton");

  // Home Button Event Listener
  homeButton.addEventListener("click", function () {
    // Redirect to the home page
    window.location.href = "index.html";
  });
});

function addEventListeners() {
  draggableListItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
  });
}
