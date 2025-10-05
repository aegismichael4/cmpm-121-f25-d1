import "./style.css";

let counter: number = 0;
let autoClickSpeed: number = 1000;

let autoClickInterval: any;

//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>

document.body.innerHTML = `
  <h1>Game Title</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">Button</button>
  <button id="enableAutoClick">Enable Auto Click</button>
`;

const counterElement = document.getElementById("counter")!;
const increment = document.getElementById("increment")!;
const autoClick = document.getElementById("enableAutoClick")!;

increment.addEventListener("click", () => {
  incrementTotal(1);
});

autoClick.addEventListener("click", () => {
  clearInterval(autoClickInterval);
  autoClickSpeed /= 2;
  autoClickInterval = setInterval(incrementTotal, autoClickSpeed, 1);
});

function incrementTotal(amount: number) {
  counter += amount;
  counterElement.innerHTML = counter.toString();
}
