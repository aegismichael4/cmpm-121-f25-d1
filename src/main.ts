import "./style.css";

let counter: number = 0;
const boxSize = 50;

//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>

document.body.innerHTML = `
  <h1>Game Title</h1>
  <p>Progress... <span id="counter">0</span></p>
  <button id="increment">&#128230;</button>
  <p>\n\n</p>
  <button id="enableAutoClick">Enable Auto Click</button>
  <p><span id="test">0</span></p>
`;

const counterElement = document.getElementById("counter")!;
const increment = document.getElementById("increment")!;
const autoClick = document.getElementById("enableAutoClick")!;

// const testElement = document.getElementById("test")!;

setBoxSize(boxSize);

increment.addEventListener("click", () => {
  incrementTotal(1);
});

autoClick.addEventListener("click", () => {
  requestAnimationFrame(autoIncrement);
});

function incrementTotal(amountToAdd: number) {
  counter += amountToAdd;
  counterElement.innerHTML = counter.toString();
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

  counter += deltaTime;

  counterElement.innerHTML = counter.toFixed(2);

  lastTime = timestamp;
  requestAnimationFrame(autoIncrement);
}
