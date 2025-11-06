const MAP_WIDTH = 1651*0.75;
const MAP_HEIGHT = 941*0.75;

const SCREENS = ['searching-screen', 'route-selection-screen', 'navigation-screen'];
let current_screen = 'searching-screen';

function showScreen(screenId) {
    SCREENS.forEach(id => {
        const SCREEN = document.getElementById(id);
        SCREEN.style.display = (id === screenId) ? 'block' : 'none';
    });
    
    current_screen = screenId;

    if (screenId === 'navigation-screen') {
        showNavigationScreen();
    }
}

function showNavigationScreen() {
}

// ---------------- Sidebar toggle ----------------
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const screenbuttons = document.querySelectorAll('button.screen-selector');
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
            current_screen = target;
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

// 3. Define your custom icon
const userIcon = L.icon({
    iconUrl: 'icons/user_location_marker.svg',
    iconSize: [40, 40], // size of the icon in pixels
    iconAnchor: [20, 20], // point of the icon which corresponds to the marker's location
});

// 4. Create the marker
const marker = L.marker([49.8052, -97.1480], { icon: userIcon });

marker.addTo(map);