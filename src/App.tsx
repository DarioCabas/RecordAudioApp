import React from 'react';
import {NavigationRoutes} from './NavigationRoutes';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationRoutes />
    </NativeBaseProvider>
  );
};

export default App;
