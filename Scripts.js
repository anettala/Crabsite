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
    displayExpansion();
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

function displayExpansion() {
    const exampleDiv = document.getElementById("example");
    exampleDiv.style.display = "none";
    const exampleCrab = document.getElementById("example-crab");
    const contentDiv = document.getElementById("list-content");

    const expansions = ["A Realm Reborn", "Heavensward", "Stormblood", "Shadowbringers", "Endwalker", "Dawntrail"];
    const exp_short = ["ARR", "HW", "SB", "SHB", "EW", "DT"];

    exp_short.forEach(exp => {
        const copyDiv = exampleDiv.cloneNode(true);
        copyDiv.style.display = "initial";
        copyDiv.querySelector("#exp-start").textContent=expansions[exp_short.indexOf(exp)];
        copyDiv.id=exp;

        contentDiv.appendChild(copyDiv);
        crabs.forEach(crab => {
            if (crab.expansion === exp){
                exampleCrab.style.display =  "none";
                const crabDiv = exampleCrab.cloneNode(true);
                crabDiv.style.display = "flex";
                if (crab.extinct === "FALSE") {
                    if (crab.image === ""){
                        crabDiv.querySelector(".cl-img").alt = "lazy very lazy no pic";
                        crabDiv.querySelector(".cl-img").setAttribute("class", "cl-img");
                    } else {
                        crabDiv.querySelector(".cl-img").src = "Pictures/Masterdoc/" + crab.image;
                        crabDiv.querySelector(".cl-img").setAttribute("onclick", "window.open(this.src, '_blank');");
                    }
                } else {
                    crabDiv.querySelector(".cl-img").setAttribute("class", "cl-img");
                }
                crabDiv.querySelector("#crabname").textContent = crab.name;
                crabDiv.querySelector("#expansion").textContent = expansions[exp_short.indexOf(exp)];
                crabDiv.querySelector("#region").textContent = "Location: " + crab.region;
                crabDiv.querySelector("#zone").textContent = crab.zone;
                crabDiv.querySelector("#coords").textContent = crab.coords;
                crabDiv.querySelector("#amount").textContent = "Number: " + crab.number;
                crabDiv.querySelector("#type").textContent = "Type: " + crab.type;
                crabDiv.querySelector("#nametype").textContent = " - " + crab.typename;
            
                copyDiv.appendChild(crabDiv);
            }
        });
    });
}
