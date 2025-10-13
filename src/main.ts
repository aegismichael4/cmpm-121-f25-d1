import "./style.css";

import boxImg from "./assets/box.png";
import titleImg from "./assets/ms-paint-clicker.png";
import progressImg from "./assets/progress.png";

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


let counter: number = 0;
let counterGrowSpeed: number = 0;

let upgradeOneCost: number = 10;
let upgradeTwoCost: number = 100;
let upgradeThreeCost: number = 1000;

//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
//  <a (click)="clickBox()"><img = src="${boxImg})

document.body.innerHTML = `
  <center><img src = ${titleImg}></center>
  <center><p><img src="${progressImg}"><span id="counter">0</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Growth Rate: <span id="growRate">0</span></p></center>
  <center><button id="box"><img id="boxImage" src="${boxImg}"></button></center>
  <p>\n\n</p>
  <p><button id="upgradeOne">A</button> &nbsp;&nbsp;&nbsp; Cost: <span id="upgradeOneCost">10</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate: 0.1/sec</p>
  <p><button id="upgradeTwo">B</button> &nbsp;&nbsp;&nbsp; Cost: <span id="upgradeTwoCost">100</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate: 2/sec</p>
  <p><button id="upgradeThree">C</button> &nbsp;&nbsp;&nbsp; Cost: <span id="upgradeThreeCost">1000</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate: 50/sec</p>
`;

const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growRate")!;

const box = document.getElementById("box")!;
box.setAttribute("style", "border: none; background: none;");

const upgradeOne: HTMLButtonElement = document.getElementById(
  "upgradeOne",
) as HTMLButtonElement;
const upgradeTwo: HTMLButtonElement = document.getElementById(
  "upgradeTwo",
) as HTMLButtonElement;
const upgradeThree: HTMLButtonElement = document.getElementById(
  "upgradeThree",
) as HTMLButtonElement;

const upgradeOneCostElement = document.getElementById("upgradeOneCost")!;
const upgradeTwoCostElement = document.getElementById("upgradeTwoCost")!;
const upgradeThreeCostElement = document.getElementById("upgradeThreeCost")!;

box.addEventListener("click", () => {
  incrementTotal(1);
});

upgradeOne.addEventListener("click", () => {
  purchaseUpgrade(upgradeOneCost, 0.1);
  upgradeOneCost *= 1.15;
  upgradeOneCostElement.innerHTML = upgradeOneCost.toFixed(1);
});

upgradeTwo.addEventListener("click", () => {
  purchaseUpgrade(upgradeTwoCost, 2);
  upgradeTwoCost *= 1.15;
  upgradeTwoCostElement.innerHTML = upgradeTwoCost.toFixed(1);
});

upgradeThree.addEventListener("click", () => {
  purchaseUpgrade(upgradeThreeCost, 50);
  upgradeThreeCost *= 1.15;
  upgradeThreeCostElement.innerHTML = upgradeThreeCost.toFixed(1);
});

function purchaseUpgrade(cost: number, rate: number) {
  counterGrowSpeed += rate;
  counter -= cost;
  growthRateElement.innerHTML = counterGrowSpeed.toFixed(1);
}

function incrementTotal(amountToAdd: number) {
  counter += amountToAdd;

  upgradeOne.disabled = counter < upgradeOneCost;
  upgradeTwo.disabled = counter < upgradeTwoCost;
  upgradeThree.disabled = counter < upgradeThreeCost;

  counterElement.innerHTML = counter.toFixed(1);
}

let lastTime: number = -1;
function autoIncrement(timestamp: number) {
  if (lastTime == -1) lastTime = timestamp;

  const deltaTime = (timestamp - lastTime) / 1000;

  incrementTotal(deltaTime * counterGrowSpeed);

  lastTime = timestamp;
  requestAnimationFrame(autoIncrement);
}
requestAnimationFrame(autoIncrement);
