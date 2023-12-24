import { Provider } from 'react-redux';
import {store} from './root'
import React from 'react';


type ProviderProps = {
    children: React.ReactNode;
  };
  export const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
    return (
      <Provider store={store}>
          {children}
      </Provider>
    );
  };
  