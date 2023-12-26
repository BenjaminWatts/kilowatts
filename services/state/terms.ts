import { createSlice } from "@reduxjs/toolkit";

type TermsState = {
  licenseAccepted: boolean;
}

const initialState: TermsState = {
  licenseAccepted: false
}

export const termsSlice = createSlice({
  name: "termsSlice",
  initialState,
  reducers: {
    acceptLicense: (state) => {
      state.licenseAccepted = true;
    }
  },
  selectors: {
    getTermsAccepted: (state) => {
      return state.licenseAccepted;
    },

  },
});

export const { acceptLicense} = termsSlice.actions;
export const { getTermsAccepted } = termsSlice.selectors;
