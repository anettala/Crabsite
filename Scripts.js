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

// Loop through all dropdown buttons to toggle between hiding and showing their dropdown content
//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
const dropdownButtons = document.querySelectorAll(".dropdown-btn");

// Toggle dropdowns when buttons are clicked
dropdownButtons.forEach(button => {
  button.addEventListener("click", function() {
    // Close all other dropdowns
    dropdownButtons.forEach(otherButton => {
      if (otherButton !== this) {
        otherButton.classList.remove("active");
        otherButton.nextElementSibling.classList.remove("active");
      }
    });

    // Toggle the "active" class on the clicked button and its dropdown content
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("active");
  });
});


const crabs = [];

var DELIMITER = ",";
var NEWLINE = "\n";
var f = "crabmasterdoc.csv";

const listContent = document.getElementById("list-content");
const initialHTML = listContent.innerHTML;
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

function filterCrabs(crabs, filters) {
    return crabs.filter(crab => {
      return Object.keys(filters).every(key => {
        if (filters[key].length === 0) return true; // No filter selected for this key
  
        // Handle extinct filter separately
        if (key === "extinct") {
          return filters[key].includes(crab.extinct.toString()); // Convert boolean to string for comparison
        }
  
        return filters[key].includes(crab[key]); // Check if crab matches any selected filter
      });
    });
}
  

const filters = {
    type: Array.from(document.querySelectorAll('input[name="type"]:checked')).map(checkbox => checkbox.value),
    expansion: Array.from(document.querySelectorAll('input[name="expansion"]:checked')).map(checkbox => checkbox.value),
  };

function displayResults(filteredCrabs) {
    const exampleDiv = document.getElementById("example");
    exampleDiv.style.display = "none";
    const exampleCrab = document.getElementById("example-crab");
    const contentDiv = document.getElementById("list-content");
    contentDiv.innerHTML = "";

    const expansions = ["A Realm Reborn", "Heavensward", "Stormblood", "Shadowbringers", "Endwalker", "Dawntrail"];
    const exp_short = ["ARR", "HW", "SB", "SHB", "EW", "DT"];

    const copyDiv = exampleDiv.cloneNode(true);
        copyDiv.style.display = "initial";

        contentDiv.appendChild(copyDiv);
        filteredCrabs.forEach(crab => {
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
                crabDiv.querySelector("#expansion").textContent = expansions[exp_short.indexOf(crab.expansion)];
                if (crab.coords === "") {
                    crabDiv.querySelector("#region").innerHTML = "<b>Location:</b> " + crab.region + ", " + crab.zone;
                } else {
                    crabDiv.querySelector("#region").innerHTML = "<b>Location:</b> " + crab.region + ", " + crab.zone + " (" + crab.coords + ")";
                }
                crabDiv.querySelector("#amount").innerHTML = "<b>Number:</b> " + crab.number;
                if (crab.typename === "") {
                    crabDiv.querySelector("#type").innerHTML = "<b>Type:</b> " + crab.type;
                } else {
                    crabDiv.querySelector("#type").innerHTML = "<b>Type:</b> " + crab.type + " - " + crab.typename;
                }
                copyDiv.appendChild(crabDiv);
        });
}

function updateFilters() {
    // Get selected filter values from checkboxes
    const filters = {
      type: Array.from(document.querySelectorAll('input[name="type"]:checked')).map(checkbox => checkbox.value),
      expansion: Array.from(document.querySelectorAll('input[name="expansion"]:checked')).map(checkbox => checkbox.value),
      extinct: Array.from(document.querySelectorAll('input[name="extinct"]:checked')).map(checkbox => checkbox.value),
    };

    console.log("Active Filters:", filters);
  
    // Check if any filters are selected
    const isAnyFilterSelected = Object.values(filters).some(filter => filter.length > 0);
  
    // Get the content container
    const contentDiv = document.getElementById("list-content");
  
    if (!isAnyFilterSelected) {
      // If no filters are selected, restore the initial HTML
      contentDiv.innerHTML = initialHTML; // Reset to the initial HTML
      displayExpansion();
      return;
    }
  
    // Filter the crabs
    const filteredCrabs = filterCrabs(crabs, filters);
    console.log("Filtered crabs: ", filteredCrabs);
    contentDiv.innerHTML = initialHTML;
    // Display the results
    displayResults(filteredCrabs);
}

// Add event listeners to checkboxes for real-time filtering
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
});

function uncheckAllCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false; // Uncheck the checkbox
    });
}

window.addEventListener('load', uncheckAllCheckboxes);

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
                if (crab.coords === "") {
                    crabDiv.querySelector("#region").innerHTML = "<b>Location:</b> " + crab.region + ", " + crab.zone;
                } else {
                    crabDiv.querySelector("#region").innerHTML = "<b>Location:</b> " + crab.region + ", " + crab.zone + " (" + crab.coords + ")";
                }
                crabDiv.querySelector("#amount").innerHTML = "<b>Number:</b> " + crab.number;
                if (crab.typename === "") {
                    crabDiv.querySelector("#type").innerHTML = "<b>Type:</b> " + crab.type;
                } else {
                    crabDiv.querySelector("#type").innerHTML = "<b>Type:</b> " + crab.type + " - " + crab.typename;
                }
                copyDiv.appendChild(crabDiv);
            }
        });
    });
}
