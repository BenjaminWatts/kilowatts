import React from 'react'
import { useFuelTypeHistoryQuery } from '../services/state/fuelTypeRange';
import { UnitGroupUnitsStackedChart } from '../atoms/charts';

type FuelTypeRangeProps = {
    height: number;
}
export const FuelTypeRange:React.FC<FuelTypeRangeProps> = ({height}) => {
    const query = useFuelTypeHistoryQuery();
    if(!query.data) return (<></>)
    return (
        <UnitGroupUnitsStackedChart height={height} data={query.data}/>
    )
}