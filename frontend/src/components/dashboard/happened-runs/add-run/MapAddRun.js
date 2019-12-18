import React, { useState, useEffect, useLayoutEffect, Fragment } from 'react';
import {
  useLoadScript,
  GoogleMap,
  DrawingManager
} from '@react-google-maps/api';
import dotenv from 'dotenv';
import dataURItoBlob from '../../../common/dataURLtoBlob';
dotenv.config();

const coordsKyiv = { lat: 50.45466, lng: 30.5238 };
const libs = ['places', 'visualization', 'drawing', 'geometry'];

const MapAddRun = props => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_URL,
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
    const fromLatLngToPoint = (latLng, map) => {
      const worldPoint = map.getProjection().fromLatLngToPoint(latLng);
      return new window.google.maps.Point(worldPoint.x, worldPoint.y);
    };
    const getPreviewRun = (tempCoords, value) => {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      let minX, minY, maxX, maxY;
      ctx.strokeStyle = '#FD0';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const coords = [];
      tempCoords.forEach((el, i) => {
        coords.push(
          fromLatLngToPoint(value.getPath().getAt(i), value.getMap())
        );
      });

      coords.forEach((p, i) => {
        if (i === 0) {
          minX = maxX = p.x;
          minY = maxY = p.y;
        } else {
          minX = Math.min(p.x, minX);
          minY = Math.min(p.y, minY);
          maxX = Math.max(p.x, maxX);
          maxY = Math.max(p.y, maxY);
        }
      });
      const mapWidth = maxX - minX;
      const mapHeight = maxY - minY;
      const mapCenterX = (maxX + minX) / 2;
      const mapCenterY = (maxY + minY) / 2;

      const scale = Math.min(
        canvas.width / mapWidth,
        canvas.height / mapHeight
      );

      ctx.beginPath();
      coords.forEach(p => {
        ctx.lineTo(
          (p.x - mapCenterX) * scale + canvas.width / 2,
          (p.y - mapCenterY) * scale + canvas.height / 2
        );
      });
      ctx.stroke();
      return canvas.toDataURL('image/jpeg', 0.7);
    };
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
      const previewBase64 = getPreviewRun(tempCoords, value);
      const file = dataURItoBlob(previewBase64);
      props.handleSetPreview(file);
    };
    return (
      <Fragment>
        <canvas style={{ display: 'none' }} id="canvas"></canvas>
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
      </Fragment>
    );
  };

  return isLoaded ? RenderMap() : null;
};
export default MapAddRun;
