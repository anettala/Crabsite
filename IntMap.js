//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
} 
var MapIcon = L.Icon.extend({
    options: {
        iconSize:     [35, 35], // size of the icon
        iconAnchor:   [17.5, 35], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
    }
});

var FateIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/Boss_FATE_icon.png",}),
    OwIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/OW_icon.png",}),
    LeveIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/LEVE_icon.png"});
    SlayIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/Slay_FATE_icon.png"})

class Crab {
    constructor(x, y, name, type, info) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.type = type;
        this.info = info;
    }
}

const crabsELN = [
    new Crab(745, 145, "Cancer", "BFATE", "It's Not Lupus"),
    new Crab(760, 170, "Snipper", "OW", "8"),
    new Crab(720, 120, "Snipper", "SFATE", "Crab and Go"),
    new Crab(730, 243, "Bloodshore Snipper", "LEVE", "Clearing Steer; Out to Sea; Sol Survivors; Under Foot")
];

const crabsMLN = [
    new Crab(340, 660, "Shearing Sheridan", "BFATE", "Shearing is Caring"),
    new Crab(350, 720, "Spawning Megalocrab", "SFATE", "Sister Crustacean"),
    new Crab(330, 640, "Megalocrab", "OW", "16")
];

const crabsLLN = [];

const crabsWLN = [];

const crabsULN = [];

const crabsOLN = [];

function makeMarkers(crabList, mapname, view1, view2) {
    document.getElementById('holdmap').innerHTML = "<div id='map'></div>";
    const img = new Image();
    img.src = "Pictures/Map/"+mapname;
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -0.55,
        maxBounds: [[0,0], [1000,1000]]
    });

    var bounds = [[0,0], [1000,1000]];
    var image = L.imageOverlay("Pictures/Map/"+mapname, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setView( [view1, view2], 0.4)

    var added = []
    crabList.forEach(crab => {
        if (crab.type === "BFATE"){
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FateIcon}).bindPopup(crab.name + "<br>" + crab.info));
        } else if (crab.type === "OW") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:OwIcon}).bindPopup(crab.name + "<br>" + "Amount: " + crab.info));
        } else if (crab.type === "LEVE") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:LeveIcon}).bindPopup(crab.name + "<br>" + "Leves: " + crab.info));
        } else if (crab.type === "SFATE"){
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:SlayIcon}).bindPopup(crab.name + "<br>" + crab.info));
        }   
    });
    var markers = L.layerGroup(added).addTo(map);

    map.on('click', function(e){
        var coord = e.latlng;
        var lat = coord.lat;
        var lng = coord.lng;
        console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
        });
}
 