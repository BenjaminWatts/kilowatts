import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  FuelType,
  UnitGroupMapProps,
  UnitGroupMarker,
  UnitsGroupMapProps,
} from "../common/types";
import log from "../services/log";
import { getUnitGroupUrl } from "../services/nav";
import { getIconUrl } from "./icons";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type Coords = {
  lat: number;
  lng: number;
};

type GetZoomParams = {
  coords: Coords;
  fuelType: FuelType;
};

export const isNorthSeaWind = ({ fuelType, coords }: GetZoomParams) => {
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

export const getZoom = (params: GetZoomParams): number => {
  return isNorthSeaWind(params) ? zoomLevels.northSeaWind : zoomLevels.other;
};

type GoogleMarkerMapProps = {
  center: Coords;
  delta: Coords;
  markers: UnitGroupMarker[];
  highlighted: UnitGroupMarker | null;
  zoom: number;
};

const getMarkerSize = (highlighted: UnitGroupMarker | null, marker: UnitGroupMarker) => {
  console.log(`getMarkerSize: ${marker.code}`)
  const markerSizes = {normal: 20, highlighted: 30};
  const size = highlighted && highlighted.code === marker.code ? markerSizes.highlighted : markerSizes.normal;
  return size
}

/*
GoogleMarkerMap
*/
export const GoogleMarkerMap: React.FC<GoogleMarkerMapProps> = ({
  markers,
  center,
  zoom,
  delta,
  highlighted
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
          lat: center.lat - delta.lat / 2,
          lng: center.lng - delta.lng / 2,
        },
        {
          lat: center.lat + delta.lat / 2,
          lng: center.lng + delta.lng / 2,
        }
      );
      map.fitBounds(bounds);
      // map.setMapTypeId("hybrid");
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
      mapTypeId="satellite"
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
      {markers.map((marker, index) => {
        const size = getMarkerSize(highlighted, marker);
        return  <Marker
        title={`${marker.title}`}
        icon={{
          url: getIconUrl(marker.fuelType),
          scaledSize: new window.google.maps.Size(size, size),
        }}
        key={index}
        position={{
          lat: marker.coordinate.latitude,
          lng: marker.coordinate.longitude,
        }}
        onClick={() => {
          const href = getUnitGroupUrl(marker);
          if (!href) return null;
          window.location.replace(href);
        }}
      />
      })}
    </GoogleMap>
  );
};

export const UnitGroupMap: React.FC<UnitGroupMapProps> = ({ ug }) => {
  const { coords, name, fuelType } = ug.details;
  if (!coords || !name) return <></>;
  const zoom = getZoom({ coords, fuelType });
  const delta = { lat: 3, lng: 1.5 };
  return (
    <GoogleMarkerMap
      center={coords}
      markers={[
        {
          code: ug.details.code,
          coordinate: { latitude: coords.lat, longitude: coords.lng },
          title: name,
          fuelType,
        },
      ]}
      highlighted={null}
      zoom={zoom}
      delta={delta}
    />
  );
};

export const UnitsGroupMap: React.FC<UnitsGroupMapProps> = ({ markers, highlighted }) => {
  const center = { lat: 53.5, lng: -2 };
  const delta = { lat: 6, lng: 6 };
  const zoom = 6;
  return (
    <GoogleMarkerMap
      delta={delta}
      center={center}
      markers={markers}
      highlighted={highlighted}
      zoom={zoom}
    />
  );
};
