<template>
  <div id="map" style="width: 100%; height: 500px;"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import { onMounted } from 'vue';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoieHlpbjAwMjQiLCJhIjoiY20yN2J4MW9pMGszdDJpcXQ3MWdqZmg0ZiJ9.eUrddyFmAqZJ-LDW2zZxeg';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9
  });

  // Add navigation controls to the map
  map.addControl(new mapboxgl.NavigationControl());

  // Add geolocation control to the map
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    })
  );

  // Add Mapbox Geocoder for searching places of interest
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search for places',
    marker: true,
  });

  // Add the Geocoder to the map
  map.addControl(geocoder);

  // Add the Directions control for route navigation
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
  });

  // Add Directions control to the map
  map.addControl(directions, 'top-left');
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
