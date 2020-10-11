import React, { useState } from 'react';
import ReactMapboxGl, { Source, Layer, Popup } from "react-mapbox-gl";
import './index.css'
import { test } from '../../../../../departamentos-misiones'
import { getGeoJsonAreas, upperSlugify, paintBy } from './utils'
import TownActions from '../TownActions'

const styles = {
  width: "100vw",
  height: "93.5vh"
};

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoidGVvbm5uIiwiYSI6ImNrZzAwY3RoMjBqbHAydXBpMHFyeXQ2bjYifQ.aZZR74OETObsUi2tCtNbWg',
  doubleClickZoom: false,
  scrollZoom: false,
  dragRotate: false,
  logoPosition: 'top-left'
});

// setPaintProperty(layerId)

function Map({ center, province, currentUser, onTownHover, onTownClick }) {
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
            <Layer 
              type='fill' 
              sourceId={town.name} 
              paint={paintBy(town, currentUser)}
              onClick={(e) => onTownClick(JSON.parse(e.features[0].properties.town))}
              onMouseEnter={(e) => {
                e.target.getCanvas().style.cursor = 'pointer'
                onTownHover(JSON.parse(e.features[0].properties.town))
              }}
              onMouseLeave={(e) => {
                e.target.getCanvas().style.cursor = 'default'
              }}
              />
          ))}
        </MapboxMap>
    )
}

export default Map;