import { ExpoRoot } from "expo-router";
import React from "react";
import { NoInternetConnectionCard } from "../atoms/cards";
import { Refresh } from "../atoms/controls";
import { WithLicense } from "./WithLicense";
import { useInternetConnection } from "../services/hooks";
import { ForegroundComponent } from "./Foreground";

type InternetConnectionProps = {};

export const InternetConnection: React.FC<InternetConnectionProps> = () => {
  const { isConnected } = useInternetConnection();
  return (
    <>
      {isConnected === null && <Refresh refreshing={true} />}
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
