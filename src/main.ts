import "./style.css";

let counter: number = 0;

//<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>

document.body.innerHTML = `
  <h1>Game Title</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="button">Button</button>
`;

const buttonElement = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;

buttonElement.addEventListener("click", () => {
  //counter++;
  //counterElement.innerHTML = counter.toString();
});
