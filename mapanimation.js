// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoicmxvbWF4MTk5MCIsImEiOiJja2x3ZWx1d3Iwd2o1MnVuNnAxdjVveGx6In0.x9LFSlg2P4Q0sY_bNVdjIQ';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
  pitch: 185,
  bearing:80,
  styles: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
});

map.on('load', function () {
  map.addSource('mapbox-dem', {
  'type': 'raster-dem',
  'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
  'tileSize': 512,
  'maxzoom': 14
  });
  // add the DEM source as a terrain layer with exaggerated height
  map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
   
  // add a sky layer that will show when the map is highly pitched
  map.addLayer({
  'id': 'sky',
  'type': 'sky',
  'paint': {
  'sky-type': 'atmosphere',
  'sky-atmosphere-sun': [0.0, 0.0],
  'sky-atmosphere-sun-intensity': 15
  }
  });
  });

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
var marker = new mapboxgl.Marker()
  .setLngLat([-71.093729, 42.359244])
  .addTo(map);
  
// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  marker.setLngLat(busStops[counter]);
  counter += 1;
  setTimeout(move, 1000);
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
async function run(){
  // get bus data    
const locations = await getBusLocations();
console.log(new Date());
console.log(locations);

// timer
setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}

run();

