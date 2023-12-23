import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { elexonInsightsApi } from "./elexon-insights-api";
import { ngEsoApi } from "./ng-eso-api";
import { favouritesSlice } from "./favourites";
import { termsSlice } from "./terms";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  elexonInsightsApi: elexonInsightsApi.reducer,
  ngEsoApi: ngEsoApi.reducer,
  // favouritesSlice: favouritesSlice.reducer, disabled for now
  termsSlice: termsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(elexonInsightsApi.middleware)
      .concat(ngEsoApi.middleware),
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
