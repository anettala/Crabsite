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
    getCOTD();
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
    //var index = getDailyRandomNumber();
    var crab = getDailyItem();

    //var crab = crabs[index];
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
    if (crab.typename === "") {
        crabDiv.querySelector("#cotd-type").textContent = crab.type;
    } else {
        crabDiv.querySelector("#cotd-type").textContent = crab.type + " - " + crab.typename;
    }
}

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function getDailyItem() {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    let storedData = JSON.parse(localStorage.getItem("dailyRandom"));

    // If no stored data or the date has changed, update the index
    if (!storedData || storedData.date !== today) {
        let shuffled = storedData ? storedData.shuffled : shuffleArray([...crabs]); // Use existing shuffle or create a new one
        let index = storedData ? storedData.index + 1 : 0;

        // Reshuffle if all items have been used
        if (index >= shuffled.length) {
            shuffled = shuffleArray([...crabs]);
            index = 0;
        }

        // Store updated data
        storedData = { date: today, index, shuffled };
        localStorage.setItem("dailyRandom", JSON.stringify(storedData));
    }

    return storedData.shuffled[storedData.index];
}

function getDailyRandomNumber() {
    const date = new Date().toDateString(); // e.g., "Mon Feb 18 2025"
    const seed = date.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return seed % crabs.length; // Change range as needed
}