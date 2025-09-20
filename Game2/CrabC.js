import Crab from "./Buyable.js";

// cursor upgrade kallim
// per second modifier mitte click modifier

let score = 0;
let perSecAdd = 0;
let addable = 1;

const crabs = [
    new Crab(0.1, 10, 0),
    new Crab(0.3, 50, 0),
    new Crab(1, 1000, 0),
];

// Increment score on cookie click
const cb = document.getElementById("coinButton");
const scoreDisplay = document.getElementById('score');
const addableDisplay = document.getElementById('addable');

cb.addEventListener("click", function () {
    // Increase cookie count or trigger effect
    score = score + addable;
    displayScore();
});

document.getElementById("buy1").addEventListener("click", () => addPerSec(0, "b1"));
document.getElementById("buy2").addEventListener("click", () => addPerSec(1, "b2"));
document.getElementById("buy3").addEventListener("click", () => buyableAdd(2, "b3"));

function displayScore() {
    scoreDisplay.textContent = Math.trunc(score);
    console.log(score, perSecAdd);
    addableDisplay.textContent = Math.round(perSecAdd * 10) / 10
}

function addScore(amount) {
    score += amount;
    displayScore();
}

function addIncrement() {
    score += perSecAdd;
    displayScore();
}

function buyableAdd(id, name) {
    let crab = crabs[id];
    let price = crab.getPrice();
    let amount = crab.getAmount();

    if (score >= price) {
        addable += amount;
        score -= price;
        crab.addCrab();

        document.getElementById(name).textContent = crab.getCurrently();

        document.getElementById(`price${id+1}`).textContent =
            `Price: ${crab.getPrice()} (+${crab.getAmount()} /click)`;

        console.log("Added: " + amount + " | Price: " + price);
        displayScore();
    } else {
        console.log("HAHA POOR");
    }
}

function addPerSec(id, name) {
    let crab = crabs[id];
    let price = crab.getPrice();
    let amount = crab.getAmount();

    if (score >= price) {
        perSecAdd += amount;
        score -= price;
        crab.addCrab();

        document.getElementById(name).textContent = crab.getCurrently();

        document.getElementById(`price${id+1}`).textContent =
            `Price: ${crab.getPrice()} (+${crab.getAmount()} /click)`;

        console.log("Added: " + amount + " | Price: " + price);
        displayScore();
    } else {
        console.log("HAHA POOR");
    }
}

setInterval(addIncrement, 1000);