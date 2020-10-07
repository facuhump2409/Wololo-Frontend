import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import './index.css'

const styles = {
  width: "500px",
  height: "500px"
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
          zoom: 5
        });
  
        map.on("load", () => {
          setMap(map);
          map.resize();
        });
      };

        if (!map && container.current) initializeMap({ setMap, container });
    }, [map])

    debugger;
    return (
      <div>
      <div ref={el => container.current = el} style={styles} />
      </div>
      )
}

export default Map;