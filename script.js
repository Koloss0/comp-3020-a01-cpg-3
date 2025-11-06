const MAP_WIDTH = 2489;
const MAP_HEIGHT = 1338;

// ---------------- Sidebar toggle ----------------
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const screenbuttons = document.querySelectorAll('button.screen-selector');
    const screens = ['searching-screen', 'route-selection-screen', 'navigation-screen'];
    console.log(screenbuttons);
    screenbuttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            screens.forEach(id => {
                const screen = document.getElementById(id);
                if (screen) {
                    screen.style.display = (id === target) ? 'block' : 'none';
                }
            });
        });
    });
});

// ---------------- Leaflet map ----------------

// Initialize Leaflet map
const map = L.map('map', {
    crs: L.CRS.Simple,   // simple image coordinates
    minZoom: 0,           // will be adjusted dynamically
    maxZoom: 2,         // maximum zoom in
    zoom: 1,
    zoomControl: false
});



// Image size in pixels (replace with your campusmap.png size)
const width = MAP_WIDTH;
const height = MAP_HEIGHT;
const bounds = [[0, 0], [height, width]];

// Add image overlay
L.imageOverlay('campusmap.png', bounds).addTo(map);
L.control.zoom({ position: 'bottomright' }).addTo(map);


// Fit map to image initially
map.fitBounds(bounds);

// Prevent dragging outside image
map.setMaxBounds(bounds);

// proof of concept for adding locations to the map :D
const locations = [
    { x: 1200, y: 500, name: "Building A" },
    { x: 800, y: 900, name: "Building B" },
    { x: 1600, y: 700, name: "Building C" }
];

locations.forEach(loc => {
    L.marker([loc.y, loc.x])
        .addTo(map)
        .bindPopup(loc.name);
});
