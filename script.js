const USER_LATITUDE = 49.8052;
const USER_LONGITUDE = -97.1480;

// ---------------- FlyTo Locations ----------------
// We need to offset the bounds slightly to account for UI elements covering parts of the map
const userLocation = L.latLng(USER_LATITUDE, USER_LONGITUDE - 0.000625);
const routeSelectionCenter = L.latLng(49.8048, -97.146200  - 0.0025);

// ---------------- Bus Route coordinates ----------------
const busRoute = [
  [49.805003, -97.148520],
  [49.804541, -97.148111],
  [49.803954, -97.149808],
  [49.802229, -97.148391],
  [49.803391, -97.146315],
  [49.803451, -97.146148],
  [49.804493, -97.143174],
  [49.805169, -97.143674],
  [49.805827, -97.141711],
  [49.805169, -97.141164],
  [49.805979, -97.138707],
  [49.806855, -97.139393]
];

const pathToStopA = [
  [USER_LATITUDE, USER_LONGITUDE],
  [49.805003, -97.148520]
];

const pathToALC = [
    [49.806855, -97.139393],
    [49.806371, -97.138765]
];

// ---------------- Walking Route coordinates ----------------
const walkingRoute = [
    [USER_LATITUDE, USER_LONGITUDE],
    [49.805519, -97.147355],
    [49.805058, -97.146979],
    [49.807464, -97.139713],
    [49.806504, -97.138989],
    [49.806371, -97.138765]
];

// ---------------- Shuttle Route coordinates ----------------
// This is the full shuttle route for display on the map.
const shuttleRoute = [
  [49.805126, -97.148640],
  [49.804541, -97.148111],
  [49.803954, -97.149808],
  [49.802229, -97.148391],
  [49.803391, -97.146315],
  [49.803451, -97.146148],
  [49.804493, -97.143174],
  [49.805169, -97.143674],
  [49.805827, -97.141711],
  [49.805169, -97.141164],
  [49.805979, -97.138707],
  [49.809388, -97.141438],
  [49.809862, -97.141247],
  [49.811392, -97.136720],
  [49.811482, -97.136216],
  [49.811419, -97.135776],
  [49.811468, -97.135475],
  [49.811793, -97.134381],
  [49.811779, -97.133888],
  [49.811516, -97.133265],
  [49.811419, -97.132664],
  [49.811599, -97.131903],
  [49.811973, -97.131398],
  [49.812666, -97.129435],
  [49.812548, -97.128695],
  [49.809931, -97.126485],
  [49.809612, -97.126528],
  [49.808975, -97.128276],
  [49.809391, -97.128684],
  [49.806054, -97.138490],
  [49.806150, -97.138834],
  [49.807334, -97.139788],
  [49.804994, -97.146859],
  [49.805513, -97.147374],
  [49.805126, -97.148640]
];

// ---------------- Polylines ----------------

// Bus route with outline and fill
const busRouteOutline = L.polyline(busRoute, {
  color: 'blue',       // line color
  weight: 8,           // line thickness
  opacity: 0.8,        // transparency
  smoothFactor: 1
});

const busRouteFill = L.polyline(busRoute, {
  color: 'white',       // line color
  weight: 4,           // line thickness
  opacity: 0.8,        // transparency
  smoothFactor: 1
});

// Bus route polyline
const busRoutePolylineFill = L.polyline(pathToStopA.concat(busRoute).concat(pathToALC), {
    color: '#29af00',       // line color
    weight: 6,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});
busRoutePolylineFill.on('click', (e) => {
    selectRoute("shuttle");
});

const busRoutePolylineOutline1 = L.polyline(pathToStopA.concat(busRoute).concat(pathToALC), {
    color: 'black',       // line color
    weight: 16,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});
busRoutePolylineOutline1.on('click', (e) => {
    selectRoute("shuttle");
});

const busRoutePolylineOutline2 = L.polyline(pathToStopA.concat(busRoute).concat(pathToALC), {
    color: 'white',       // line color
    weight: 11,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});
busRoutePolylineOutline2.on('click', (e) => {
    selectRoute("shuttle");
});

// Path to Stop A with outline and fill (dashed)
const pathToStopAOutline = L.polyline(pathToStopA, {
  color: 'black',       // line color
  weight: 8,           // line thickness
  opacity: 1,        // transparency
  smoothFactor: 1,
  dashArray: '8, 16'
});

const pathToStopAFill = L.polyline(pathToStopA, {
  color: 'white',       // line color
  weight: 4,           // line thickness
  opacity: 1,        // transparency
  smoothFactor: 1,
  dashArray: '8, 16'
});

// Path to ALC with outline and fill (dashed)
const pathToALCOutline = L.polyline(pathToALC, {
  color: 'black',       // line color
  weight: 8,           // line thickness
  opacity: 1,        // transparency
  smoothFactor: 1,
  dashArray: '8, 16'
});

const pathToALCFill = L.polyline(pathToALC, {
  color: 'white',       // line color
  weight: 4,           // line thickness
  opacity: 1,        // transparency
  smoothFactor: 1,
  dashArray: '8, 16'
});

// Walking route polyline
const walkingRoutePolylineFill = L.polyline(walkingRoute, {
    color: '#9708c7ff',       // line color
    weight: 6,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});

const walkingRoutePolylineOutline1 = L.polyline(walkingRoute, {
   color: 'white',       // line color
    weight: 11,           // line thickness
    opacity: 0,        // transparency
    smoothFactor: 1
});

const walkingRoutePolylineOutline2 = L.polyline(walkingRoute, {
    color: 'black',       // line color
    weight: 16,           // line thickness
    opacity: 0,        // transparency
    smoothFactor: 1
});

walkingRoutePolylineFill.on('click', (e) => {
    selectRoute("walking");
});
walkingRoutePolylineOutline1.on('click', (e) => {
    selectRoute("walking");
});
walkingRoutePolylineOutline2.on('click', (e) => {
    selectRoute("walking");
});

const shuttleRoutePolyline = L.polyline(shuttleRoute, {
    color: 'green',       // line color
    weight: 4,           // line thickness
    opacity: 0.8,        // transparency
    smoothFactor: 1
});

// ---------------- Markers ----------------

const userIcon = L.icon({
    iconUrl: 'markers/user.svg',
    iconSize: [40, 40], // size of the icon in pixels
    iconAnchor: [20, 20], // point of the icon which corresponds to the marker's location
});
const userLocationMarker = L.marker([49.8052, -97.1480], { icon: userIcon });

const pinIcon = L.icon({
    iconUrl: 'markers/destination.svg',
    iconSize: [40, 40], // size of the icon in pixels
    iconAnchor: [20, 40], // point of the icon which corresponds to the marker's location
});
const pinMarker = L.marker([49.806371, -97.138765], { icon: pinIcon });

const walkingETAIcon = L.icon({
    iconUrl: 'markers/walking_eta.svg',
    iconSize: [72, 72], // size of the icon in pixels
    iconAnchor: [36, 72], // point of the icon which corresponds to the marker's location
});
const walkingETAMarker = L.marker([49.806313, -97.143343], { icon: walkingETAIcon });
walkingETAMarker.on('click', (e) => {
    selectRoute('walking');
});

const busETAIcon = L.icon({
    iconUrl: 'markers/bus_eta.svg',
    iconSize: [72, 72], // size of the icon in pixels
    iconAnchor: [36, 72], // point of the icon which corresponds to the marker's location
});
const busETAMarker = L.marker([49.804038, -97.144554], { icon: busETAIcon });
busETAMarker.on('click', (e) => {
    selectRoute('shuttle');
});

const busStopIcon = L.icon({
    iconUrl: 'markers/bus_stop.svg',
    iconSize: [14, 14], // size of the icon in pixels
    iconAnchor: [7, 7], // point of the icon which corresponds to the marker's location
});
const busStopAMarker = L.marker([49.805003, -97.148520], { icon: busStopIcon });
const busStopBMarker = L.marker([49.806855, -97.139393], { icon: busStopIcon });

const shuttleIcon = L.icon({
    iconUrl: 'markers/shuttle.svg',
    iconSize: [52, 52], // size of the icon in pixels
    iconAnchor: [26, 26], // point of the icon which corresponds to the marker's location
});
const shuttleMarker = L.marker([49.806899, -97.136020], { icon: shuttleIcon });

const screenLayers = {
    'searching-screen': [userLocationMarker, shuttleRoutePolyline, shuttleMarker],
    'route-selection-screen': [shuttleMarker, shuttleRoutePolyline, userLocationMarker, pinMarker, walkingETAMarker, busETAMarker, walkingRoutePolylineOutline2, walkingRoutePolylineOutline1, walkingRoutePolylineFill, busRoutePolylineOutline1, busRoutePolylineOutline2, busRoutePolylineFill],
    'navigation-screen': [shuttleMarker, shuttleRoutePolyline, busRouteOutline, busRouteFill, pathToStopAOutline, pathToStopAFill, pathToALCOutline, pathToALCFill, busStopAMarker, busStopBMarker, userLocationMarker, pinMarker]
};

// ---------------- Switching Screens ----------------
const SCREENS = ['searching-screen', 'route-selection-screen', 'navigation-screen'];

function showScreen(screenId) {
    SCREENS.forEach(id => {
        const screen = document.getElementById(id);
        screen.style.display = (id === screenId) ? 'block' : 'none';
    });

    Object.values(screenLayers).forEach(layers => {
        layers.forEach(layer => {
            map.removeLayer(layer);
        });
    });

    const layers = screenLayers[screenId];
    layers.forEach(layer => {
        layer.addTo(map);
    });
    
    if (screenId === 'route-selection-screen') {
        map.flyTo(routeSelectionCenter, 16);
    } else if (screenId === 'navigation-screen') {
        map.flyTo(userLocation, 18);
    }
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const screenbuttons = document.querySelectorAll('button.screen-selector');

    screenbuttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            showScreen(target);
        });
    });

    // Show the initial screen
    showScreen('searching-screen');
});

// ---------------- Leaflet map ----------------
// 1. Initialize the map and set its view
const mapCentre = [49.8052, -97.1480]


const map = L.map('map', {
    zoomControl: false
}).setView(mapCentre, 16);

// 2. Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 11,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map)

// ---------------- Not Implemented Message ----------------
// Toast to show 'not implemented' message
function showNotImplementedMessage(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const unimplemented = document.querySelectorAll('[not-implemented]');

  unimplemented.forEach(e => {
    e.addEventListener('click', event => {
      event.preventDefault();
      showNotImplementedMessage("Feature not implemented.");
    });
  });
});

// allows button to be clicked but still displays "Feature not implemented"
document.addEventListener('DOMContentLoaded', () => {
  const unimplemented = document.querySelectorAll('[not-implemented2]');

  unimplemented.forEach(e => {
    e.addEventListener('click', event => {
      showNotImplementedMessage("Feature not implemented.");
    });
  });
});

// ---------------- Re-Centre Button ----------------
const campusZoom = 16;

function recenterMap() {
  const currScreen = SCREENS.find(id => document.getElementById(id).style.display !== 'none');

  switch(currScreen) {
    case 'searching-screen':
      map.flyTo(userLocation, campusZoom);
      break;

    case 'route-selection-screen':
      map.flyTo(routeSelectionCenter, 16);
      break;

    case 'navigation-screen':
      map.flyTo(userLocation, 18);
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const recenterButton = document.getElementById('recenter-button');

  if(recenterButton) {
    recenterButton.addEventListener('click', recenterMap)
  }
});

// ---------------- Back Button ----------------
document.addEventListener('DOMContentLoaded', function() {
    // ---------------- Back Button ----------------
    document.addEventListener('click', function(e) {
        if (e.target.closest('.back-button')) {
            const currentScreen = SCREENS.find(id => document.getElementById(id).style.display !== 'none');
            
            switch(currentScreen) {
                case 'route-selection-screen':
                    showScreen('searching-screen');
                    map.flyTo(mapCentre, 16);
                    break;
                case 'navigation-screen':
                    showScreen('route-selection-screen');
                    map.flyTo(userLocation, 16);
                    break;
                default:
                    window.history.back();
            }
        }
    });
});

// ---------------- Exit Navigation Button ----------------
document.addEventListener('DOMContentLoaded', () => {
    const exitButton = document.getElementById('exit-button');
    
    if (exitButton) {
        exitButton.addEventListener('click', function() {
            // Recenter to the initial landing page view
            map.flyTo(mapCentre, 16);
        });
    }
});

// ---------------- Route Selection Logic ----------------
const shuttlePolylines = [
    busRoutePolylineOutline1,
    busRoutePolylineOutline2,
    busRoutePolylineFill
];

const walkingPolylines = [
    walkingRoutePolylineOutline1,
    walkingRoutePolylineOutline2,
    walkingRoutePolylineFill
];

let selectedRoute = "shuttle";

function showRoute(polylines) {
    polylines.forEach(pl => {
        if (!map.hasLayer(pl)) {
            map.addLayer(pl);
        }
    });
}

function hideRoute(polylines) {
    polylines.forEach(pl => {
        if (map.hasLayer(pl)) {
            map.removeLayer(pl);
        }
    });
}

function selectRoute(route) {
    selectedRoute = route;

    const shuttleCard = document.getElementById("shuttle-card");
    const walkingCard = document.getElementById("walking-card");

    if (route === "shuttle") {
        shuttleCard.classList.add("selected");
        walkingCard.classList.remove("selected");
        
        busRoutePolylineOutline1.setStyle({ opacity: 1 });
        busRoutePolylineOutline2.setStyle({ opacity: 1 });
        
        walkingRoutePolylineOutline1.setStyle({ opacity: 0 });
        walkingRoutePolylineOutline2.setStyle({ opacity: 0 });
    } else {
        walkingCard.classList.add("selected");
        shuttleCard.classList.remove("selected");
        
        busRoutePolylineOutline1.setStyle({ opacity: 0 });
        busRoutePolylineOutline2.setStyle({ opacity: 0 });

        walkingRoutePolylineOutline1.setStyle({ opacity: 1 });
        walkingRoutePolylineOutline2.setStyle({ opacity: 1 });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const shuttleCard = document.getElementById("shuttle-card");
    const walkingCard = document.getElementById("walking-card");
    const startButton = document.getElementById("start-button");

    shuttleCard.classList.add("selected");

    shuttleCard.addEventListener("click", () => selectRoute("shuttle"));
    walkingCard.addEventListener("click", () => selectRoute("walking"));

   startButton.addEventListener("click", (e) => {
        if (selectedRoute !== "shuttle") {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showNotImplementedMessage("Navigation feature is only available for the shuttle route.");
        }
    }, true); 
});
