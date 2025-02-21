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
let randNum = null;

var DELIMITER = ",";
var NEWLINE = "\n";
var f = "crabmasterdoc.csv";

async function fetchData() {
    try {
      // Fetch random number JSON
      const jsonResponse = await fetch("random_number.json");
      if (!jsonResponse.ok) throw new Error(`HTTP error! status: ${jsonResponse.status}`);
      const jsonData = await jsonResponse.json();
      randNum = jsonData.number;
      console.log("Random number:", randNum);
  
      // Fetch CSV file
      const csvResponse = await fetch(f);
      if (!csvResponse.ok) throw new Error(`HTTP error! status: ${csvResponse.status}`);
      const csvData = await csvResponse.text();
      
      console.log("Raw CSV Data:", csvData);
      toObjects(csvData);
      getCOTD();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}
  
fetchData();

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
    var crab = crabs[randNum];

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