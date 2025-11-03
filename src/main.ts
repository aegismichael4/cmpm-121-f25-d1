import "./style.css";

// ------------------------------------------------------------------------------------------------------------------------------------------------
// SPRITES
// ------------------------------------------------------------------------------------------------------------------------------------------------

// box sprites
import boxDamagedOneHover from "./assets/boxes/box-damaged-one-hover.png";
import boxDamagedOne from "./assets/boxes/box-damaged-one.png";
import boxDamagedTwoHover from "./assets/boxes/box-damaged-two-hover.png";
import boxDamagedTwo from "./assets/boxes/box-damaged-two.png";
import boxUndamagedHover from "./assets/boxes/box-undamaged-hover.png";
import boxUndamaged from "./assets/boxes/box-undamaged.png";

// UI sprites
import costImg from "./assets/cost.png";
import titleImg from "./assets/ms-paint-clicker.png";
import progressImg from "./assets/progress.png";
import rateImg from "./assets/rate.png";

// button sprites
import lineWeightHovered from "./assets/buttons/line-weight-button-hover.png";
import lineWeightLocked from "./assets/buttons/line-weight-button-locked.png";
import lineWeight from "./assets/buttons/line-weight-button.png";
import saveButtonHovered from "./assets/buttons/save-button-hover.png";
import saveButtonLocked from "./assets/buttons/save-button-locked.png";
import saveButton from "./assets/buttons/save-button.png";
import zoomAmountHovered from "./assets/buttons/zoom-amount-button-hover.png";
import zoomAmountLocked from "./assets/buttons/zoom-amount-button-locked.png";
import zoomAmount from "./assets/buttons/zoom-amount-button.png";

// custom digit sprites
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

document.body.innerHTML = `
  <center><img src=${titleImg} style="margin-bottom: 20px" draggable="false"></center>

  <center><img src="${progressImg}"> &nbsp; <img id="progDigit0" src="${zeroImg}" alt=""> <img id="progDigit1" src="${zeroImg}" alt="">
    <img id="progDigit2" src="${zeroImg}" alt=""> <img id="progDigit3" src="${zeroImg}" alt=""> <img id="progDigit4" src="${zeroImg}" alt="">
    <img id="progDigit5" src="${zeroImg}" alt=""> <img id="progDigit6" src="${zeroImg}" alt=""> <img src="${periodImg}">
    <img id="progDigit7" src="${zeroImg}" alt=""> </center>

  <center> <img src="${rateImg}"> &nbsp; <img id="rateDigit0" src="${zeroImg}" alt=""> <img id="rateDigit1" src="${zeroImg}" alt="">
    <img id="rateDigit2" src="${zeroImg}" alt=""> <img id="rateDigit3" src="${zeroImg}" alt=""> <img src="${periodImg}"> <img id="rateDigit4" src="${zeroImg}" alt=""> </center>

  <center><button id="box" style="z-index: 5; border: none; background: none;"><img id="boxImage" src="${boxUndamaged}" draggable="false" style="margin-bottom: 20px; margin-top: 20px; margin-left: 20px; margin-right: 20px;"></button></center>

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

  <div id="clickEffectsContainer"> </div>
`;

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region HTML ELEMENTS
// ------------------------------------------------------------------------------------------------------------------------------------------------

// box button
const boxElement = document.getElementById("box")!;

// box image
const boxImage = document.getElementById("boxImage")!;

let boxLevel: number = 0;
let boxSprite: string = `${boxUndamaged}`;
let boxHoverSprite: string = `${boxUndamagedHover}`;

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

// click effects
const clickEffectsElement: HTMLElement = document.getElementById(
  "clickEffectsContainer",
) as HTMLElement;

//#endregion

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region GAME LOOP
// ------------------------------------------------------------------------------------------------------------------------------------------------

// this function calls itself every tick, and keeps track of how much time has passed
let lastTime: number = -1;
function gameLoop(timestamp: number) {
  if (lastTime == -1) lastTime = timestamp;

  const deltaTime = (timestamp - lastTime) / 1000;

  update(deltaTime);

  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// called by the gameLoop function
// i split it up to seperate out the looping logic from all of the things i actually want to do at every update for clarity
// deltaTime is the time in seconds since the last update
function update(deltaTime: number) {
  incrementTotal(deltaTime * counterGrowSpeed);
  setDigits(deltaTime);
  shakeFrame(deltaTime);
  setButtonStatus();
  updateBoxSprite();
}

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region COUNTER LOGIC
// ------------------------------------------------------------------------------------------------------------------------------------------------

let counter: number = 0;
let counterGrowSpeed: number = 0;
let clickPower: number = 1;

// the box itself is clickable
boxElement.addEventListener("click", () => {
  incrementTotal(clickPower);
  startShake();
  spawnClickEffect();
});

function incrementTotal(amountToAdd: number) {
  counter += amountToAdd;
}

// this allows the box to look more "ragged" the more times it's been clicked
function updateBoxSprite() {
  if (boxLevel == 0 && counter >= 10) {
    boxLevel++;
    boxSprite = `${boxDamagedOne}`;
    boxHoverSprite = `${boxDamagedOneHover}`;
    boxImage.setAttribute("src", boxSprite);
  } else if (boxLevel == 1 && counter >= 10_000) {
    boxLevel++;
    boxSprite = `${boxDamagedTwo}`;
    boxHoverSprite = `${boxDamagedTwoHover}`;
    boxImage.setAttribute("src", boxSprite);
  }
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

const digitUpdateTime: number = 0.04; // this is how much time must pass before the digit will update again, to prevent eyestrain
let timer: number = 0;

// called from update
function setDigits(deltaTime: number) {
  timer += deltaTime;
  if (timer > digitUpdateTime) {
    timer = 0;
    setProgressDigits();
    setRateDigits();
  }
  setUpgradeDigits(); // no need to wait at all to update these, as they only happen when clicked and won't cause eyestrain
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

// this function allows me to have numbers that only display the minimum amount of significant digits
// as in, the number 465 doesn't display as 00000465
function setDigitOfCollapsingElement(digit: number, element: HTMLImageElement) {
  if (digit >= 0) {
    element.src = `${digitImages[Math.floor(digit)]}`;
  } else {
    element.src = "//:0";
  }
}

//#endregion

function setUpgradeDigits() {
  for (const upgrade of upgrades) {
    let upgradeDigits = Math.floor(upgrade.cost);

    for (let i: number = upgrade.digits.length; i--;) {
      const digit = Math.floor(upgradeDigits % 10);
      const digitImage: string = `${digitImages[digit]}`;
      upgrade.digits[i].setAttribute("src", digitImage);

      upgradeDigits /= 10;
    }
  }
}

//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region UPGRADES
// ------------------------------------------------------------------------------------------------------------------------------------------------

const costIncreasePerPurchase: number = 1.08;

interface Upgrade {
  button: HTMLButtonElement;
  image: HTMLElement;

  cost: number;
  rate: number;

  locked: boolean;

  defaultSprite: string;
  hoveredSprite: string;
  lockedSprite: string;

  digits: HTMLImageElement[];
}

const upgrades: Upgrade[] = [
  {
    button: upgradeOne,
    image: lineWeightElement,
    cost: 10,
    rate: 0.1,
    locked: false,
    defaultSprite: `${lineWeight}`,
    hoveredSprite: `${lineWeightHovered}`,
    lockedSprite: `${lineWeightLocked}`,
    digits: [lwDigit0, lwDigit1, lwDigit2],
  },
  {
    button: upgradeTwo,
    image: zoomAmountElement,
    cost: 100,
    rate: 2,
    locked: false,
    defaultSprite: `${zoomAmount}`,
    hoveredSprite: `${zoomAmountHovered}`,
    lockedSprite: `${zoomAmountLocked}`,
    digits: [zaDigits0, zaDigits1, zaDigits2, zaDigits3],
  },
  {
    button: upgradeThree,
    image: saveButtonElement,
    cost: 1000,
    rate: 50,
    locked: false,
    defaultSprite: `${saveButton}`,
    hoveredSprite: `${saveButtonHovered}`,
    lockedSprite: `${saveButtonLocked}`,
    digits: [saveDigits0, saveDigits1, saveDigits2, saveDigits3, saveDigits4],
  },
];

initializeUpgrades();
function initializeUpgrades() {
  for (const upgrade of upgrades) {
    upgrade.button.addEventListener("click", () => {
      purchaseUpgrade(upgrade.cost, upgrade.rate);
      upgrade.cost *= costIncreasePerPurchase;
    });
  }
  setButtonStatus();
  enableButtonHover();
}

// this makes sure that they're only clickable if the counter exceeds their cost
// and their sprite reflects that
function setButtonStatus() {
  for (const upgrade of upgrades) {
    if (upgrade.locked && counter >= upgrade.cost) {
      upgrade.locked = false;
      upgrade.image.setAttribute("src", upgrade.defaultSprite);
      upgrade.button.disabled = false;
    } else if (!upgrade.locked && counter < upgrade.cost) {
      upgrade.locked = true;
      upgrade.image.setAttribute("src", upgrade.lockedSprite);
      upgrade.button.disabled = true;
    }
  }
}

function purchaseUpgrade(cost: number, rate: number) {
  counterGrowSpeed += rate;
  counter -= cost;
  clickPower = 1 + counterGrowSpeed * 0.05;
}
//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region SHAKE
// ------------------------------------------------------------------------------------------------------------------------------------------------

// this was a fun custom effect to implement
// i took the same approach for this that i'd normally do with a basic camera shake

const shakeDuration: number = 0.1;
const shakeIntensity: number = 2;

let shakeTimer: number = 0;
function startShake() {
  shakeTimer = shakeDuration;
}

// shake timer is constantly counting downwards in seconds
// whenever it's greater than 0, the box shakes
// call startShake to set the box timer to the shakeDuration amount
let resetFlag: boolean = true;
function shakeFrame(deltaTime: number) {
  shakeTimer -= deltaTime;
  if (shakeTimer > 0) { // while shake is active
    resetFlag = true;

    const horizontalShake = Math.random() * shakeIntensity * 2 - shakeIntensity; // -shakeintensity to shakeintensity
    const verticalShake = Math.random() * shakeIntensity * 2 - shakeIntensity;

    boxImage.setAttribute( // shake effect achieved by moving it a random amount of pixels left/right and up/down every frame
      "style",
      `margin-bottom: ${20 + verticalShake}px; margin-top: ${
        20 - verticalShake
      }px; margin-left: ${20 + horizontalShake}px; margin-right: ${
        20 - horizontalShake
      }px;`,
    );
  } else if (resetFlag) {
    resetFlag = false;

    // reset position the first time the counter runs out
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

let hoverX: number;
let hoverY: number;

// box
boxImage.addEventListener("mouseenter", () => {
  boxImage.setAttribute("src", boxHoverSprite);
});
boxImage.addEventListener("mouseleave", () => {
  boxImage.setAttribute("src", boxSprite);
});
boxImage.addEventListener("mousemove", (e) => {
  hoverX = e.clientX;
  hoverY = e.clientY;
});

// buttons should only have an on-hover effect when they're not disabled
function enableButtonHover() {
  for (const upgrade of upgrades) {
    upgrade.button.addEventListener("mouseenter", () => {
      if (!upgrade.locked) {
        upgrade.image.setAttribute("src", upgrade.hoveredSprite);
      }
    });

    upgrade.button.addEventListener("mouseleave", () => {
      if (!upgrade.locked) {
        upgrade.image.setAttribute("src", upgrade.defaultSprite);
      }
    });
  }
}
//#endregion

// ------------------------------------------------------------------------------------------------------------------------------------------------
//#region CLICK EFFECT
// ------------------------------------------------------------------------------------------------------------------------------------------------

// this effect was (probably obviously) inspired by cookie clicker

// i took a "particle" approach to the effect
// each number that shows how much you're getting for each click is a ClickEffect instance, which has its own behavior
class ClickEffect {
  parentElement: HTMLElement;
  effectText: HTMLElement;

  startTime: number = -1;
  duration: number = 1.5;
  currTime: number = 0;

  basicStyle: string;

  alpha: number = 1;
  goalY: number;
  startX: number;
  startY: number;

  constructor(
    clickPower: number,
    element: HTMLElement,
    left: number,
    top: number,
  ) {
    this.startY = top;
    this.startX = left;
    this.goalY = top - 80;

    this.basicStyle =
      "font-size: 25px; z-index: 6; position: absolute; left: " +
      left +
      "px; top: " + top + "px;";

    this.parentElement = element;
    this.effectText = document.createElement("div");
    this.effectText.innerHTML = "+" + clickPower.toFixed(1);
    this.effectText.setAttribute(
      "style",
      this.basicStyle,
    );
    this.effectText.setAttribute("onmousedown", "return false");
    this.effectText.setAttribute("onselectstart", "return false");

    this.parentElement.appendChild(this.effectText);

    requestAnimationFrame(this.update);
  }

  // every tick, while it's not surpassed its expire time, update calls itself
  update = (timestamp: number) => {
    if (this.startTime == -1) this.startTime = timestamp;
    const deltaTime = (timestamp - this.startTime) / 1000;

    this.currTime += deltaTime;

    if (this.currTime < this.duration) { // not expired
      const t = this.currTime / this.duration;
      this.alpha = this.lerp(1, 0, t);
      const newY = this.lerp(this.startY, this.goalY, t);

      this.basicStyle =
        "font-size: 25px; z-index: 6; position: absolute; left: " +
        this.startX +
        "px; top: " + newY + "px;";

      this.effectText.setAttribute(
        "style",
        this.basicStyle + `color: rgba(1,0,0,${this.alpha})`,
      );

      this.startTime = timestamp;
      requestAnimationFrame(this.update);
    } else { // expired
      this.parentElement.removeChild(this.effectText); // cut off all reference to the object so it can be auto deleted (i... hope so at least)
    }
  };

  // idk why it's not included
  lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }
}

// called whenever the box is clicked
function spawnClickEffect() {
  new ClickEffect(clickPower, clickEffectsElement, hoverX - 15, hoverY - 30);
}

//#endregion
