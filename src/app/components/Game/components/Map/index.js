import React, { useState } from 'react';
import ReactMapboxGl, { Source, Layer, ZoomControl } from "react-mapbox-gl";
import './index.css'
import { getGeoJsonAreas, upperSlugify, paintBy } from './utils'
import TownActions from '../TownActions'

const styles = {
  width: "100vw",
  height: "93.5vh"
};

const MapboxMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPS_KEY,
  doubleClickZoom: false,
  dragRotate: false,
  logoPosition: 'top-left'
});
function Map({ province, geojson, currentUser, onTownHover, onTownClick }) {
  const [mapProperties, setMapProperties] = useState({
    center: [province.centroid.lon, province.centroid.lat],
    zoom: [5]
  });

  const geoJsonAreas = getGeoJsonAreas(geojson, province.towns)

  const handleMouseEnter = (e) => {
    e.target.getCanvas().style.cursor = 'pointer'
    onTownHover(JSON.parse(e.features[0].properties.town))
  }

  const handleMouseLeave = (e) => {
    e.target.getCanvas().style.cursor = 'default'
  }

    return (
        <MapboxMap 
        containerStyle={styles} 
        style="mapbox://styles/mapbox/light-v8"
        center={mapProperties.center}
        zoom={mapProperties.zoom}
        >
          {province.towns.map(town => (
            <Source 
              id={town.name} 
              geoJsonSource={{
                type: 'geojson', 
                data: geoJsonAreas.find(feature => 
                  feature.properties.town.name === town.name)
            }} />
          ))}
          
          {province.towns.map(town => (
            <Layer 
              type='fill' 
              sourceId={town.name} 
              paint={paintBy(town, currentUser)}
              onClick={(e) => onTownClick(JSON.parse(e.features[0].properties.town))}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              />
          ))}
        <ZoomControl/>
        </MapboxMap>
    )
}

export default Map;