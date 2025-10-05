import "./style.css";

let counter: number = 0;
let autoClickSpeed: number = 2000;

const boxSize = 50;

let autoClickInterval = setInterval(incrementTotal, autoClickSpeed, 1);
clearInterval(autoClickInterval);

//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>

document.body.innerHTML = `
  <h1>Game Title</h1>
  <p>Progress... <span id="counter">0</span></p>
  <button id="increment">&#128230;</button>
  <p>\n\n</p>
  <button id="enableAutoClick">Enable Auto Click</button>
`;

const counterElement = document.getElementById("counter")!;
const increment = document.getElementById("increment")!;
const autoClick = document.getElementById("enableAutoClick")!;

setBoxSize(boxSize);

increment.addEventListener("click", () => {
  incrementTotal(1);
});

autoClick.addEventListener("click", () => {
  clearInterval(autoClickInterval);
  autoClickSpeed /= 2;
  autoClickInterval = setInterval(incrementTotal, autoClickSpeed, 1);
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
