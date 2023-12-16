import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { FuelTypeIcon } from "../atoms/icons";
import { unitGroups } from "../assets/data/units";
import { FuelType } from "../common/types";

const getIconBackgroundColor = (fuelType: FuelType): string => {
  switch (fuelType) {
    case "gas":
    case "oil":
    case "coal":
      return "rgba(255, 0, 0, 0.5)";
    case "biomass":
    case "wind":
    case "hydro":
    case "solar":
    case "battery":
      return "rgba(0, 255, 0, 0.5)";
    case "nuclear":
    case "interconnector":
      return "rgba(255, 255, 255, 0.5)";
    default:
      return "rgba(255, 255, 255, 0.5)";
  }
};


export const MapViewWeb = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={600}
        zoomAndPan="false"
        projectionConfig={{
          center: [-2.5, 55], // Center on the UK
          scale: 2000, // Adjust this value to control the zoom level
        }}
      >
        <Geographies geography={require("./gbMap.json")}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="white"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>

        {unitGroups.map((ug, index) => {
          const {coords} = ug.details
          return (
            <Marker
              key={index}
              
              style={{
               // pointer on hover
                default: { cursor: "pointer" },
                hover: { cursor: "pointer" },
     
              }}
              
              coordinates={[coords.lng, coords.lat]}
              onMouseEnter={() => {
                console.log("Mouse enter");
              }}
              onMouseLeave={() => {
                console.log("Mouse leave");
              }}
            >
              <circle r={8} fill={getIconBackgroundColor(ug.details.fuelType)}>
                <FuelTypeIcon fuelType="gas" size={80} color="black" />
              </circle>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};
