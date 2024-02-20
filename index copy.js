const solutionDisplayContainer = document.getElementById("solution");
const form = document.getElementById("form");
const input = form.querySelectorAll('input[type="number"]');
let slots = document.querySelectorAll(".slot");

let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"];

let maxColor = 6;
let maxProposition = 4;
let solution = [];
let proposition = [];
let goodPlaceColor = [];
let goodPlaceIndex = [];
let goodColor = [];
let tryCounter = 0;

//Create a random solution
const randomNumber = () => Math.floor(Math.random() * maxColor);
const randomSolution = () => {
  for (let i = 0; i < maxProposition; i++) {
    let number;
    number = randomNumber();
    solution.push(number);
  }
  console.log("la solution est " + solution);
};
randomSolution();

//Create a container for the all available colors
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

//create a container for propositions slots
const propositionSlotContainerDisplay = () => {
  let propositionSlotContainer = document.querySelector(".user-color-choices-container");
  for (let i = 0; i < maxProposition; i++) {
    let propositionSlot = document.createElement("div");
    propositionSlot.classList.add("slot");
    // propositionSlot.dataset.color = i;
    propositionSlotContainer.appendChild(propositionSlot);
  }
};
propositionSlotContainerDisplay();

//push current proposition to the porposition array
const setCurrentProposition = () => {
  proposition = [];
  slots.forEach((slot) => {
    proposition.push(parseInt(slot.dataset.color));
  });
  console.log("la proposition est " + proposition);
};

//Check if the proposition is full
let allInputHasValue = true;
const checkInputValue = (e) => {
  console.log("check for value");
  allInputHasValue = true;
  slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    if (!slot.dataset.color) {
      allInputHasValue = false;
    }
  });
};

//Add event listeners to drag colors to the slots
document.querySelectorAll(".circle").forEach((circle) => {
  circle.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("color", e.target.style.backgroundColor);
    e.dataTransfer.setData("index", e.target.dataset.color);
  });
});

document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
    // const color = e.dataTransfer.getData("color");
    e.currentTarget.style.transform = "scale(1.1)";
    // e.target.style.backgroundColor = color;
  });
  slot.addEventListener("dragleave", (e) => {
    e.currentTarget.style.transform = "scale(1)";
  });
  slot.addEventListener("drop", (e) => {
    const color = e.dataTransfer.getData("color");
    const index = e.dataTransfer.getData("index");
    // e.preventDefault();
    e.target.style.backgroundColor = color;
    e.target.dataset.color = index;
  });
});

//Check if the proposition is correct
const masterMind = () => {
  tryCounter++;
  goodPlaceColor = [];
  goodPlaceIndex = [];
  goodColor = [];
  let a = proposition;
  let b = solution;

  const goodPlaceChecker = () => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        goodPlaceColor.push(a[i]);
        goodPlaceIndex.push(i);
      }
    }
    a = a.filter((_, index) => !goodPlaceIndex.includes(index));
    b = b.filter((_, index) => !goodPlaceIndex.includes(index));
  };

  const goodColorChecker = () => {
    for (let i = 0; i < a.length; i++) {
      if (b.includes(a[i])) {
        goodColor.push(a[i]);
        let goodColorIndexB = b.indexOf(a[i]);
        b = b.filter((_, index) => index !== goodColorIndexB);
        a = a.filter((_, index) => index !== i);
        goodColorChecker();
      }
    }
  };
  goodPlaceChecker();
  goodColorChecker();
};

// input.forEach((input) => {
//   input.addEventListener("change", (e) => {
//     if (e.target.value > maxColor) {
//       e.target.value = 1;
//     }
//     if (e.target.value < 1) {
//       e.target.value = 4;
//     }
//     input.style.backgroundColor = colors[e.target.value - 1];
//     // input.style.color = colors[e.target.value - 1];
//   });
// });

//check if the game is over by time or if the proposition is correct
let gameIsOver;
const gameIsOverChecker = () => {
  if (goodPlaceColor?.length === maxProposition || tryCounter === 10) {
    return true;
  } else {
    return false;
  }
};

//display winning or loosing message
const showResult = () => {
  resultDisplay = document.getElementById("result");
  console.log(goodPlaceColor.length);
  if (goodPlaceColor.length == maxProposition) {
    resultDisplay.innerHTML = `<div>
  <h2> VICTORY!! En ${tryCounter} essais</h2></div>
  <iframe src="https://gifer.com/embed/6U6m" width=480 height=294.857 frameBorder="0" allowFullScreen></iframe><p>`;
  } else {
    resultDisplay.innerHTML = `<div><h2> GAME OVER!! </h2>
    <p> Solution was: ${solution
      .map((solution) => {
        return `<span class="span-color" style="background-color: ${colors[solution]}"></span>`;
      })
      .join("")} </p></div>
    <iframe src="https://giphy.com/embed/I9GcmsIALWIUw" width="480" height="381" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

  `;
  }
};

//display current try result
showCurrentTryResult = () => {
  let wrongColorAndPlace = maxProposition - goodPlaceColor.length - goodColor.length;
  let wrongColorAndPlaceSpans = "";

  for (let i = 0; i < wrongColorAndPlace; i++) {
    wrongColorAndPlaceSpans += `<span class="result-box_pin" style="background-color: rgba(255, 255, 255, 0.259)
    "></span>`;
  }

  solutionDisplayContainer.innerHTML += `
  <div class="try-container">
  <p>  ${tryCounter}/10 </p>
  <p>${proposition
    .map((proposition) => {
      return `<span class="span-color" style="background-color: ${colors[proposition]}"></span>`;
    })
    .join("")}</p>
       <div class="result-box" data-id=${tryCounter}>
       ${goodPlaceColor
         .map((goodPlaceColor) => {
           return `<span class="result-box_pin" style="background-color: red"></span>`;
         })
         .join("")}
       ${goodColor
         .map((goodColor) => {
           return `<span class="result-box_pin" style="background-color: white"></span>`;
         })
         .join("")}
               ${wrongColorAndPlaceSpans}
  `;

  const text = `${goodPlaceColor.length} bien place, ${goodColor.length} de la bonne couleur`;
  let hoverDiv = document.createElement("div");
  hoverDiv.classList.add("result-box_hover");
  hoverDiv.dataset.id = tryCounter;
  hoverDiv.innerHTML = text;
  hoverDiv.style.position = "absolute";
  hoverDiv.style.left = "200vh";
  hoverDiv.style.top = "200vh";
  document.body.appendChild(hoverDiv);

  const allPinBox = document.querySelectorAll(".result-box");
  const allHoverDiv = document.querySelectorAll(".result-box_hover");
  allPinBox.forEach((box) => {
    box.addEventListener("mouseover", (e) => {
      let id = e.target.dataset.id;
      for (let i = 0; i < allHoverDiv.length; i++) {
        if (allHoverDiv[i].dataset.id === id) {
          allHoverDiv[i].style.display = "block";
          allHoverDiv[i].style.left = `${e.pageX + 20}px`;
          allHoverDiv[i].style.top = `${e.pageY + 20}px`;
        }
      }
    });

    box.addEventListener("mouseout", (e) => {
      let id = e.target.dataset.id;
      for (let i = 0; i < allHoverDiv.length; i++) {
        if (allHoverDiv[i].dataset.id === id) {
          allHoverDiv[i].style.left = "200vh";
          allHoverDiv[i].style.top = "200vh";
          allHoverDiv[i].style.display = "none";
        }
      }
    });

    scrollToBottom();
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (gameIsOver) {
    return;
  }

  checkInputValue();
  if (!allInputHasValue) return;
  if (allInputHasValue) {
    setCurrentProposition();
    masterMind();
  }

  gameIsOver = gameIsOverChecker();

  showCurrentTryResult();
  if (gameIsOver) {
    showResult();
    form.innerHTML = "";
  }
});

function scrollToBottom() {
  const container = document.getElementById("solution");
  container.scrollTop = container.scrollHeight;
}
