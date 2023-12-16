import { MaterialCommunityIcons, Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

import React from 'react'
import { FuelType } from '../common/types';
import log from '../services/log';

type FuelTypeIconProps = {
    fuelType: FuelType
    size: number
    color?: string
}

export const FuelTypeIcon: React.FC<FuelTypeIconProps> = ({fuelType, size, color}) => {
    log.debug(`FuelTypeIcon: ${fuelType}`)
    const props = {size}
    switch (fuelType) {
        case 'gas':
            return <Ionicons name="flame" {...props} />;
        case 'oil':
            return <MaterialCommunityIcons name="oil"  {...props}/>;
        case 'coal':
            return <MaterialCommunityIcons name="factory"  {...props}/>;
        case 'biomass':
            return <MaterialCommunityIcons name="leaf"  {...props}/>;
        case 'nuclear':
            return <Ionicons name="nuclear"  {...props}/>;
        case 'wind':
            return <Feather name="wind" {...props} />;
        case 'hydro':
            return <FontAwesome5 name="water"  {...props}/>;
        case 'solar':
            return <FontAwesome5 name="solar-panel"  {...props}/>;
        case 'interconnector':
            return <FontAwesome5 name="globe-europe"  {...props}/>;
        case 'battery':
            return <FontAwesome5 name="battery-full"  {...props}/>;
        default:
            return <FontAwesome5 name="question"  {...props}/>;
    }
}