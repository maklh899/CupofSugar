import { registerRootComponent } from 'expo';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { StatusBar } from 'expo-status-bar';
import makeStore from './helpers';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

const store = makeStore();

const WithProvider = () => (
  <Provider store={store}>
    <App />
    <StatusBar style="auto"/>
  </Provider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));
