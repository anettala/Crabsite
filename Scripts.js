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
  })
  .catch(error => {
    console.error('Error fetching the CSV file:', error);
  });

function toObjects(text) {
    if (!text) {return;}

    var rows = text.split(NEWLINE).slice(1);
    
    rows.forEach(function (h) {
        var values = h.split(DELIMITER).trim();
        console.log(values);
        crabs.push(new Crab(values[0], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[11]));
    });
}

function displayExpansion() {
    const exampleDiv = document.getElementById("example");
    exampleDiv.style.display = "none";
    const exampleCrab = document.getElementById("example-crab");
    const contentDiv = document.getElementById("list-content");

    const expansions = ["A Realm Reborn", "Heavensward", "Stormblood", "Shadowbringers", "Endwalker", "Dawntrail"];
    const exp_short = ["ARR", "HW", "ST", "SHB", "EW", "DT"];

    exp_short.forEach(exp => {
        const copyDiv = exampleDiv.cloneNode(true);
        copyDiv.style.display = "initial";
        copyDiv.querySelector("#exp-start").textContent=expansions[exp_short.indexOf(exp)];

        contentDiv.appendChild(copyDiv);

        crabs.filter(crab => crab.expansion === exp).forEach(crab => {
            const crabDiv = exampleCrab.cloneNode(true);
            if (crab.extinct === "FALSE") {
                crabDiv.querySelector(".cl-img").src = "/Pictures/Masterdoc/" + crab.image;
            }
            if (crab.image === ""){
                crabDiv.querySelector(".cl-img").alt = "lazy very lazy no pic";
            }
            crabDiv.querySelector("#crabname").textContent = crab.name;
            crabDiv.querySelector("#expansion").textContent = crab.expansion;
            crabDiv.querySelector("#region").textContent = crab.region;
            crabDiv.querySelector("#zone").textContent = crab.zone;
            crabDiv.querySelector("#coords").textContent = crab.coords;
            crabDiv.querySelector("#amount").textContent = crab.number;
            crabDiv.querySelector("#type").textContent = crab.type;
            crabDiv.querySelector("#nametype").textContent = crab.nametype;
            
            copyDiv.appendChild(crabDiv);
        });
    });
}

window.addEventListener("load", function() {
    displayExpansion();
});
