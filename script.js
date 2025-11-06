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
  [49.805003, -97.148520],
  [49.8052, -97.1480]
];

const pathToALC = [
    [49.806855, -97.139393],
    [49.806371, -97.138765]
];

// ---------------- Walking Route coordinates ----------------
const walkingRoute = [
    [49.8052, -97.1480],
    [49.805519, -97.147355],
    [49.805058, -97.146979],
    [49.807464, -97.139713],
    [49.806504, -97.138989],
    [49.806371, -97.138765]
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

// Bus route polyline
const busRoutePolylineOutline1 = L.polyline(pathToStopA.concat(busRoute).concat(pathToALC), {
    color: 'black',       // line color
    weight: 13,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});

const busRoutePolylineOutline2 = L.polyline(pathToStopA.concat(busRoute).concat(pathToALC), {
    color: 'white',       // line color
    weight: 10,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});

const busRoutePolylineFill = L.polyline(pathToStopA.concat(busRoute).concat(pathToALC), {
    color: 'blue',       // line color
    weight: 6,           // line thickness
    opacity: 1,        // transparency
    smoothFactor: 1
});

// Walking route polyline
const walkingRoutePolyline = L.polyline(walkingRoute, {
    color: 'green',       // line color
    weight: 6,           // line thickness
    opacity: 1,        // transparency
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
    iconSize: [50, 50], // size of the icon in pixels
    iconAnchor: [25, 50], // point of the icon which corresponds to the marker's location
});
const walkingETAMarker = L.marker([49.806313, -97.143343], { icon: walkingETAIcon });

const busETAIcon = L.icon({
    iconUrl: 'markers/bus_eta.svg',
    iconSize: [50, 50], // size of the icon in pixels
    iconAnchor: [25, 50], // point of the icon which corresponds to the marker's location
});
const busETAMarker = L.marker([49.804038, -97.144554], { icon: busETAIcon });

const busStopIcon = L.icon({
    iconUrl: 'markers/bus_stop.svg',
    iconSize: [14, 14], // size of the icon in pixels
    iconAnchor: [7, 7], // point of the icon which corresponds to the marker's location
});
const busStopAMarker = L.marker([49.805003, -97.148520], { icon: busStopIcon });
const busStopBMarker = L.marker([49.806855, -97.139393], { icon: busStopIcon });


const screenLayers = {
    'searching-screen': [],
    'route-selection-screen': [userLocationMarker, pinMarker, walkingETAMarker, busETAMarker, busRoutePolylineOutline1, busRoutePolylineOutline2, busRoutePolylineFill, walkingRoutePolyline],
    'navigation-screen': [busRouteOutline, busRouteFill, pathToStopAOutline, pathToStopAFill, pathToALCOutline, pathToALCFill, busStopAMarker, busStopBMarker, userLocationMarker, pinMarker]
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
});

// ---------------- Leaflet map ----------------
// 1. Initialize the map and set its view
const map = L.map('map', {
    zoomControl: false
}).setView([49.8052, -97.1480], 16);

// 2. Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

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
