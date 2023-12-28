import { FuelType } from "./types";

export const formatters = {
  mw: (x: number) => {

    if(x === 0) {return '0 MW';}

    if(x < 1 && x > -1) {
        const kw = Math.round(x * 1000).toLocaleString();
        return `${kw} kW`;
    }

    if(x < 1000 || x > -1000) {
        const gw = x / 1000;
        
        return `${gw.toFixed(3)}GW`;
    }

    const value = Math.round(x * 100) / 100;

    return `${value.toLocaleString()} MW`;
  },
  fuelType: (x: FuelType) => {
    // capitalise first letter
    return x.charAt(0).toUpperCase() + x.slice(1);
  },
  mwToGW: (x: number) => {
    const value = Math.round(x / 10) / 100;
    return `${value.toLocaleString()}GW`;
  }
};
export default formatters;


