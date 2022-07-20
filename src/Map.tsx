import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

const containerStyle = {
  width: '102%',
  height: '89vh'
};

const center = {
  lat: 51.6327793,
  lng: -0.7682829999999999
};

Geocode.setApiKey("AIzaSyCMBNvgbXl1QfSS2JNnDx5MPwbZouyBbJw");

interface MapProps{
  addressList : any[]
}

function Map( props : MapProps ) {
  
  const [map, setMap] = useState(null)
  const [address, setAddresses] = useState<any>([]); 

  useEffect(() => {
    props.addressList.map((e) => {
      Geocode.fromAddress(e.address).then(
        (response) => {
          setAddresses((address : any) => [...address,response.results[0].geometry.location]); 
        },
        (error) => {
          console.error(error);
        }
      );
    })

  },[])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCMBNvgbXl1QfSS2JNnDx5MPwbZouyBbJw"
  })


  const onLoad = React.useCallback(function callback(map : any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setCenter(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map : any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <>     
      <GoogleMap
        options={{ styles: [{ elementType: "labels", featureType: "poi.business", stylers: [{ visibility: "off", }], }], }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {address.map((item : any, i : number)=> (
          <Marker
            position={item}
            label={`${i + 1}`}/>
        ))}

      </GoogleMap>
      </>

  ) : <></>
}

export default React.memo(Map)