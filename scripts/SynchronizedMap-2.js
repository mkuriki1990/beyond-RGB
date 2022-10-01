/*
  MOOC on Web Cartography

  Zoomable and dragable world map.
  Based on the D3 graphics library.

  ©2018 Institute of Cartography and Geoinformation
  H. R. Baer, hbaer@ethz.ch
*/


// Wait until content is loaded.
window.addEventListener('load', function(evt) {
  
  var worldFile = 'https://unpkg.com/world-atlas@1/world/110m.json';
  
  var width = 1000,
      height = 1000;
  
  // Define projection
  var projection = d3.geoMercator()
      .scale(0.5 * width / Math.PI)
      .translate([0.5 * width, 0.5 * height]);

  var path = d3.geoPath()
      .projection(projection);

  // Define graticule
  var graticule = d3.geoGraticule()
      .step([15, 15])
      .extent([[-180, -90], [180, 90]]);

  // Prepare SVG
  var svg = d3.select('#map-2')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 1000 1000');

  // Add a zoom panel and a drag panel
  var zoomPanel = svg
      .append('g')
      .attr('id', 'zoom-panel');

  var dragPanel = zoomPanel
     .append('g')
     .attr('id', 'drag-panel');

  // Load the world data set.
  d3.json(worldFile, function(error, world) {

    function redraw() {
      
      dragPanel.selectAll('*').remove();
      
      // Add the map's background.
      dragPanel.append('path')
        .datum({ type: 'Sphere' })
        .attr('id', 'background')
        .attr('d', path)
        .style('fill', '#def')
        .style('stroke', 'none');
      
      // Add the continents.
      dragPanel.append('path')
        .datum(topojson.feature(world, world.objects.land))
        .attr('id', 'continents')
        .attr('d', path)
        .style('fill', '#ffffff')
        .style('stroke', '#08f')
        .style('stroke-width', 0.8);
      
      // Add the country borders.
      dragPanel.append('path')
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr('id', 'countries')
        .attr('d', path)
        .style('fill', 'none')
        .style('stroke', '#080')
        .style('stroke-width', 0.5);
      
       // Add a graticule.
       dragPanel.append('g')
          .attr('id', 'graticule')
         .append('path')
          .datum(graticule)
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', '#444')
          .attr('stroke-width', 0.3);
      
    }
            
    // Receive the synchronization event.
    window.addEventListener('synchronize', function (evt) {
      var center = evt.detail;
      projection.rotate([-center.lng, -center.lat, 0]); // synchronize without rotation: projection.center([ -center.lat, -center.lng]);
      redraw();
    });

    // Allow standard zooming
    var zoom = d3.zoom()
      .scaleExtent([0.2, 5])
      .on('zoom', function() {
        zoomPanel.attr('transform', d3.event.transform);
      });
    
    // We do not just drag the map but change its projection center.
    var drag = d3.drag()
      .on('drag', function() {
        var rotate = projection.rotate();
        rotate[0] += 2 * 360 * d3.event.dx / width;
        rotate[1] -= 2 * 360 * d3.event.dy / height;
        projection.rotate(rotate);
        redraw();

        // To synchronize other maps, send a custom event.
        var info = { lat: rotate[1], lng: rotate[0], zoom: 3, src: 'map-2' };
        // Create and dispatch a custom event
        var event = new CustomEvent('synchronize', { detail: info });
        // See script "SynchronizedMap-2.js"
        window.dispatchEvent(event);
      })
    
    // BUG: map not correctly centered.
   
    zoom(zoomPanel);
    drag(dragPanel);

    redraw();
    
  });

});

