# NASA Space Apps Challenge 2022

**Team:**
Beyond_RGB

**Members:** 
[Armstrong Ngolo](https://arngolo.github.io/homepage).
[Kuriki Murahashi](https://mkuriki.com)

This aplication uses Satellite data and source code from Google Earth Engine (GEE) for analisys.

We used Landsat9 images to calculate spectral indices of Bareground and built-up (Normalized Difference Built-up Index (NDBI)), water (Moisture Enhanced Index (MEI)) and Vegetation (Vegetation Index considering Green and Short wave infrared (VIGS)) based on their spectral reflectance. Later we stacked the 3 spectral indices to form a 3 chanels image (NDBI for Red, MEI for green and VIGS for blue channel) that we exported to Google Cloud Storage (GCS) (subscription required) in form of map tiles.

For visualization we used [Leaflet](https://leafletjs.com/) and [Cesium](https://cesium.com/) Libraries with background images from openstreet map and later we overlayed our map tile stored in GCS.

# Results

[beyond_rgb](https://mkuriki.com/spaceApps2022/beyond-RGB/scripts/beyond_rgb.html). Please zoom to Luanda in Africa to visualize a demo result.

**Repositories:**
- [earthengine.googlesource.com/users/arngolo/imagery-on-the-fly](https://earthengine.googlesource.com/users/arngolo/imagery-on-the-fly)
- [mkuriki1990/beyond-RGB](https://github.com/mkuriki1990/beyond-RGB)

# Resources used
Google cloud APIs
- Google Earth Engine (code editor, NASA's Landasat9 data);
- Google Cloud Storage (subscription required).

**Notes on maptiles storage:**
If we want to make map tiles, we have to save the maps into GCS which requires a paid subscription.
Under GCS, a `bucket`, from where the map tiles will be stored needs to be created and be granted public permissions.
The map tiles can be used to overlay other web map visualization tools such as Leaflet. You just have to open one of the tiles and copy its URL.

# Licence
The source code is licensed under MIT License. 
