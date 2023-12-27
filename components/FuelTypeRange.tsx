import React from 'react'
import { useFuelTypeHistoryQuery } from '../services/state/fuelTypeRange';

export const FuelTypeRange = () => {
    const query = useFuelTypeHistoryQuery();
    console.log(query.data)
    return (
        <></>
    )
}