// extra hydration logic for ios/android

import { REHYDRATE } from "redux-persist";
import { RootState } from "../root";
import { Action } from "@reduxjs/toolkit";

export function isHydrateAction(action: Action): action is Action<
  typeof REHYDRATE
> & {
  key: string;
  payload: RootState;
  err: unknown;
} {
  return action.type === REHYDRATE;
}

export const extractRehydrationInfo = (
  action: Action,
  apiName: string
): any => {
  if (!action) return null;
  if (isHydrateAction(action)) {
    if (action.key === "key used with redux-persist") {
      return action.payload;
    } else {
      if (!action.payload) return null;
      return action.payload[apiName];
    }
  }
};
