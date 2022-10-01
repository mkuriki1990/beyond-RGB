/*
  MOOC on Web Cartography

  Zoomable and dragable world map.
  Based on the the Leaflet mapping library.

  ©2018 Institute of Cartography and Geoinformation
  H. R. Baer, hbaer@ethz.ch
*/

// Wait until content is loaded.
window.addEventListener('load', function(evt) {
  
  // Create the map
  var map = L.map('map-1').setView([0, 0], 3);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'MOOC on Web Cartography'
  }).addTo(map);
  
  // Send custom event when the map is panned
  map.on('drag', function () {
    // Get the current map center
    var center = map.getCenter();
    var info = { lat: center.lat, lng: center.lng, zoom: map.getZoom(), src: 'map-1' };
    // Create and dispatch a custom event
    var event = new CustomEvent('synchronize', { detail: info });
    // See script "SynchronizedMap-2.js"
    window.dispatchEvent(event);
  });
  
  window.addEventListener('synchronize', function (evt) {
    var center = evt.detail;
    map.setView([center.lat, center.lng], center.zoom);
  });

});