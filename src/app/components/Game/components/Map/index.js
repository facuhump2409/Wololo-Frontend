import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import './index.css'
import { test } from '../../../../../departamentos-misiones'

const styles = {
  width: "100%",
  height: "100%"
};

function Map({ dimensions, circles, name, imageUrl, handleHover, handleClick }) {
  const [map, setMap] = useState(null);
  const container = useRef(null);

    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoidGVvbm5uIiwiYSI6ImNrZzAwY3RoMjBqbHAydXBpMHFyeXQ2bjYifQ.aZZR74OETObsUi2tCtNbWg';
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: container.current,
          style: "mapbox://styles/mapbox/light-v8", // stylesheet location
          center: [-54.6516966230371, -26.8753965086829],
          zoom: 7,

        });
  
        map.on("load", () => {
          map.addSource('misiones', {type: 'geojson', data: test});
          map.addLayer({
            'id': 'misiones',
            'type': 'fill',
            'source': 'misiones',
            'layout': {},
            'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
            }
            });
            map.resize();
          setMap(map);
        });
      };

        if (!map && container.current) initializeMap({ setMap, container });
    }, [map])

    return (
      <div className='mapContainer'>
      <div ref={el => container.current = el} style={styles} />
      </div>
      )
}

export default Map;