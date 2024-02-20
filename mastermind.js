const solutionDisplayContainer = document.getElementById("solution");
const form = document.getElementById("form");
const input = form.querySelectorAll('input[type="number"]');
let slots = document.querySelectorAll(".slot");
let difficultyRange = document.querySelector("#difficulty-range");
let difficultyValue = document.querySelector("#difficulty-value");
const playBtn = document.getElementById("play-btn");
modal = document.querySelector(".modal");

let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"];
let gameStarted = false;
class Mastermind {
  constructor(solution, proposition, propositionSize, colorSize, maxTry) {
    this.solution = solution;
    this.proposition = proposition;
    this.propositionSize = propositionSize;
    this.colorSize = parseInt(colorSize);
    this.tryCounter = 0;
    this.maxTry = maxTry;
    this.goodPlaceAndColor = [];
    this.goodColorOnly = [];
  }

  goodPlaceChecker(solution, proposition) {
    for (let i = this.proposition.length - 1; i >= 0; i--) {
      if (proposition[i] === solution[i]) {
        this.goodPlaceAndColor.push(proposition[i]);
        proposition.splice(i, 1);
        solution.splice(i, 1);
      }
    }
  }

  goodColorChecker(solution, proposition) {
    for (let i = this.proposition.length - 1; i >= 0; i--) {
      for (let j = this.proposition.length - 1; j >= 0; j--)
        if (proposition[i] === solution[j]) {
          this.goodColorOnly.push(proposition[i]);
          proposition.splice(i, 1);
          solution.splice(j, 1);
        }
    }
  }

  currentTry() {
    const proposition = this.proposition;
    const solution = this.solution;
    this.tryCounter++;
    this.goodPlaceChecker(solution, proposition);
    this.goodColorChecker(solution, proposition);
  }

  newGame = () => {
    let gameDisplay = new GameDisplay(mastermind);
    gameDisplay.colorChoiceContainerDisplay();
    gameDisplay.difficultyDisplay();
  };
}

// mastermind.currentTry();
const difficulty = (e) => {
  switch (e.target.value) {
    case "4":
      return "easy";
    case "5":
      return "medium";
    case "6":
      return "hard";
    case "7":
      return "extreme";
    default:
      break;
  }
};

class MastermindDisplay {
  constructor(mastermind) {
    this.mastermind = mastermind;
  }

  gameDisplay() {
    form.classList.remove("hidden");
  }
}
class GameDisplay {
  constructor(mastermind) {
    this.mastermind = mastermind;
  }

  difficulty() {
    switch (this.mastermind.colorSize) {
      case 4:
        return "easy";
      case 5:
        return "medium";
      case 6:
        return "hard";
      case 7:
        return "extreme";
      default:
        break;
    }
  }

  colorChoiceContainerDisplay() {
    let colorChoicesContainer = document.querySelector(".color-choices-container");
    console.log(colorChoicesContainer);
    colorChoicesContainer.innerHTML = "";
    for (let i = 0; i < this.mastermind.colorSize; i++) {
      let colorChoice = document.createElement("div");
      colorChoice.classList.add("circle");
      colorChoice.draggable = true;
      colorChoice.dataset.color = i;
      colorChoice.style.backgroundColor = colors[i];
      colorChoicesContainer.appendChild(colorChoice);
    }
    gsap.from(".circle", {
      y: -600,
      rotate: 160,
      opacity: 0,
      duration: 1,
      stagger: {
        each: 0.1,
        from: "random",
        // yoyo: true,
        // repeat: -1,
      },
      ease: "bounce.out",
    });
  }

  difficultyDisplay() {
    difficultyValue.innerHTML = this.difficulty();
  }
}

difficultyRange.addEventListener("change", (e) => {
  mastermind = new Mastermind([1, 1, 1], [1, 1, 5], 10, e.target.value, 4);
  mastermind.newGame();
});

let mastermind = new Mastermind([1, 1, 1], [1, 1, 5], 1, 4, 1);
mastermind.newGame();

const colorChoiceContainerDisplay = () => {
  let colorChoicesContainer = document.querySelector(".color-choices-container-game");
  let modalCicle = document.querySelectorAll(".circle");
  let x;
  let y;
  if (modalCicle.length > 0) {
    let firstElement = modalCicle[0];
    let rect = firstElement.getBoundingClientRect();
    x = rect.left;
    y = rect.top;
    console.log("X:", x, "Y:", y);
  }

  colorChoicesContainer.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    let colorChoice = document.createElement("div");
    colorChoice.classList.add("circle-2");
    colorChoice.draggable = true;
    colorChoice.dataset.color = i;
    colorChoice.style.backgroundColor = colors[i];
    colorChoicesContainer.appendChild(colorChoice);
  }
  let modalCicle2 = document.querySelectorAll(".circle-2");
  let y2;
  if (modalCicle.length > 0) {
    let firstElement = modalCicle2[0];
    let rect = firstElement.getBoundingClientRect();
    y2 = rect.top;
    console.log(y2, y);
  }
  gsap.from(".circle-2", {
    y: -(y2 - y),
    rotate: 160,
    opacity: 1,
    duration: 1,
    stagger: {
      each: 0.1,
      from: "left",
      // yoyo: true,
      // repeat: -1,
    },
    ease: "bounce.out",
  });
  modal.classList.add("hidden");
};

// colorChoiceContainerDisplay();

playBtn.addEventListener("click", (e) => {
  gameStarted = true;

  colorChoiceContainerDisplay();
  console.log("game started");
});
