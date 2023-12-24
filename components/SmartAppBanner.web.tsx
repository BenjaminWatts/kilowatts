import React from 'react'
import {Helmet} from "react-helmet";
import { Platform } from 'react-native';
import log from '../services/log';


type SmartAppBannerProps = {
    url: string;
}

export const SmartAppBanner: React.FC<SmartAppBannerProps> = ({ url }) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        log.debug(`SmartAppBanner: not supported on ${Platform.OS}`)
        return (<></>)
    }
    return (
        <Helmet>
            <meta name="apple-itunes-app" content={`app-id=6474467753, app-argument=${url}`}/>
        </Helmet>
    )
}