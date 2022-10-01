window.addEventListener('load', function(evt) {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZmI3ZGUwOC0xZDJjLTRjMjctOGFhZi00NGVjNDQyMWY1MGYiLCJpZCI6OTkxNTksImlhdCI6MTY1NjQ3NTQ1NH0.UC55pavgqAHFaNyFyJNfSAOIJmvHfL3sPO-vjW2JUdQ';

    // Cesium Viewer (in order to use the Cesium Viewer widget, we have included its CSS in the resources)
    var viewer = new Cesium.Viewer('map-4', {
        animation: true,
        baseLayerPicker: true,
        fullscreenButton: true,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        timeline: true,
        navigationHelpButton: false,
        infoBox: false,
        selectionIndicator: false,
        shouldAnimate: true,
        // imageryProvider : Cesium.createOpenStreetMapImageryProvider({
        //     url : 'https://a.tile.openstreetmap.org/'
        //   })
    });

    viewer.canvas.addEventListener("click", function () {
        //get current cesium camera center coordinate
        // var camera = viewer.camera;
        var center = viewer.camera.positionCartographic;

        var lon = Cesium.Math.toDegrees(center.longitude).toFixed(5);
        var lat = Cesium.Math.toDegrees(center.latitude).toFixed(5);

        var info = { lat: lat, lng: lon, zoom: 3, src: 'map-4' };
        // Create and dispatch a custom event
        var event = new CustomEvent('synchronize', { detail: info });

        // See script "SynchronizedMap-2.js"
        window.dispatchEvent(event);
        
      });

    // Receive the synchronization event from map-1.
    window.addEventListener('synchronize', function (evt) {
        var center = evt.detail;
        var height = 15000000.0;
        // FlyTo takes longitude, latitude, and height respectively as input
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(center.lng, center.lat, height),}); // for a large scale view, height needs to be a large number
        });
})