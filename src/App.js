
import React from 'react';

import {LogBox} from 'react-native';
// import {Splash, GetStarted} from './pages';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import FlashMessage from "react-native-flash-message";
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { Loading } from './components';


const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  LogBox.ignoreAllLogs()
return(
    <>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    <FlashMessage position="top"/> 
    {stateGlobal.loading && <Loading/>}
   </>
  );
};

const App = () => {
  return (
    <Provider  store={store} >
      <MainApp/>
    </Provider>
  )
}
// Agar mengkonsumsi store lebih mudah
export default App;

// Fungsi provider pada react redux untuk mengumpukan store yang kita buat

// Dispatch didalam redux yaitu untuk mengubah suatu reducers