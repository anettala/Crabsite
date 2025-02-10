class Crab {
    constructor(name, expansion, region, zone, coords, extinct, type, typename, number, image) {
        this.name = name;
        this.expansion = expansion;
        this.region = region;
        this.zone = zone;
        this.coords = coords;
        this.extinct = extinct;
        this.type = type;
        this.typename = typename;
        this.number = number;
        this.image = image;
    }
}

const crabs = [];

var DELIMITER = ",";
var NEWLINE = "\n";
var f = "crabmasterdoc.csv";

fetch(f)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text(); // Get the text content of the file
  })
  .then(csvData => {
    console.log('Raw CSV Data:', csvData);
    toObjects(csvData); // Call your parser function
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    scheduleNextRun(hour, min, getCOTD());
  })
  .catch(error => {
    console.error('Error fetching the CSV file:', error);
});

function toObjects(text) {
    if (!text) {return;}

    var rows = text.split(NEWLINE).slice(1);
    
    rows.forEach(function (h) {
        var values = h.split(DELIMITER);
        crabs.push(new Crab(values[0], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[11]));
    });
}

function getCOTD() {
    var today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    var seed = today.split("-").join("");
    var index = getItemOfTheDay(crabs, parseInt(seed, 10));
    //var index = getItemOfTheMinute(crabs);

    var crab = crabs[index];
    const crabDiv = document.getElementById("cotd-content");

    if (crab.extinct === "FALSE") {
        if (crab.image === ""){
            crabDiv.querySelector("#cotd-img").alt = "lazy very lazy no pic";
        } else {
            crabDiv.querySelector("#cotd-img").src = "Pictures/Masterdoc/" + crab.image;
        }
    } else {
        crabDiv.querySelector("#cotd-img").src = "Pictures/RIP.jpg";
        document.getElementById("audioPlayer").play();
    }
    
    crabDiv.querySelector("#cotd-name").textContent = crab.name;
    crabDiv.querySelector("#cotd-location").textContent = crab.region + " - " + crab.zone + " " + crab.coords;
    crabDiv.querySelector("#cotd-amount").textContent = crab.number;
    crabDiv.querySelector("#cotd-type").textContent = crab.type + " - " + crab.typename
}

function scheduleNextRun(hour, minutes, getCOTD) {
    const twentyFourHours = 86400000;
    const now = new Date();
    let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
    if (eta_ms < 0)
    {
        eta_ms += twentyFourHours;
    }

    setTimeout(function() {
        //run once
        getCOTD();
        // run every 24 hours from now on
        setInterval(getCOTD, twentyFourHours);
      }, eta_ms);
}

// Simple seeded PRNG function (Mulberry32)
function seededRandom(seed) {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Example: Choosing an "item of the day"
function getItemOfTheDay(items, seed) {
    let rand = seededRandom(seed); // Generate a seeded random number
    let index = Math.floor(rand * crabs.length);
    return index;
}

// Function to get an "Item of the Minute"
function getItemOfTheMinute(items) {
    const now = new Date();
    const seed = `${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
        .getHours()
        .toString()
        .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}`; // YYYYMMDDHHMM as seed

    let rand = seededRandom(parseInt(seed, 10)); // Generate predictable random number
    let index = Math.floor(rand * items.length);
    return index;
}