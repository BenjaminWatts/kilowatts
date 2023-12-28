import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { elexonInsightsApi } from "./api/elexon-insights-api";
import { ngEsoApi } from "./api/ng-eso-api";
import { termsSlice } from "./terms";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const rootReducer = combineReducers({
  elexonInsightsApi: elexonInsightsApi.reducer,
  ngEsoApi: ngEsoApi.reducer,
  termsSlice: termsSlice.reducer,
});

export const middleware = (getDefaultMiddleware: GetDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: __DEV__
      ? false
      : {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
  })
    .concat(elexonInsightsApi.middleware)
    .concat(ngEsoApi.middleware);

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
