import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import './index.css'
import { test } from '../../../../../departamentos-misiones'

const styles = {
  width: "100%",
  height: "100%"
};

const accentsMap = {
  a: 'á|à|ã|â|À|Á|Ã|Â',
  e: 'é|è|ê|É|È|Ê',
  i: 'í|ì|î|Í|Ì|Î',
  o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
  u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
  c: 'ç|Ç',
  n: 'ñ|Ñ',
};

export const slugify = text => Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text);

function Map({ dimensions, areas, name, imageUrl, handleHover, handleClick }) {
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
          boxZoom: false,
          doubleClickZoom: false,
          scrollZoom: false,
          dragPan: false,
          dragRotate: false,
        });
  
        map.on("load", () => {
          const circles = areas.map(area => ({...area, name: slugify(area.name)}));
          map.addSource('misiones', {type: 'geojson', data: {...test, features: test.features.filter(feature => circles.some(circle => circle.name.toUpperCase() === feature.properties.departamento))}});
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
            map.addLayer({
              'id': 'misiones2',
              'type': 'symbol',
              'source': 'misiones',
              'layout': {},
              'layout': {
                'text-field': 'test',
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-radial-offset': 0.5,
                'text-justify': 'auto',
                }
              });
            map.resize();
          setMap(map);
        });

        map.on('click', 'misiones', (e) => {
          console.log(e)
        })

        map.on('mouseenter', 'misiones', () => {
          console.log(map.getCanvas())
          map.getCanvas().style.cursor = 'pointer';
          });
           
          // Change it back to a pointer when it leaves.
          map.on('mouseleave', 'misiones', () => {
          map.getCanvas().style.cursor = '';
          });
      };

      debugger;
        if (!map && container.current) initializeMap({ setMap, container });
    }, [areas, map])

    return (
      <div className='mapContainer'>
      <div ref={el => container.current = el} style={styles} />
      </div>
      )
}

export default Map;