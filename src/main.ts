import "./style.css";

import boxUndamagedHover from "./assets/boxes/box-undamaged-hover.png";
import boxUndamaged from "./assets/boxes/box-undamaged.png";

import costImg from "./assets/cost.png";
import titleImg from "./assets/ms-paint-clicker.png";
import progressImg from "./assets/progress.png";
import rateImg from "./assets/rate.png";

import lineWeightHovered from "./assets/buttons/line-weight-button-hover.png";
import lineWeightLocked from "./assets/buttons/line-weight-button-locked.png";
import lineWeight from "./assets/buttons/line-weight-button.png";
import saveButtonHovered from "./assets/buttons/save-button-hover.png";
import saveButtonLocked from "./assets/buttons/save-button-locked.png";
import saveButton from "./assets/buttons/save-button.png";
import zoomAmountHovered from "./assets/buttons/zoom-amount-button-hover.png";
import zoomAmountLocked from "./assets/buttons/zoom-amount-button-locked.png";
import zoomAmount from "./assets/buttons/zoom-amount-button.png";

import zeroImg from "./assets/numbers/0.png";
import oneImg from "./assets/numbers/1.png";
import twoImg from "./assets/numbers/2.png";
import threeImg from "./assets/numbers/3.png";
import fourImg from "./assets/numbers/4.png";
import fiveImg from "./assets/numbers/5.png";
import sixImg from "./assets/numbers/6.png";
import sevenImg from "./assets/numbers/7.png";
import eightImg from "./assets/numbers/8.png";
import nineImg from "./assets/numbers/9.png";
import periodImg from "./assets/numbers/period.png";

const digitImages = [
  zeroImg,
  oneImg,
  twoImg,
  threeImg,
  fourImg,
  fiveImg,
  sixImg,
  sevenImg,
  eightImg,
  nineImg,
];

let counter: number = 0;
let counterGrowSpeed: number = 0;

let upgradeOneCost: number = 10;
let upgradeTwoCost: number = 100;
let upgradeThreeCost: number = 1000;

let upgradeOneLocked: boolean = false;
let upgradeTwoLocked: boolean = false;
let upgradeThreeLocked: boolean = false;

document.body.innerHTML = `
  <center><img src=${titleImg} style="margin-bottom: 20px" draggable="false"></center>

  <center><img src="${progressImg}"> &nbsp; <img id="progDigit0" src="${zeroImg}" alt=""> <img id="progDigit1" src="${zeroImg}" alt="">
    <img id="progDigit2" src="${zeroImg}" alt=""> <img id="progDigit3" src="${zeroImg}" alt=""> <img id="progDigit4" src="${zeroImg}" alt="">
    <img id="progDigit5" src="${zeroImg}" alt=""> <img id="progDigit6" src="${zeroImg}" alt=""> <img src="${periodImg}">
    <img id="progDigit7" src="${zeroImg}" alt=""> </center>

  <center> <img src="${rateImg}"> &nbsp; <img id="rateDigit0" src="${zeroImg}" alt=""> <img id="rateDigit1" src="${zeroImg}" alt="">
    <img id="rateDigit2" src="${zeroImg}" alt=""> <img id="rateDigit3" src="${zeroImg}" alt=""> <img src="${periodImg}"> <img id="rateDigit4" src="${zeroImg}" alt=""> </center>

  <center><button id="box"><img id="boxImage" src="${boxUndamaged}" draggable="false" style="margin-bottom: 20px; margin-top: 20px; margin-left: 20px; margin-right: 20px;"></button></center>

  <center> <button id="upgradeOne" style="border: none; background: none; margin-bottom: 8px"><img id="lineWeightImage" src="${lineWeight}" draggable="false"></button>
    <button id="upgradeTwo" style="border: none; background: none; margin-left: 100px"><img id="zoomAmountImage" src= "${zoomAmount}" draggable="false">
    <button id="upgradeThree" style="border: none; background: none; margin-left: 100px"><img id="saveButtonImage" src="${saveButton}" draggable="false"> </center>

  <center> <img src="${costImg}" style="margin-left: 60px" draggable="false"> <img id="lwDigit0" src="${zeroImg}" alt=""> <img id="lwDigit1" src="${zeroImg}" alt=""> <img id="lwDigit2" src="${zeroImg}" style="margin-right: 100px" alt="">
    <img src="${costImg}" style="margin-left: 150px;"> <img id="zaDigits0" src="${zeroImg}" alt=""> <img id="zaDigits1" src="${zeroImg}" alt=""> <img id="zaDigits2" src="${zeroImg}" alt="">
      <img id="zaDigits3" src="${zeroImg}" style="margin-right: 75px" alt="">
    <img src="${costImg}" style="margin-left: 150px;"> <img id="saveDigits0" src="${zeroImg}" alt=""> <img id="saveDigits1" src="${zeroImg}" alt=""> <img id="saveDigits2" src="${zeroImg}" alt=""> <img id="saveDigits3" src="${zeroImg}" alt="">
      <img id="saveDigits4" src="${zeroImg}" alt=""> </center>

  <center> <img src="${rateImg}" draggable="false"> <img src="${zeroImg}"> <img src="${periodImg}"> <img src="${oneImg}">
    <img src="${rateImg}" style="margin-left: 350px;"> <img src="${twoImg}">
    <img src="${rateImg}" style="margin-left: 325px;"> <img src="${fiveImg}"> <img src="${zeroImg}"> </center>
`;

function update(deltaTime: number) {
  incrementTotal(deltaTime * counterGrowSpeed);
  setDigits(deltaTime);
  shakeFrame(deltaTime);
  setButtons();
}

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region HTML ELEMENTS
// ------------------------------------------------------------------------------------------------------------------------------------------------

// box button
const boxElement = document.getElementById("box")!;
boxElement.setAttribute("style", "border: none; background: none;");

// box image
const boxImage = document.getElementById("boxImage")!;

// upgrades
const upgradeOne: HTMLButtonElement = document.getElementById(
  "upgradeOne",
) as HTMLButtonElement;
const upgradeTwo: HTMLButtonElement = document.getElementById(
  "upgradeTwo",
) as HTMLButtonElement;
const upgradeThree: HTMLButtonElement = document.getElementById(
  "upgradeThree",
) as HTMLButtonElement;

const lineWeightElement = document.getElementById("lineWeightImage")!;
const zoomAmountElement = document.getElementById("zoomAmountImage")!;
const saveButtonElement = document.getElementById("saveButtonImage")!;

//#region progress digits
const progDigitElement0: HTMLImageElement = document.getElementById(
  "progDigit0",
) as HTMLImageElement;
const progDigitElement1: HTMLImageElement = document.getElementById(
  "progDigit1",
) as HTMLImageElement;
const progDigitElement2: HTMLImageElement = document.getElementById(
  "progDigit2",
) as HTMLImageElement;
const progDigitElement3: HTMLImageElement = document.getElementById(
  "progDigit3",
) as HTMLImageElement;
const progDigitElement4: HTMLImageElement = document.getElementById(
  "progDigit4",
) as HTMLImageElement;
const progDigitElement5: HTMLImageElement = document.getElementById(
  "progDigit5",
) as HTMLImageElement;
const progDigitElement6: HTMLImageElement = document.getElementById(
  "progDigit6",
) as HTMLImageElement;
const progDigitElement7: HTMLImageElement = document.getElementById(
  "progDigit7",
) as HTMLImageElement;
const progressDigitElements = [
  progDigitElement0,
  progDigitElement1,
  progDigitElement2,
  progDigitElement3,
  progDigitElement4,
  progDigitElement5,
  progDigitElement6,
  progDigitElement7,
];
//#endregion

//#region line weight digits
const lwDigit0: HTMLImageElement = document.getElementById(
  "lwDigit0",
) as HTMLImageElement;
const lwDigit1: HTMLImageElement = document.getElementById(
  "lwDigit1",
) as HTMLImageElement;
const lwDigit2: HTMLImageElement = document.getElementById(
  "lwDigit2",
) as HTMLImageElement;
const lwDigitElements = [
  lwDigit0,
  lwDigit1,
  lwDigit2,
];
//#endregion

//#region zoom amount digits
const zaDigits0: HTMLImageElement = document.getElementById(
  "zaDigits0",
) as HTMLImageElement;
const zaDigits1: HTMLImageElement = document.getElementById(
  "zaDigits1",
) as HTMLImageElement;
const zaDigits2: HTMLImageElement = document.getElementById(
  "zaDigits2",
) as HTMLImageElement;
const zaDigits3: HTMLImageElement = document.getElementById(
  "zaDigits3",
) as HTMLImageElement;
const zaDigitsElements = [
  zaDigits0,
  zaDigits1,
  zaDigits2,
  zaDigits3,
];
//#endregion

//#region save digits
const saveDigits0: HTMLImageElement = document.getElementById(
  "saveDigits0",
) as HTMLImageElement;
const saveDigits1: HTMLImageElement = document.getElementById(
  "saveDigits1",
) as HTMLImageElement;
const saveDigits2: HTMLImageElement = document.getElementById(
  "saveDigits2",
) as HTMLImageElement;
const saveDigits3: HTMLImageElement = document.getElementById(
  "saveDigits3",
) as HTMLImageElement;
const saveDigits4: HTMLImageElement = document.getElementById(
  "saveDigits3",
) as HTMLImageElement;
const saveDigitsElements = [
  saveDigits0,
  saveDigits1,
  saveDigits2,
  saveDigits3,
  saveDigits4,
];
//#endregion

//#region rate
const rateDigit0: HTMLImageElement = document.getElementById(
  "rateDigit0",
) as HTMLImageElement;
const rateDigit1: HTMLImageElement = document.getElementById(
  "rateDigit1",
) as HTMLImageElement;
const rateDigit2: HTMLImageElement = document.getElementById(
  "rateDigit2",
) as HTMLImageElement;
const rateDigit3: HTMLImageElement = document.getElementById(
  "rateDigit3",
) as HTMLImageElement;
const rateDigit4: HTMLImageElement = document.getElementById(
  "rateDigit4",
) as HTMLImageElement;
const rateElements = [
  rateDigit0,
  rateDigit1,
  rateDigit2,
  rateDigit3,
  rateDigit4,
];
//#endregion

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region GAME LOOP
// ------------------------------------------------------------------------------------------------------------------------------------------------

let lastTime: number = -1;
function gameLoop(timestamp: number) {
  if (lastTime == -1) lastTime = timestamp;

  const deltaTime = (timestamp - lastTime) / 1000;

  update(deltaTime);

  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region COUNTER LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------------------

boxElement.addEventListener("click", () => {
  incrementTotal(1);
  startShake();
});

function purchaseUpgrade(cost: number, rate: number) {
  counterGrowSpeed += rate;
  counter -= cost;
}

function incrementTotal(amountToAdd: number) {
  counter += amountToAdd;

  upgradeOne.disabled = counter < upgradeOneCost;
  upgradeTwo.disabled = counter < upgradeTwoCost;
  upgradeThree.disabled = counter < upgradeThreeCost;
}

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region DIGIT LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------------------

const digitPowerLookup = [
  1000000,
  100000,
  10000,
  1000,
  100,
  10,
];

//#region progress/rate
const digitUpdateTime: number = 0.04;
let timer: number = 0;
function setDigits(deltaTime: number) {
  timer += deltaTime;
  if (timer > digitUpdateTime) {
    timer = 0;
    setProgressDigits();
    setRateDigits();
  }
}

function setProgressDigits() {
  let digitCounter = counter * 10;
  for (let i: number = 7; i >= 0; i--) {
    if (counter < digitPowerLookup[i]) {
      setDigitOfCollapsingElement(-1, progressDigitElements[i]);
    } else {
      setDigitOfCollapsingElement(digitCounter % 10, progressDigitElements[i]);
    }
    digitCounter /= 10;
  }
}

function setRateDigits() {
  let digitCounter = counterGrowSpeed * 10;
  for (let i: number = 4; i >= 0; i--) {
    if (counterGrowSpeed < digitPowerLookup[i + 3]) {
      setDigitOfCollapsingElement(-1, rateElements[i]);
    } else {
      setDigitOfCollapsingElement(digitCounter % 10, rateElements[i]);
    }
    digitCounter /= 10;
  }
}

function setDigitOfCollapsingElement(digit: number, element: HTMLImageElement) {
  if (digit >= 0) {
    element.src = `${digitImages[Math.floor(digit)]}`;
  } else {
    element.src = "//:0";
  }
}

//#endregion

function setLineWeightDigits() {
  let upgradeDigits = Math.floor(upgradeOneCost);

  for (let i: number = 2; i >= 0; i--) {
    setWeightOfStaticElement(upgradeDigits % 10, lwDigitElements[i]);
    upgradeDigits /= 10;
  }
}

function setZoomAmountDigits() {
  let upgradeDigits = Math.floor(upgradeTwoCost);

  for (let i: number = 3; i >= 0; i--) {
    setWeightOfStaticElement(upgradeDigits % 10, zaDigitsElements[i]);
    upgradeDigits /= 10;
  }
}

function setSaveDigits() {
  let upgradeDigits = Math.floor(upgradeThreeCost);

  for (let i: number = 4; i >= 0; i--) {
    setWeightOfStaticElement(upgradeDigits % 10, saveDigitsElements[i]);
    upgradeDigits /= 10;
  }
}

function setWeightOfStaticElement(digit: number, element: HTMLImageElement) {
  element.src = `${digitImages[Math.floor(digit)]}`;
}

setLineWeightDigits();
setZoomAmountDigits();
setSaveDigits();

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region UPGRADES
// ------------------------------------------------------------------------------------------------------------------------------------------------

upgradeOne.addEventListener("click", () => {
  purchaseUpgrade(upgradeOneCost, 0.1);
  upgradeOneCost *= 1.1;
  setLineWeightDigits();
});

upgradeTwo.addEventListener("click", () => {
  purchaseUpgrade(upgradeTwoCost, 2);
  upgradeTwoCost *= 1.1;
  setZoomAmountDigits();
});

upgradeThree.addEventListener("click", () => {
  purchaseUpgrade(upgradeThreeCost, 50);
  upgradeThreeCost *= 1.1;
  setSaveDigits();
});

function setButtons() {
  if (upgradeOneLocked && counter >= upgradeOneCost) {
    upgradeOneLocked = false;
    lineWeightElement.setAttribute("src", `${lineWeight}`);
  } else if (!upgradeOneLocked && counter < upgradeOneCost) {
    upgradeOneLocked = true;
    lineWeightElement.setAttribute("src", `${lineWeightLocked}`);
  }

  if (upgradeTwoLocked && counter >= upgradeTwoCost) {
    upgradeTwoLocked = false;
    zoomAmountElement.setAttribute("src", `${zoomAmount}`);
  } else if (!upgradeTwoLocked && counter < upgradeTwoCost) {
    upgradeTwoLocked = true;
    zoomAmountElement.setAttribute("src", `${zoomAmountLocked}`);
  }

  if (upgradeThreeLocked && counter >= upgradeThreeCost) {
    upgradeThreeLocked = false;
    saveButtonElement.setAttribute("src", `${saveButton}`);
  } else if (!upgradeThreeLocked && counter < upgradeThreeCost) {
    upgradeThreeLocked = true;
    saveButtonElement.setAttribute("src", `${saveButtonLocked}`);
  }
}

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region SHAKE
// ------------------------------------------------------------------------------------------------------------------------------------------------

const shakeDuration: number = 0.1;
const shakeIntensity: number = 2;

let shakeTimer: number = 0;
function startShake() {
  shakeTimer = shakeDuration;
}

let resetFlag: boolean = true;
function shakeFrame(deltaTime: number) {
  shakeTimer -= deltaTime;
  if (shakeTimer > 0) { // while shake is active
    resetFlag = true;

    const horizontalShake = Math.random() * shakeIntensity * 2 - shakeIntensity; // -shakeintensity to shakeintensity
    const verticalShake = Math.random() * shakeIntensity * 2 - shakeIntensity;

    boxImage.setAttribute(
      "style",
      `margin-bottom: ${20 + verticalShake}px; margin-top: ${
        20 - verticalShake
      }px; margin-left: ${20 + horizontalShake}px; margin-right: ${
        20 - horizontalShake
      }px;`,
    );
  } else if (resetFlag) {
    resetFlag = false;

    boxImage.setAttribute(
      "style",
      `margin-bottom: 20px; margin-top: 20px; margin-left: 20px; margin-right: 20px;`,
    );
  }
}

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region HOVER
// ------------------------------------------------------------------------------------------------------------------------------------------------

// box
boxImage.addEventListener("mouseenter", () => {
  boxImage.setAttribute("src", `${boxUndamagedHover}`);
});
boxImage.addEventListener("mouseleave", () => {
  boxImage.setAttribute("src", `${boxUndamaged}`);
});

// line weight button
lineWeightElement.addEventListener("mouseenter", () => {
  if (!upgradeOneLocked) {
    lineWeightElement.setAttribute("src", `${lineWeightHovered}`);
  }
});
lineWeightElement.addEventListener("mouseleave", () => {
  if (!upgradeOneLocked) lineWeightElement.setAttribute("src", `${lineWeight}`);
});

// zoom amount
zoomAmountElement.addEventListener("mouseenter", () => {
  if (!upgradeTwoLocked) {
    zoomAmountElement.setAttribute("src", `${zoomAmountHovered}`);
  }
});
zoomAmountElement.addEventListener("mouseleave", () => {
  if (!upgradeTwoLocked) zoomAmountElement.setAttribute("src", `${zoomAmount}`);
});

// save button
saveButtonElement.addEventListener("mouseenter", () => {
  if (!upgradeThreeLocked) {
    saveButtonElement.setAttribute("src", `${saveButtonHovered}`);
  }
});
saveButtonElement.addEventListener("mouseleave", () => {
  if (!upgradeThreeLocked) {
    saveButtonElement.setAttribute("src", `${saveButton}`);
  }
});

//#endregion
