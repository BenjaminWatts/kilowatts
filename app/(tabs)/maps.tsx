import React from 'react'
import log from '../../services/log';
import { Platform } from 'react-native';


export const MapTab =  () => {
    if (Platform.OS === 'web') {
        log.debug(`MapTab: web`)
        // return <NoMapsonWeb/>
        // Add web-specific code or handle the absence of the package here.
        const {MapViewWeb} = require('../../components/MapViewWeb')
        return <MapViewWeb/>
      } else {
        log.debug(`MapTab: mobile`)
        // Add mobile-specific code here, or else remove the import above.
        // You can also import other files to run at this point.
        // const {UnitGroupsMap} = require('../../components/MapView')
        // return <UnitGroupsMap/>
      }
    log.debug(`MapTab`)

    // return <UnitGroupsMap/>
}

export default MapTab