import "./style.css";

let counter: number = 0;
let counterGrowSpeed: number = 0;

const boxSize = 50;

//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>

document.body.innerHTML = `
  <h1>Game Title</h1>
  <p>Progress... <span id="counter">0</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Growth Rate: <span id="growRate">0</span></p>
  <button id="increment">&#128230;</button>
  <p>\n\n</p>
  <p><button id="upgradeOne">A</button> &nbsp;&nbsp;&nbsp; Cost: 10 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate: 0.1/sec</p>
  <p><button id="upgradeTwo">B</button> &nbsp;&nbsp;&nbsp; Cost: 100 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate: 2/sec</p>
  <p><button id="upgradeThree">C</button> &nbsp;&nbsp;&nbsp; Cost: 1000 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rate: 50/sec</p>
`;

const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growRate")!;
const increment = document.getElementById("increment")!;

const upgradeOne: HTMLButtonElement = document.getElementById(
  "upgradeOne",
) as HTMLButtonElement;
const upgradeTwo: HTMLButtonElement = document.getElementById(
  "upgradeTwo",
) as HTMLButtonElement;
const upgradeThree: HTMLButtonElement = document.getElementById(
  "upgradeThree",
) as HTMLButtonElement;

setBoxSize(boxSize);

increment.addEventListener("click", () => {
  incrementTotal(1);
});

upgradeOne.addEventListener("click", () => {
  purchaseUpgrade(10, 0.1);
});

upgradeTwo.addEventListener("click", () => {
  purchaseUpgrade(100, 2);
});

upgradeThree.addEventListener("click", () => {
  purchaseUpgrade(1000, 50);
});

function purchaseUpgrade(cost: number, rate: number) {
  counterGrowSpeed += rate;
  counter -= cost;
  growthRateElement.innerHTML = counterGrowSpeed.toFixed(1);
}

function incrementTotal(amountToAdd: number) {
  counter += amountToAdd;

  upgradeOne.disabled = counter < 10;
  upgradeTwo.disabled = counter < 100;
  upgradeThree.disabled = counter < 1000;

  counterElement.innerHTML = counter.toFixed(1);
}

function setBoxSize(size: number) {
  const newSizeString: string = "border: none; background: none; font-size: " +
    size.toString() + "px";
  increment.setAttribute("style", newSizeString);
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
