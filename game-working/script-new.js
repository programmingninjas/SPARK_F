const initialListItems = document.querySelectorAll(".draggable-list li");
const imageListItems = document.querySelectorAll(".draggable-list img");
const endMessage = document.getElementById("endMessage");

// Variables to store clicked elements
let selectedInitial = null;
let selectedImage = null;

// Counter for correct matches
let matchingCounter = 0;

addEventListeners();

function clickInitial() {
  // If an initial is already selected, remove the "selected" class
  if (selectedInitial) {
    selectedInitial.classList.remove("selected");
  }

  // Mark the clicked initial as selected
  this.classList.add("selected");
  selectedInitial = this;
}

function clickImage() {
  // If an image is already selected, remove the "selected" class
  if (selectedImage) {
    selectedImage.classList.remove("selected");
  }

  // Mark the clicked image as selected
  this.classList.add("selected");
  selectedImage = this;

  // Check for a match
  if (selectedInitial && selectedImage) {
    if (checkForMatch(selectedInitial.id, selectedImage.parentElement.id)) {
      selectedInitial.style.display = "none";
      selectedImage.parentElement.style.display = "none";
      matchingCounter++;
    } else if (
      checkForMatch2(selectedInitial.id, selectedImage.parentElement.id)
    ) {
      selectedInitial.style.display = "none";
      selectedImage.parentElement.style.display = "none";
      matchingCounter++;
    }

    // Reset the selected elements
    selectedInitial.classList.remove("selected");
    selectedImage.classList.remove("selected");
    selectedInitial = null;
    selectedImage = null;

    // Check if all matches are found
    if (matchingCounter === 5) {
      endMessage.style.display = "block";
    }
  }
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
  initialListItems.forEach((item) => {
    document.getElementById(item.id).style.display = "block";
  });
  imageListItems.forEach((item) => {
    document.getElementById(item.parentElement.id).style.display = "block";
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
  initialListItems.forEach((item) => {
    item.addEventListener("click", clickInitial);
  });

  imageListItems.forEach((item) => {
    item.addEventListener("click", clickImage);
  });
}
