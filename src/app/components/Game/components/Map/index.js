import React, { useState, useRef} from 'react';
import ReactMapboxGl, { Source, Layer } from "react-mapbox-gl";
import './index.css'
import { test } from '../../../../../departamentos-misiones'
import { getGeoJsonAreas, upperSlugify } from './utils'

const styles = {
  width: "100vw",
  height: "80vh"
};

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoidGVvbm5uIiwiYSI6ImNrZzAwY3RoMjBqbHAydXBpMHFyeXQ2bjYifQ.aZZR74OETObsUi2tCtNbWg',
  doubleClickZoom: false,
  scrollZoom: false,
  dragPan: false,
  dragRotate: false,
});

function Map({ center, province }) {
  const geoJsonAreas = getGeoJsonAreas(test, province.towns)
    return (
        <MapboxMap 
        containerStyle={styles} 
        style="mapbox://styles/mapbox/light-v8"
        center={center}
        zoom={[7]}
        >
          {province.towns.map(town => (
            <Source 
              id={town.name} 
              geoJsonSource={{
                type: 'geojson', 
                data: geoJsonAreas.features.find(feature => 
                  feature.properties.departamento === upperSlugify(town.name))
            }} />
          ))}
          
          {province.towns.map(town => (
            <Layer type='fill' sourceId={town.name} paint={{
              'fill-color': '#088',
              'fill-opacity': 0.8
            }} />
          ))}
        </MapboxMap>
    )
}

export default Map;