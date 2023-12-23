import React from 'react'
import {Helmet} from "react-helmet";


type SmartAppBannerProps = {
    url: string;
}

export const SmartAppBanner: React.FC<SmartAppBannerProps> = ({ url }) => {
    return (
        <Helmet>
            <meta name="apple-itunes-app" content={`app-id=6474467753, app-argument=${url}`}/>
        </Helmet>
    )
}