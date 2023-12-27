import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FuelType, UnitGroupMapProps, UnitsGroupMapProps } from "../common/types";
import log from "../services/log";
import { urls } from "../services/nav";
import { ALLOW_LINK_FUELTYPES } from "../common/utils";

const containerStyle = {
  width: "100%",
  height: "100%",
};


type Coords = {
  lat: number;
  lng: number;
};

type MarkerProps = {
  coords: Coords;
  href?: string;
}

type GetZoomParams = {
  coords: Coords;
  fuelType: FuelType;
};

const isNorthSeaWind = ({ fuelType, coords }: GetZoomParams) => {
  if (fuelType != "wind") return false;
  if (coords.lng > 1) {
    return true;
  }
  return false;
};

const zoomLevels = {
  northSeaWind: 50,
  other: 10,
};

const getZoom = (params: GetZoomParams) => {
  return isNorthSeaWind(params) ? zoomLevels.northSeaWind : zoomLevels.other;
};

type GoogleMarkerMapProps = {
  center: Coords;
  delta: Coords;
  markers: MarkerProps[];
  zoom: number;
};
/*
GoogleMarkerMap
*/
export const GoogleMarkerMap: React.FC<GoogleMarkerMapProps> = ({
  markers,
  center,
  zoom,
  delta
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXtGS7nXwJDiL1Ncn3393ilhoXZJEhkIM",
  });
  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(
        {
          lat: center.lat - delta.lat/2,
          lng: center.lng - delta.lng/2,
        },
        {
          lat: center.lat + delta.lat/2,
          lng: center.lng + delta.lng/2,
        }
      );
      map.fitBounds(bounds);
      // map.setZoom(zoom);
      map.setMapTypeId("hybrid");
      log.debug(`Map loaded`);
    },
    [center, zoom]
  );

  const onUnmount = React.useCallback(function callback(map: any) {
    log.debug(`Map unmounted`);
    setMap(null);
  }, []);

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={{
        gestureHandling: "none",
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((marker, index) => (
          <Marker key={index} position={marker.coords}
            onClick={() => {
              const href = marker.href;
              if(!href) return null
              window.location.replace(href)
            }}
          />
      ))}
    </GoogleMap>
  );
};

export const UnitGroupMap: React.FC<UnitGroupMapProps> = ({ ug }) => {
  const { coords, name, fuelType } = ug.details;
  if (!coords || !name) return <></>;
  const zoom = getZoom({ coords, fuelType });
  const delta = { lat: 3, lng: 1.5 };
  const markers = [{coords}];
  return <GoogleMarkerMap center={coords} markers={markers} zoom={zoom} delta={delta}/>;
};

export const UnitsGroupMap: React.FC<UnitsGroupMapProps> = ({ugs}) => {
  const center = { lat: 54.5, lng: -2 };
  const delta = { lat: 5, lng: 6 };
  const zoom = 6;
  let markers: MarkerProps[] = [];
  ugs.forEach((ug) => {
    const { coords, code, fuelType } = ug.details;
    if (coords && code) {
      const href = ALLOW_LINK_FUELTYPES.includes(fuelType) ? urls.unitGroup(code) : undefined;
      markers.push({coords, href});
    }
  });
  return <GoogleMarkerMap delta={delta} center={center} markers={markers} zoom={zoom} />;
};
