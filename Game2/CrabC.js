import Crab from "./Buyable.js";

// cursor upgrade kallim
// per second modifier mitte click modifier

let score = 0;
let modifier = 1;
let addable = 1;

const crabs = [
    new Crab(1, 10, 0),
    new Crab(2, 50, 0),
];

// Increment score on cookie click
const cb = document.getElementById("crabButton");
const scoreDisplay = document.getElementById('score');
const addableDisplay = document.getElementById('addable');

cb.addEventListener("click", function () {
    // Increase cookie count or trigger effect
    score = score + addable;
    displayScore();
});

document.getElementById("buy1").addEventListener("click", () => buyableAdd(0, "b1"));
document.getElementById("buy2").addEventListener("click", () => buyableAdd(1, "b2"));

function displayScore() {
    scoreDisplay.textContent = score;
    addableDisplay.textContent = addable;
}

function addScore(amount) {
    score += amount;
    displayScore();
}

function buyableAdd(id, name) {
    let crab = crabs[id];
    let price = crab.getPrice();
    let amount = crab.getAmount();

    if (score > price) {
        addable += amount;
        score -= price;
        crab.addCrab();

        document.getElementById(name).textContent = crab.getCurrently();

        console.log("Added: " + amount + " | Price: " + price);
        displayScore();
    } else {
        console.log("HAHA POOR");
    }
}