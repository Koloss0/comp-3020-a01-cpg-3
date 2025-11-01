const MAP_WIDTH = 2489;
const MAP_HEIGHT = 1338;

// ---------------- Sidebar toggle ----------------
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const searchBar = document.getElementById('searchBar');
    const map = document.getElementById('map');


    if (!searchBar) {
        console.error('search bar not found!');
        return;
    }
    if (!sidebar) {
        console.error('Sidebar not found!');
        return;
    }
    if (!map) {
        console.error('Map not found!');
        return;
    }

    // Show sidebar when the search bar is focused
    searchBar.addEventListener('focus', () => {
        sidebar.classList.remove('hidden');
    });

    map.addEventListener('click', () => {
        sidebar.classList.add('hidden');
    });

    const screenbuttons = document.querySelectorAll('.screen-selector button');
    const screens = ['searching-screen', 'route-selection-screen', 'navigation-screen'];

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

// ---------------- Adjust minZoom to fully fill screen ----------------
function updateMinZoom() {
    const mapSize = map.getSize();
    const zoomX = mapSize.x / width;
    const zoomY = mapSize.y / height;
    const scale = Math.min(zoomX, zoomY);

    // Compute theoretical zoom, then clamp it between your allowed min/max
    const computedZoom = map.getScaleZoom(scale);

    // Clamp zoom so it doesn’t go beyond the valid range
    const minZoom = Math.max(computedZoom, 0);
    const maxZoom = 2;

    map.setMinZoom(minZoom);
    map.setMaxZoom(maxZoom);

    // Keep the view fitting within bounds
    map.fitBounds(bounds);

    // Optional: stay slightly zoomed in for aesthetics
    map.setZoom(minZoom + 1);
}


// every time the screen changes size or is reloaded, the map must recalculate its max and min sizes
window.addEventListener('load', () => {
    map.invalidateSize();
});
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        map.invalidateSize();
    }, 150); // only fires 150ms after resizing stops
});

// Run once after map loads
updateMinZoom();

// Optional: adjust on window resize
window.addEventListener('resize', updateMinZoom);

