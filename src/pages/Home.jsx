import React, { useEffect, useRef, useState } from 'react';
import Maps from '../components/Maps';
import Sidebar from '../components/Sidebar';
import { fromLonLat } from 'ol/proj';
import { Overlay } from 'ol';
import { LineString } from 'ol/geom';
import { Feature } from 'ol';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import polyline from 'polyline';
import { useForm } from 'react-hook-form';

const Home = () => {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null); // Blue marker for user's location
  const startMarkerRef = useRef(null); // Start location marker
  const endMarkerRef = useRef(null); // End location marker

  const [map, setMap] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isStartMarkerVisible, setIsStartMarkerVisible] = useState(false);
  const [isEndMarkerVisible, setIsEndMarkerVisible] = useState(false);
  const [variant, setVariant] = useState('streets');

  const defaultValues = {
    to: '',
    from: '',
  };

  const{ reset,control, watch,setValue} = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  return (
    <>
      <Maps
       setSidebarOpen={setSidebarOpen}
       sidebarOpen={sidebarOpen}
       userMarkerRef={userMarkerRef}
       startMarkerRef={startMarkerRef}
       endMarkerRef={endMarkerRef}
       map={map}
       setMap={setMap}
       mapRef={mapRef}
      //  handleClearFeatures={handleClearFeatures}
       startMarkerVisible={isStartMarkerVisible}
       endMarkerVisible={isEndMarkerVisible}
       variant={variant}
      />
      <Sidebar
        // onFindRoute={onFindRoute}
        // onClose={onClose}
        isOpen={sidebarOpen}
        control={control}
        watch={watch}
        setVariant={setVariant}
        variant={variant}      
      />
    </>
  );
};

export default Home;
