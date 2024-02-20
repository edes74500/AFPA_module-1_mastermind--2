const solutionDisplayContainer = document.getElementById("solution");
const form = document.getElementById("form");
const input = form.querySelectorAll('input[type="number"]');
let slots = document.querySelectorAll(".slot");

let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"];

const colorChoiceContainerDisplay = () => {
  let colorChoicesContainer = document.querySelector(".color-choices-container");
  for (let i = 0; i < maxColor; i++) {
    let colorChoice = document.createElement("div");
    colorChoice.classList.add("circle");
    colorChoice.draggable = true;
    colorChoice.dataset.color = i;
    colorChoice.style.backgroundColor = colors[i];
    colorChoicesContainer.appendChild(colorChoice);
  }
};
colorChoiceContainerDisplay();
