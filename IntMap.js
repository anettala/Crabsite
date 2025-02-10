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
    LeveIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/LEVE_icon.png"}),
    SlayIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/Slay_FATE_icon.png"}),
    Fishing = new MapIcon({iconUrl: "Pictures/Map/Markers/Fishing.png"}),
    FishingUW = new MapIcon({iconUrl: "Pictures/Map/Markers/Fishing_UW.png"});

class Crab {
    constructor(x, y, name, type, info, desc) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.type = type;
        this.info = info;
        this.desc = desc;
    }
}

// LA NOSCEA

const crabsELN = [
    new Crab(745, 145, "Cancer", "BFATE", "It's Not Lupus", "Claws so powerful they can split a rock in two. A shell so hard, not even the hammer of a mighty hecatoncheir can crack it. Cancer, a crab rumored to have been spawned in the heavens, has appeared in eastern La Noscea. Slay him and become the stuff of legends!"),
    new Crab(760, 170, "Snipper", "OW", "8", ""),
    new Crab(720, 120, "Snipper", "SFATE", "Crab and Go", "Giant crabs known as snippers have invaded the once-pristine beaches of Bloodshore, making it difficult for Costa del Sol retirees to take their morning walks without having their raiments sliced to ribbons. The problem requires immediate attention, and adventurers are sought to cull the sidestepping sea creatures."),
    new Crab(730, 243, "Bloodshore Snipper", "LEVE", "Clearing Steer; Out to Sea; Sol Survivors; Under Foot", "")
];

const crabsMLN = [
    new Crab(340, 660, "Shearing Sheridan", "BFATE", "Shearing is Caring", "Shearing Sheridan has been shearing his share of luckless passersby since long before the Calamity. What the megalocrab needs now is a good shell-shocking."),
    new Crab(350, 720, "Spawning Megalocrab", "SFATE", "Sister Crustacean", "A spawning megalocrab will do whatever it takes to see its brood safe, and that includes slicing in half Lalafellin fishers who draw too close to the wavekin's unhatched offspring. Slay a crab, save a lad."),
    new Crab(330, 640, "Megalocrab", "OW", "16", "")
];

const crabsLLN = [];

const crabsWLN = [];

const crabsULN = [];

const crabsOLN = [];

// THE BLACK SHROUD

const crabsES = [];

const crabsSS = [];

const crabsCS = [];

const crabsNS = [];

// THANALAN

const crabsWT = [];

const crabsCT = [];

const crabsET = [];

const crabsST = [];

const crabsNT = [];

// COERTHAS + MOR DHONA

const crabsCCH = [];

const crabsCWH = [];

const crabsTD = [];

const crabsMD = [];

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
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FateIcon}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + crab.desc));
        } else if (crab.type === "OW") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:OwIcon}).bindPopup(crab.name + "<br>" + "Amount: " + crab.info));
        } else if (crab.type === "LEVE") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:LeveIcon}).bindPopup(crab.name + "<br>" + "Leves: " + crab.info));
        } else if (crab.type === "SFATE"){
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:SlayIcon}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + crab.desc));
        } else if (crab.type === "FISH") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Fishing}).bindPopup(crab.name + "<br>" + crab.info));
        } else if (crab.type === "FISHUW") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FishingUW}).bindPopup(crab.name + "<br>" + crab.info));
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
 