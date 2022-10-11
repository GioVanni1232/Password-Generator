const passContainer = document.querySelector(".password");
const incLetter = document.getElementById("letter");
const incNumber = document.getElementById("number");
const incSymbol = document.getElementById("symbol");
const lenghtChanger = document.querySelector(".lenght");
const lenghtModal = document.querySelector(".lenght span");
const passStrength = document.querySelector(".strenght");
const generate = document.querySelector(".generate button");
const spanDisplay = document.querySelectorAll(".display span");

const values = {
  letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "1234567890",
  symbols: "!@%?",
  length: 0,
};

lenghtChanger.addEventListener("input", (e) => {
  lenghtModal.classList.add("active-span");
  lenghtModal.textContent = e.target.value;
  lenghtModal.style.left = `${e.target.value * 6}px`;
  values.length = e.target.value;
});

let password = "";
let strong = "Low";

function generatePassword(lenght) {
  let newLength = lenght;

  if (incNumber.checked && incSymbol.checked && incLetter.checked) {
    newLength = lenght / 3;
    strong = "Strong";
  } else if (
    (incNumber.checked && incSymbol.checked) ||
    (incNumber.checked && incLetter.checked) ||
    (incSymbol.checked && incLetter.checked)
  ) {
    newLength = lenght / 2;
    strong = "Medium";
  }

  if (lenght < 5) {
    strong = "Low";
  } else if (lenght < 10 && lenght >= 5) {
    strong = "Medium";
  } else if (lenght >= 10) {
    strong = "Strong";
  }

  for (let i = 0; i < newLength; i++) {
    if (incLetter.checked) {
      const randomLetter = Math.floor(Math.random() * values.letters.length);
      password += values.letters[randomLetter];
    }
    if (incNumber.checked) {
      const randomNumber = Math.floor(Math.random() * values.numbers.length);
      password += values.numbers[randomNumber];
    }
    if (incSymbol.checked) {
      const randomSymbol = Math.floor(Math.random() * values.symbols.length);
      password += values.symbols[randomSymbol];
    }
  }
  passStrength.textContent = strong;
  passContainer.textContent = password;
}

generate.addEventListener("click", (e) => {
  password = "";

  generatePassword(values.length);

  if (
    values.length === "0" ||
    values.length === 0 ||
    (!incLetter.checked && !incNumber.checked && !incSymbol.checked)
  ) {
    password = "Invalid";
    strong = "Invalid";
    passContainer.textContent = password;
    passStrength.textContent = strong;
  }

  spanDisplay.forEach((e) => {
    if (strong === "Invalid") {
      passStrength.style.color = "red";
      passContainer.style.color = "red";
      e.style.backgroundColor = "red";
    } else if (strong === "Low") {
      e.style.backgroundColor = "blue";
      passStrength.style.color = "white";
      passContainer.style.color = "white";
    } else if (strong === "Medium") {
      e.style.backgroundColor = "grey";
      passStrength.style.color = "white";
      passContainer.style.color = "white";
    } else if (strong === "Strong") {
      e.style.backgroundColor = "green";
      passStrength.style.color = "white";
      passContainer.style.color = "white";
    } else {
      passStrength.style.color = "white";
      passContainer.style.color = "white";
      e.style.backgroundColor = "white";
    }
  });
});
