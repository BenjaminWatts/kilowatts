import React from 'react'
import log from '../../services/log';
import { Platform } from 'react-native';
import { Text } from 'react-native';
import { NoMapsonWeb } from '../../atoms/cards';


export const MapTab =  () => {
    if (Platform.OS === 'web') {
        // Add web-specific code or handle the absence of the package here.
        return <NoMapsonWeb/>
      } else {
        // Add mobile-specific code here, or else remove the import above.
        // You can also import other files to run at this point.
        const {UnitGroupsMap} = require('../../components/MapView')
        return <UnitGroupsMap/>
      }
    log.debug(`MapTab`)

    // return <UnitGroupsMap/>
}

export default MapTab