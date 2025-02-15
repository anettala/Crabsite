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
        iconAnchor:   [15.5, 15], // point of the icon which will correspond to marker's location
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
    new Crab(827, 247, "Big Claw; Pebble Crab", "LEVE", "<b>BC:</b> Grabbing Crabs <br> FC: Brain Candy", "", ""),
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
    new Crab(365, 627, "Bubbly Bernie", "BFATE", "Bubble Trouble", "Several crab-loving fishers have journeyed to the Footfalls in search of a giant delicacy-to-be known to the locals as Bubbly Bernie. Unfortunately, without some help, it looks like the fishers are going to be the ones to get served.", ""),
    new Crab(538, 631, "Loamshell", "LEVE", "From Ruins to Riches; Fields of Beans", "", ""),
    new Crab(382, 626, "Thickshell", "OW", "9", "", ""),
    new Crab(396, 639, "The Footfalls", "FISH", "Mudcrab", "Mud Golem", ""),
    new Crab(340, 298, "The Silver Bazaar", "FISH", "Pebble Crab", "", ""),
    new Crab(261, 706, "Vesper Bay", "FISH", "Pebble Crab", "", ""),
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

const crabsFD = [
    new Crab(564, 212, "Coerthan Crab", "LEVE", "<b>FC:</b> Please Halone, Tell Me I'm Still Asleep; Snipped for Spirituality (L)", "", "")
];

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

const crabsSOC = [
    new Crab(909, 838, "Neverreap", "DUN", "Mythrite Shell", "3", "")
];

const crabsAL = [
    new Crab(370, 739, "Alpha Quadrant", "FISH", "High Allagan Helmet", "Augmented High Allagan Helmet", ""),
];

// DRAVANIA

const crabsTDF = [
    new Crab(281, 715, "Mourn", "FISH", "Granite Crab", "Lava Crab", ""),
    new Crab(204, 843, "West Mourn", "FISH", "Granite Crab", "", ""),
    new Crab(426, 774, "Anyx Old", "FISH", "Granite Crab", "Lava Crab", ""),
    new Crab(154, 892, "Halo", "FISH", "Granite Crab", "", "")
];

const crabsTCM = [
    new Crab(583, 171, "Sohm Al", "DUN", "Lava", "3", "")
];

// GYR ABANIA

const crabsRR = [
    new Crab(488, 360, "Upper Mirage Creek", "FISH", "Broken Crab", "", "")
];

const crabsTF = [
    new Crab(314, 262, "The Comet's Tail", "FISH", "Nirvana Crab", "", "")
];

const crabsTP = [
    new Crab(124, 657, "Grymm & Enid", "FISH", "Grymm Crab", "", "")
];

const crabsTL = [
    new Crab(571, 340, "Loch Seld Southeastern Lakebed", "FISH", "Carpenter Crab", "", ""),
    new Crab(477, 316, "Loch Seld Southwestern Lakebed", "FISH", "Carpenter Crab", "", ""),
    new Crab(541, 422, "Loch Seld Central Lakebed", "FISH", "Mercenary Crab", "", "")
];

// OTHARD

const crabsTRS = [
    new Crab(496, 803, "Heaven-On-High", "DEEP", "Heavenly Coralshell, Heavenly Unkiu", "1, 1", "1-10; 11-20"),
    new Crab(39, 120, "Shisui of the Violet Tides", "DUN", "Blue Unkiu, Violet Coralshell", "1, 3", ""),
    new Crab(733, 387, "Mishirushi", "BFATE", "Soak Up the Sun", "From Kugane's back alleys to her bathhouses, dark rumors spread like blood from the neck of a decapitated criminal. The rumor? That the decapitated head of Mishirushi─a fallen warrior executed for murder─has come back to life to continue its killing ways, slicing up innocent maidens with its crab-like claws. Crab-like claws?", ""),
    new Crab(703, 172, "Unkiu", "SFATE", "Crab Mentality", "Unkiu hunt by riding ocean currents, preserving energy until they have spotted their prey which, for these unfussy eaters with perpetually empty bellies, is just about anything with meat on its bones.", ""),
    new Crab(691, 835, "Coralshell", "BFATE", "The Coral High Ground", "The Ruby Tithe is not the only manner in which pirates of the Confederacy line their coffers with coin. Some lower-ranking members are tasked with gathering beached coral for sale to Kugane's lapidaries. One such enterprising young pirate is offering a percentage of her cut to all who aid her in her search.", ""),
    new Crab(636, 91, "Hells' Lid", "DUN", "Hellish Gasame", "3", ""),
    new Crab(572, 135, "Gasame", "OW", "6", "", ""),
    new Crab(816, 912, "Craklaw", "OW", "10", "", ""),
    new Crab(845, 489, "Unkiu", "OW", "20", "", ""),
    new Crab(400, 429, "The Adventure", "FISHUW", "Snow Crab", "", ""),
    new Crab(756, 314, "Ruby Price Depths", "FISHUW", "Spider Crab", "", ""),
    new Crab(666, 931, "Northern Onokoro", "FISHUW", "Ruby-spotted Crab", "", ""),
    new Crab(547, 941, "Northwestern Onokoro", "FISHUW", "Ruby-spotted Crab", "", ""),
    new Crab(848, 710, "Northeastern Bekko", "FISHUW", "Skipping Stone", "", "")
];

const crabsY = [
    new Crab(265, 361, "The Swallow's Compass", "DUN", "River Unkiu", "3", ""),
    new Crab(338, 102, "The One River Southwestern Riverbeds", "FISHUW", "Gauntlet Crab", "", ""),
    new Crab(815, 117, "Imperial Hypersonic Assault Craft L-XXIII", "FISHUW", "Kamina Crab", "", ""),
    new Crab(252, 773, "The Dragon's Struggle", "FISHUW", "Yu-no-hana Crab", "", "")
];

const crabsTAS = [
    new Crab(677, 522, "Hak Khaal", "FISH", "Khaal Crab", "", "")
];

// EUREKA

const crabsAN = [
    new Crab(252, 358, "Mighty Craklaw", "OW", "4", "", ""),
    new Crab(696, 503, "Spangencrab", "OW", "6", "", "")
];

const crabsPA = [
    new Crab(190, 644, "King Artho, Knight Crab", "BFATE", "Morte Artho", "Woe betide an invader in this land of many kings. The latest to heed the call of his beleaguered people is the noble King Arthro, leader of knights round...and clawed.", ""),
    new Crab(195, 614, "Val Snipper", "OW", "12", "", "")
];

const crabsPY = [
    new Crab(569, 373, "Lost Big Claw, Lost Snipper", "BFATE", "We're All Mad Here", "Whether their urge to snatch coral from atop wandering snippers should be attributed to their zeal for irritating other fauna or a simple attraction to bright colors is unclear, but the fact remains that the happy bunnies have angered an impressive number of the creatures in doing so.", ""),
    new Crab(340, 861, "Pyros Crab", "OW", "7", "", ""),
    new Crab(616, 426, "Stray Snipper", "OW", "11", "", ""),
    new Crab(580, 597, "Clipper", "OW", "21", "", "")
];

// NORVRANDT + ZADNOR

const crabsCR = [
    new Crab(726, 538, "Paradise Crab; Gourmand Crab", "LEVE", "<b>FC:</b> Magic Mushrooms; Crab Corps", "", "")
];

const crabsLL = [
    new Crab(296, 297, "The Source", "FISH", "Kholusian King Crab", "Albino Rock Crab", "")
];

const crabsKH = [
    new Crab(173, 153, "The Western Kholusian Coast", "FISH", "Blue Crab", "Kholusian King Crab", "")

];

const crabsAA = [
    new Crab(359, 653, "The Hills of Amber", "FISH", "Garik Crab", "", ""),
    new Crab(755, 705, "The River of Sand", "FISH", "Shadow Crab", "", ""),
    new Crab(733, 246, "Nabaath Severance", "FISH", "Shadow Crab", "", "")
];

const crabsIM = [
    new Crab(714, 315, "Thysm Lran", "FISH", "Paradise Crab", "", ""),
    new Crab(708, 415, "East Longmirror Lake", "FISH", "Paradise Crab", "", "")
];

const crabsTRG = [
    new Crab(103, 395, "North Lake Tusi Mek'ta", "FISHUW", "Ankle Snipper", "Gourmand Crab", ""),
    new Crab(153, 317, "Lake Tusi Mek'ta", "FISH", "Robber Crab", "Clawbow", ""),
    new Crab(214, 510, "The Red Chalice", "FISH", "Clawbow", "", ""),
    new Crab(370, 494, "The Lozatl", "FISH", "Clawbow", "", ""),
    new Crab(566, 250, "South Mjrl's Regret", "FISH", "Robber Crab", "Clawbow", ""),
    new Crab(168, 627, "Woven Oath", "FISH", "Clawbow", "", ""),
    new Crab(614, 130, "Mjrl's Tears", "FISH", "Clawbow", "", ""),
    new Crab(112, 312, "Deep Lake Tusi Mek'ta", "FISHUW", "Gourmand Crab", "", ""),
    new Crab(208, 292, "The Covered Halls of Dwatl", "FISHUW", "Hermit Crab", "", "")
];

const crabsTT = [
    new Crab(121, 684, "West Caliban Gap", "FISH", "Yeti Crab", "Maru Crab", ""),
    new Crab(870, 834, "Blue Swimmer", "OW", "9", "", ""),
    new Crab(884, 677, "Trilobite", "OW", "17", "", "")
];

const crabsZ = [
    new Crab(246, 212, "Zadnor Stoneshell", "OW", "9", "", "")
];

// ILSABARD + ISLAND SANCTUARY + OLD SHARLAYAN

const crabsOS = [
    new Crab(726, 538, "Ruby-spotted Crab", "LEVE", "<b>FC:</b> Crabs for the Crabby", "", "")
];

const crabsGM = [
    new Crab(721, 150, "Lapis Manalis", "DUN", "Albus Craklaw", "4", "")
];

const crabsTH = [
    new Crab(557, 121, "Aloalo Island", "VAR", "Aloalo Snipper, Aloalo Crab, Aloalo Sallet", "1, 3, 3", "Paths 1-4"),
    new Crab(575, 121, "Another Aloalo Island", "VAR", "Aloalo Snipper, Aloalo Crab", "1, 2", ""),
    new Crab(363, 206, "Alzadaal's Legacy", "DUN", "Bounty Crawklaw, Radiant Crab", "2 ,8", "Clawtrap Alzadaal XIV <333"),
    new Crab(298, 324, "Akyaali Crab", "OW", "11", "", ""),
    new Crab(599, 132, "Yedlihmad", "FISH", "Gwl Crab", "Lale Crab", ""),
    new Crab(347, 125, "Southern Akyaali", "FISHUW", "Spiny King Crab", "", "")
];

const crabsIS = [
    new Crab(415, 725, "Beachcomb", "OW", "0-20 (max amount in pasture)", "", "")
];

// DAWNTRAIL

const crabsUP = [
    new Crab(463, 325, "Bothersome Bigclaw", "SFATE", "Claws and Effect", "Though it remains unclear how so many bigclaws scuttled into such a small reservoir, one thing is certain: they cannot be suffered to disrupt the natural ecosystem.", "")
];

const crabsKM = [
    new Crab(153, 650, "Wandering Craklaw", "SFATE", "This Kills the Craklaw", "A violent band of craklaws has settled into the lower marshes, snipping away at all manner of plant life. It is feared that they will soon hone their claws on the House of Winds High if left unchecked, and thus the order has been given to cull the crustaceans.", ""),
    new Crab(539, 696, "Waters Hanu", "FISH", "Plattershell", "Cazuela Crab", "")
];

const crabsYT = [
    new Crab(246, 194, "Jeuno: The First Walk", "RAID", "Aquarius, Robber Crab", "1, 2", ""),
    new Crab(745, 852, "Iq Rrax Tsoly Depths", "FISHUW", "Iq Rrax Crab", "", ""),
    new Crab(112, 831, "Xd'aa Talat Tsoly", "FISHUW", "Turali Land Crab", "", ""),
    new Crab(873, 387, "Xty'iinbek Tsoly", "FISH", "Yak T'el Crab", "", "")
];

const crabsSH = [
    new Crab(688, 879, "Tender Valley", "DUN", "Valley Tumbleclaw", "2", ""),
    new Crab(470, 488, "Tumbleclaw Kindler", "SFATE", "Claw and Order", "Tumbleclaw kindlers earn their name from doing what they do best, igniting fires─which is, admittedly, not a problem as long as they keep to damp areas such as ponds or swamps. Unfortunately, Sheshenewezi Springs is (despite the name) anything but damp, and a consortium of crabs currently marching through the place could see it all in flames if something is not done, and quick.", ""),
    new Crab(716, 193, "Tumbleclaw", "OW", "soooo many (32)", "", "")
];

const crabsLM = [
    new Crab(726, 538, "Alexandrian Clipper", "OW", "9", "", "")
];

function makeMarkers(crabList, mapname, view1, view2, zoom) {
    document.getElementById('holdmap').innerHTML = "<div id='map'></div>";
    const img = new Image();
    img.src = "Pictures/Map/"+mapname;
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -0.55,
        maxBounds: [[0, 0], [1010,1010]]
    });

    var bounds = [[0,0], [1000,1000]];
    var image = L.imageOverlay("Pictures/Map/"+mapname, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setView( [view1, view2], zoom)

    var added = []
    crabList.forEach(crab => {
        if (crab.type === "BFATE"){
            added.push(L.circle(L.latLng([ crab.y, crab.x ]), {color: "#f19dfa", fillColor: "#f0b2f7", fillOpacity: 0.5, radius: 17}));
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FateIcon}).bindPopup("<b>" + crab.name + "</b><br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish));
        } else if (crab.type === "OW") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:OwIcon}).bindPopup("<b>" + crab.name + "</b><br>" + "Amount: " + crab.info));
        } else if (crab.type === "LEVE") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:LeveIcon}).bindPopup("<b>" + crab.name + "</b><br>" + crab.info));
        } else if (crab.type === "SFATE"){
            added.push(L.circle(L.latLng([ crab.y, crab.x ]), {color: "#f19dfa", fillColor: "#f0b2f7", fillOpacity: 0.5, radius: 17}));
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:SlayIcon}).bindPopup("<b>" + crab.name + "</b><br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish));
        } else if (crab.type === "FISH") {
            if (crab.desc === "") {
                var text = "<b>" + crab.name + "</b><br>" + crab.info;
            } else if (crab.fish === ""){
                var text = "<b>" + crab.name + "</b><br>" + crab.info + "<br>" + crab.desc;
            } else {
                var text = "<b>" + crab.name + "</b><br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish;
            }
            added.push(L.circle(L.latLng([ crab.y, crab.x ]), {stroke: false, fillColor: "#aed9eb", fillOpacity: 0.5, radius: 15}));
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Fishing, zIndexOffset: 1000}).bindPopup(text));
        } else if (crab.type === "FISHUW") {
            if (crab.desc === "") {
                var text = "<b>" + crab.name + "</b><br>" + crab.info;
            } else if (crab.fish === ""){
                var text = "<b>" + crab.name + "</b><br>" + crab.info + "<br>" + crab.desc;
            } else {
                var text = "<b>" + crab.name + "</b><br>" + crab.info + "<br>" + crab.desc + "<br>" + crab.fish;
            }
            added.push(L.circle(L.latLng([ crab.y, crab.x ]), {stroke: false, fillColor: "#aed9eb", fillOpacity: 0.5, radius: 15}));
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:FishingUW, zIndexOffset: 1000}).bindPopup(text));
        } else if (crab.type === "DUN") {
            var text = "<b>" + crab.name + "</b><br>" + crab.info + "<br>" + "Amount: " + crab.desc;
            if (crab.fish != "") {
                var text = "<b>" + crab.name + "</b><br>" + crab.info + "<br>" + "Amount: " + crab.desc + "<br>" + crab.fish;
            }
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Dungeon}).bindPopup(text));
        } else if (crab.type === "RAID") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Raid}).bindPopup("<b>" + crab.name + "</b><br>" + crab.info + "<br>" + "Amount: " + crab.desc));
        } else if (crab.type === "DEEP") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:DeepD}).bindPopup("<b>" + crab.name + "</b><br>" + crab.info + "<br>" + "Amount: " + crab.desc + "<br>" + "Floors: " + crab.fish));
        } else if (crab.type === "VAR") {
            added.push(L.marker(L.latLng([ crab.y, crab.x ]), {icon:Variant, zIndexOffset: -100}).bindPopup("<b>" + crab.name + "</b><br>" + crab.info + "<br>" + "Amount: " + crab.desc + "<br>" + crab.fish));
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
 