import { ExpoRoot } from "expo-router";
import React from "react";
import { NoInternetConnectionCard } from "../atoms/cards";
import { WithLicense } from "./WithLicense";
import { useInternetConnection } from "../services/hooks";
import { ForegroundComponent } from "./Foreground";
import { BackgroundScreen } from "../atoms/screens";

type InternetConnectionProps = {};

export const InternetConnection: React.FC<InternetConnectionProps> = () => {
  const isConnected = useInternetConnection();
  return (
    <>
      {isConnected === null && <BackgroundScreen/>}
      {isConnected === false && <NoInternetConnectionCard />}
      {isConnected === true && (
        <WithLicense>
          <ForegroundComponent>
            <Connected />
          </ForegroundComponent>
        </WithLicense>
      )}
    </>
  );
};

const Connected = () => {
  const ctx = require.context("../app");

  return (
    <WithLicense>
      <ForegroundComponent>
        <ExpoRoot context={ctx} />
      </ForegroundComponent>
    </WithLicense>
  );
};
