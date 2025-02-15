class Crab {
    constructor(name, type, region, patch, expansion, zones, coords, uw, image, desc1, desc2) {
        this.name = name;
        this.type = type;
        this.region = region;
        this.patch = patch;
        this.expansion = expansion;
        this.zones = zones;
        this.coords = coords;
        this.uw = uw;
        this.image = image;
        this.desc1 = desc1;
        this.desc2 = desc2;
    }
}

const fish = [];

var DELIMITER = "\t";
var NEWLINE = "\n";
var f = "fishdoc.tsv";

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
        fish.push(new Crab(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[10], values[11], values[12]));
    });
}

function displayExpansion() {
    const exampleDiv = document.getElementById("example");
    exampleDiv.style.display = "none";
    const exampleCrab = document.getElementById("example-crab");
    const contentDiv = document.getElementById("list-content");
    const areaDiv = document.getElementById("region-inf");

    const expansions = ["A Realm Reborn", "Heavensward", "Stormblood", "Shadowbringers", "Endwalker", "Dawntrail"];
    const exp_short = ["ARR", "HW", "SB", "SHB", "EW", "DT"];

    exp_short.forEach(exp => {
        const copyDiv = exampleDiv.cloneNode(true);
        copyDiv.style.display = "initial";
        copyDiv.querySelector("#exp-start").textContent=expansions[exp_short.indexOf(exp)];
        copyDiv.id=exp;

        contentDiv.appendChild(copyDiv);
        fish.forEach(crab => {
            if (crab.expansion === exp && crab.type === "Fish"){
                exampleCrab.style.display =  "none";
                const crabDiv = exampleCrab.cloneNode(true);
                crabDiv.style.display = "flex";
                crabDiv.querySelector(".cl-img").src = "Pictures/Fish/" + crab.image;
                crabDiv.querySelector("#crabname").textContent = crab.name;
                crabDiv.querySelector("#patch").textContent = exp + " " + crab.patch;
                crabDiv.querySelector("#desc1").textContent = crab.desc1;
                crabDiv.querySelector("#desc2").textContent = crab.desc2;

                const areaDiv = crabDiv.querySelector("#region-inf");
                areaDiv.innerHTML = "";

                var zone = crab.zones.split(";");
                var coord = crab.coords.split(";");

                var split = zone[0].split(":");
                if (coord[0] === "") {
                    text = split[0].bold();
                } else {
                    text = split[0].bold() + "<b>:</b>" + split[1] + " (" + coord[0] + ")"; 
                }

                for (let i = 1; i < zone.length; i++) {
                    if (zone[i].includes(":")) {
                        var addzone = document.createElement("p");
                        addzone.innerHTML = text;
                        areaDiv.appendChild(addzone);
                        var split = zone[i].split(":");
                        if (crab.coord === "") {
                            text = split[0].bold() + "<b>:</b>" + split[1];
                        } else {
                            text = split[0].bold() + "<b>:</b>" + split[1] + " (" + coord[i] + ")"; 
                        }
                    } else {
                        text = text.concat(" | " + zone[i] + " (" + coord[i]) + ")"; 
                    }
                  }
                
                if (text) {
                    var addzone = document.createElement("p");
                    addzone.innerHTML = text;
                    areaDiv.appendChild(addzone);
                }
                
                
            
                copyDiv.appendChild(crabDiv);
            }
        });
    });
}