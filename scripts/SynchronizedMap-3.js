
// Wait until content is loaded.
window.addEventListener('load', function(evt) {
  
  // Create the map with a background image
  var map = L.map('map-3').setView([0, 0], 3);
  var globalLayer = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }).addTo(map),
  localLayer = L.tileLayer('https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/1c4484d440fdf22586936f873efd32da-2e6b70e2cbc1528ca58bc65215e1c46e/tiles/{z}/{x}/{y}');

  var groupLayer = L.layerGroup([globalLayer, localLayer]);

  groupLayer.addTo(map);
    
  // Send custom event when the map is panned
  map.on('drag', function () {
    // Get the current map center
    var center = map.getCenter();
    var info = { lat: center.lat, lng: center.lng, zoom: map.getZoom(), src: 'map-3' };
    // Create and dispatch a custom event
    var event = new CustomEvent('synchronize', { detail: info });
    // See script "SynchronizedMap-2.js"
    window.dispatchEvent(event);
  });

  //
  window.addEventListener('synchronize', function (evt) {
    var center = evt.detail;
    map.setView([center.lat, center.lng], center.zoom);
  });
});