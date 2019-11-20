import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  useLoadScript,
  GoogleMap,
  DrawingManager
} from '@react-google-maps/api';
import img from '../../../../img/bg10.jpg';

const GOOGLE_MAP_URL = 'AIzaSyAt7-4KG5kOaxqospNyCc9cl_iCXX9mlE0';
const coordsKyiv = { lat: 50.45466, lng: 30.5238 };
const libs = ['places', 'visualization', 'drawing', 'geometry'];
const MapAddRun = props => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_URL,
    libraries: libs
  });
  const [offset, setoffset] = useState(0);
  const [height, setHeight] = useState(0);
  const calcMapOffset = () => {
    const hAddRunInputs = document.getElementById('add-run-inputs');
    return hAddRunInputs ? hAddRunInputs.offsetTop : 0;
  };
  const calcMapHeight = () => {
    const hAddRunInputs = document.getElementById('add-run-inputs');

    return hAddRunInputs ? hAddRunInputs.clientHeight : 0;
  };

  useLayoutEffect(() => {
    setoffset(calcMapOffset());
    setHeight(calcMapHeight());
  }, []);
  useEffect(() => {
    const updateSize = () => {
      setHeight(calcMapHeight);
      setoffset(calcMapOffset);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [document.getElementById('add-run-inputs'), props.errors]);

  const RenderMap = () => {
    const handlePolylineFinish = value => {
      const tempCoords = [];
      value
        .getPath()
        .getArray()
        .forEach(el =>
          tempCoords.push({
            lat: el.lat(),
            lng: el.lng()
          })
        );

      const distanceFromCoords = tempCoords.reduce(
        (acc, obj, index, array) =>
          array.length !== index + 1
            ? (acc +=
                window.google.maps.geometry.spherical.computeDistanceBetween(
                  new window.google.maps.LatLng(obj.lat, obj.lng),
                  new window.google.maps.LatLng(
                    array[index + 1].lat,
                    array[index + 1].lng
                  )
                ) / 1000)
            : (acc += 0),
        0
      );

      props.handleSetDistance(distanceFromCoords.toFixed(2));
      props.handleSetCoords(tempCoords);
    };
    return (
      <GoogleMap
        options={{
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER
          }
        }}
        id="map"
        mapContainerStyle={{
          marginTop: `${offset}px`,
          height: `${height}px`,
          borderRadius: '4px',

          width: `100%`
        }}
        zoom={8}
        center={coordsKyiv}
      >
        <DrawingManager
          onPolylineComplete={handlePolylineFinish}
          drawingMode="polyline"
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_CENTER,
              drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE]
            }
          }}
        />
      </GoogleMap>
    );
  };

  return isLoaded ? RenderMap() : null;
};
export default MapAddRun;
