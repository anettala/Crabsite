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
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [17.5, 35], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
    }
});

var FateIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/Boss_FATE_icon.png",}),
    OwIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/OW_icon.png",}),
    LeveIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/LEVE_icon.png"}),
    SlayIcon = new MapIcon({iconUrl: "Pictures/Map/Markers/Slay_FATE_icon.png"}),
    Fishing = new MapIcon({iconUrl: "Pictures/Map/Markers/Fishing.png"}),
    FishingUW = new MapIcon({iconUrl: "Pictures/Map/Markers/Fishing_UW.png"}),
    Dungeon = new MapIcon({iconUrl: "Pictures/Map/Markers/Dungeon.png"}),
    Raid = new MapIcon({iconUrl: "Pictures/Map/Markers/Raid.png"}),
    Variant = new MapIcon({iconUrl: "Pictures/Map/Markers/Variant_icon.png"}),
    DeepD = new MapIcon({iconUrl: "Pictures/Map/Markers/Deep_icon.png"})

class Crab {
    constructor(x, y, name, type, info, desc, fish) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.type = type;
        this.info = info;
        this.desc = desc;
        this.fish = fish;
    }
}

// LA NOSCEA

const crabsELN = [
    new Crab(745, 145, "Cancer", "BFATE", "It's Not Lupus", "Claws so powerful they can split a rock in two. A shell so hard, not even the hammer of a mighty hecatoncheir can crack it. Cancer, a crab rumored to have been spawned in the heavens, has appeared in eastern La Noscea. Slay him and become the stuff of legends!", "You can get the smallshell minion from this ;)"),
    new Crab(760, 170, "Snipper", "OW", "8", "", ""),
    new Crab(720, 120, "Snipper", "SFATE", "Crab and Go", "Giant crabs known as snippers have invaded the once-pristine beaches of Bloodshore, making it difficult for Costa del Sol retirees to take their morning walks without having their raiments sliced to ribbons. The problem requires immediate attention, and adventurers are sought to cull the sidestepping sea creatures.", ""),
    new Crab(730, 243, "Bloodshore Snipper", "LEVE", "Clearing Steer; Out to Sea; Sol Survivors; Under Foot", "", ""),
    new Crab(708, 463, "Hidden Falls", "FISH", "Mitten Crab", "", ""),
    new Crab(473, 390, "East Agelyss River", "FISH", "Mitten Crab", "", ""),
    new Crab(354, 355, "Red Mantis Falls", "FISH", "Mitten Crab", "", ""),
    new Crab(476, 283, "Raincatcher Gully", "FISH", "Mitten Crab", "The Terpsichorean", ""),
    new Crab(386, 240, "The Juggernaut", "FISH", "Mudcrab", "", "")
];

const crabsMLN = [
    new Crab(340, 660, "Shearing Sheridan", "BFATE", "Shearing is Caring", "Shearing Sheridan has been shearing his share of luckless passersby since long before the Calamity. What the megalocrab needs now is a good shell-shocking.", ""),
    new Crab(350, 720, "Spawning Megalocrab", "SFATE", "Sister Crustacean", "A spawning megalocrab will do whatever it takes to see its brood safe, and that includes slicing in half Lalafellin fishers who draw too close to the wavekin's unhatched offspring. Slay a crab, save a lad.", ""),
    new Crab(330, 640, "Megalocrab", "OW", "16", "", ""),
    new Crab(487, 724, "Woad Whisper Canyon", "FISH", "River Crab", "", "")
];

const crabsLLN = [
    new Crab(556, 168, "Decoy Crab, Moraby Stoneshell", "LEVE", "Of Mice and Demons; Wrong and Rite", "", ""),
    new Crab(564, 212, "Suspicious Megalocrab, Big Claw", "LEVE", "Claw-struck; The Deathliest Catch", "", ""),
    new Crab(635, 140, "Hullbreaker Isle", "DUN", "Sallet Crab", "4", ""),
    new Crab(557, 102, "Megalocrab", "OW", "17", "", ""),
    new Crab(399, 145, "The Salt Strand", "FISH", "Helmet Crab", "Meteor Survivor", "Pebble Crab"),
    new Crab(626, 385, "Moraby Bay", "FISH", "Pebble Crab", "", ""),
    new Crab(832, 587, "Cedarwood", "FISH", "Pebble Crab", "", ""),
    new Crab(618, 183, "Moraby Drydocks", "FISH", "Pebble Crab", "Jacques the Snipper", ""),
    new Crab(573, 51, "Oschon's Torch", "FISH", "Pebble Crab", "", ""),
    new Crab(482, 70, "Candlekeep Quay", "FISH", "Pebble Crab", "", ""),
];

const crabsWLN = [
    new Crab(665, 492, "Sastasha(Hard)", "DUN", "Cave Crab, Dripping Sallet, Beryl Crab", "1, 1, 2", ""),
    new Crab(736, 308, "Old Six-Arms", "BFATE", "(I Just) Died in Six Arms Tonight", "It is believed most crabs only live for two to three years─fewer if nearby Lominsans are hungry. There is one crab, however, that is rumored to have survived since the Fifth Astral Era, surviving on the blood of man (though no one can truly back that claim). All things must die, and Old Six-arms's time has come.", ""),
    new Crab(665, 500, "Sastasha", "DUN", "Fossilshell", "4", ""),
    new Crab(712, 275, "The Brewer's Beacon", "FISH", "Helmet Crab", "", ""),
    new Crab(802, 247, "Swiftperch", "FISH", "Pebble Crab", "", ""),
];

const crabsULN = [
    new Crab(320, 430, "Karkinos", "BFATE", "Giant Enemy Crab", "A crab released into Bronze Lake by Qiqirn so that the beastmen might harvest its sweet eggs has grown into an uncontrollable nuisance. Not only does it not produce any eggs of its own (on the account of being a male), it also ravages the nests of the local waterfowl, devouring their eggs. Karkinos must be slain.", ""),
    new Crab(657, 458, "Northeast Bronze Lake", "FISH", "Mitten Crab", "", ""),
    new Crab(308, 431, "Oakwood", "FISH", "River Crab", "", ""),
    new Crab(194, 508, "Fool Falls", "FISH", "River Crab", "", ""),
    new Crab(792, 415, "Bronze Lake Shallows", "FISH", "River Crab", "", ""),
];

const crabsOLN = [
    new Crab(448, 583, "Northwest Bronze Lake", "FISH", "Mitten Crab", "", "")
];

// THE BLACK SHROUD

const crabsES = [
    new Crab(610, 517, "Sylphlands", "FISH", "Mushroom Crab", "Magicked Mushroom", ""),
    new Crab(404, 610, "Sanctum of the Twelve", "FISH", "River Crab", "The Assassin", ""),
    new Crab(210, 460, "Sweetbloom Pier", "FISH", "River Crab", "", ""),
    new Crab(469, 496, "Verdant Drop", "FISH", "River Crab", "", ""),
    new Crab(560, 406, "Spingripple Brook", "FISH", "River Crab", "", ""),
];

const crabsSS = [
    new Crab(330, 659, "Middle Hathoeva River", "FISH", "Mitten Crab", "", ""),
    new Crab(263, 340, "Rootslake", "FISH", "Mitten Crab", "", ""),
    new Crab(896, 590, "Urth's Gift", "FISH", "Mitten Crab", "", ""),
    new Crab(252, 551, "Lower Hathoeva River", "FISH", "Mudcrab", "", ""),
    new Crab(496, 669, "East Hathoeva River", "FISH", "Mudcrab", "", ""),
    new Crab(666, 710, "Goblinblood", "FISH", "Mudcrab", "", ""),
    new Crab(235, 834, "Upper Hathoeva River", "FISH", "River Crab", "", "")
];

const crabsCS = [
    new Crab(360, 439, "Everschade", "FISH", "Mitten Crab", "", ""),
    new Crab(337, 508, "Hopeseed Pond", "FISH", "Mudcrab", "", ""),
    new Crab(241, 461, "Haukke Manor", "FISH", "Mudcrab", "", "")
];

const crabsNS = [
    new Crab(486, 521, "Proud Creek", "FISH", "Mitten Crab", "", ""),
    new Crab(423, 539, "Lake Tahtotl", "FISH", "Mud Crab", "", ""),
    new Crab(623, 412, "Murmur Rills", "FISH", "River Crab", "", ""),
];

// THANALAN

const crabsWT = [
    new Crab(372, 519, "Bubbly Bernie", "BFATE", "Bubble Trouble", "Several crab-loving fishers have journeyed to the Footfalls in search of a giant delicacy-to-be known to the locals as Bubbly Bernie. Unfortunately, without some help, it looks like the fishers are going to be the ones to get served.", ""),
    new Crab(623, 500, "Loamshell", "LEVE", "From Ruins to Riches; Fields of Beans", "", ""),
    new Crab(400, 516, "Thickshell", "OW", "9", "", ""),
    new Crab(420, 530, "The Footfalls", "FISH", "Mudcrab", "Mud Golem", ""),
    new Crab(360, 439, "The Silver Bazaar", "FISH", "Pebble Crab", "", ""),
];

const crabsCT = [
    new Crab(365, 682, "Cutter's Cry", "DUN", "Sandshell", "8", ""),
    new Crab(653, 554, "The Unholy Heir", "FISH", "Mudcrab", "", ""),
];

const crabsET = [
    new Crab(592, 464, "Yugr'am River", "FISH", "Mitten Crab", "", ""),
    new Crab(314, 518, "North Drybone", "FISH", "Mud Crab", "", ""),
    new Crab(400, 417, "South Drybone", "FISH", "Mud Crab", "", ""),
];

const crabsST = [
    new Crab(595, 512, "Zahar’ak", "FISH", "Mudcrab", "", "")
];

// COERTHAS + MOR DHONA

const crabsCCH = []; // NO CRAB

const crabsCWH = [
    new Crab(737, 377, "Riversmeet", "FISH", "Coerthan Crab", "", ""),
    new Crab(823, 873, "Clearpool", "FISH", "Coerthan Crab", "", "")
];

const crabsTD = [
    new Crab(242, 150, "Diadem Grotto", "FISH", "Grade 4 Skybuilders' Cyan Crab", "", ""),
    new Crab(248, 284, "Southern Diadem Lake", "FISH", "Grade 4 Skybuilders' Goldsmith Crab", "", "")
];

const crabsMD = [
    new Crab(665, 683, "The Keeper of the Lake", "DUN", "Harnes Snipper, Codpiece Clipper", "1, 2", ""),
    new Crab(820, 557, "Eureka Orthos", "DEEP", "Orthos Big Claw, Orthos Craklaw", "4, 3", "51-60"),
    new Crab(293, 740, "The Deep Tangle", "FISH", "Mitten Crab", "", ""),
    new Crab(678, 768, "Singing Shards", "FISH", "MudCrab", "", "")
];

// ABALATHIA'S SPINE

const crabsSOC = [];

const crabsAL = [];

// DRAVANIA

const crabsTDF = [];

const crabsTCM = [];

// GYR ABANIA

const crabsRR = [];

const crabsTF = [];

const crabsTP = [];

const crabsTL = [];

// OTHARD

const crabsTRS = [];

const crabsY = [];

const crabsTAS = [];

// EUREKA

const crabsAN = [];

const crabsPA = [];

const crabsPY = [];

// NORVRANDT + ZADNOR

const crabsLL = [];

const crabsKH = [];

const crabsAA = [];

const crabsIM = [];

const crabsTRG = [];

const crabsTT = [];

const crabsZ = [];

// ILSABARD + ISLAND SANCTUARY

const crabsGM = [];

const crabsTH = [];

const crabsIS = [];

// DAWNTRAIL

const crabsUP = [];

const crabsKM = [];

const crabsYT = [];

const crabsSH = [];

const crabsLM = [];

function makeMarkers(crabList, mapname, view1, view2, zoom) {
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
    map.setView( [view1, view2], zoom)

    var added = []
    crabList.forEach(crab => {
        if (crab.type === "BFATE"){
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FateIcon}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish));
        } else if (crab.type === "OW") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:OwIcon}).bindPopup(crab.name + "<br>" + "Amount: " + crab.info));
        } else if (crab.type === "LEVE") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:LeveIcon}).bindPopup(crab.name + "<br>" + "Leves: " + crab.info));
        } else if (crab.type === "SFATE"){
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:SlayIcon}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish));
        } else if (crab.type === "FISH") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Fishing}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish));
        } else if (crab.type === "FISHUW") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FishingUW}).bindPopup(crab.name + "<br>" + crab.info));
        } else if (crab.type === "DUN") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Dungeon}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + "Amount: " + crab.desc));
        } else if (crab.type === "RAID") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Raid}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + "Amount: " + crab.desc));
        } else if (crab.type === "DEEP") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:DeepD}).bindPopup(crab.name + "<br>" + crab.info + "<br>" + "Amount: " + crab.desc + "<br>" + "Floors: " + crab.fish));
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
 