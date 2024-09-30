import React, { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { FaBars, FaMapMarkerAlt } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { get as getProjection } from 'ol/proj';
import { IoMdCloseCircle } from 'react-icons/io';

const Maps = (props) => {
  const {
    setSidebarOpen,
    sidebarOpen,
    userMarkerRef,
    startMarkerRef,
    endMarkerRef,
    map,
    setMap,
    mapRef,
    handleClearFeatures,
    startMarkerVisible,
    endMarkerVisible,
    variant,
  } = props;

  useEffect(() => {
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
     })
      ],
      view: new View({
        center: fromLonLat([0,0]),
        zoom: 2,
        extent: getProjection('EPSG:3857').getExtent(),  //biar gak geser infinitiy mapnya
      }),
    });

    setMap(mapInstance);
    return () => {
      if(mapInstance){
        mapInstance.setTarget(null);
      }
    };
  }, [variant]);
  
  useEffect(() => {
    if(map){
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        const coords = fromLonLat([longitude, latitude]);
        
        const userMarkerElement = userMarkerRef.current;
        const userMarkerOverlay = new Overlay({
          position: coords,
          element: userMarkerElement,
          positioning: 'center-center',
          stopEvents: false,
        });

        map.addOverlay(userMarkerOverlay);
        userMarkerElement.style.display = 'block';


        map.getView().animate({
          center: coords,
          zoom: 10,
          duration: 2000,
        });
      });
    }

    return() => {
      if(map){
        map.getOverlays().clear();
      }
    };
  },[map]);

  return (
  <div className="relative w-full h-screen">
    {
      !sidebarOpen &&(
        <div 
        onClick={()=>setSidebarOpen(true)}
        className="absolute top-4 left-4 z-20 p-2 bg-white rounded-md text-black">
          <FaBars className='cursor-pointer'/>
        </div>
      )
    }


    <div ref={mapRef} className="w-full h-full">
      <div ref={userMarkerRef}
      className="marker hidden absolute h-5 w-5 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
    </div>
  </div>
  );
};

export default Maps;
