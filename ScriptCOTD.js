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
    var rand = Math.floor(Math.random() * crabs.length);
    const crab = crabs[rand];

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