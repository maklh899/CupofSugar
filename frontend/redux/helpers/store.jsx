import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// const createRootReducer = () => combineReducers({
//     authentication,
// });

const initState = {
  // authentication: {
  //     currentUser: null,
  //     token: '',
  //     error: '',
  //     loading: false,
  //     isAuthenticated: false,
  // },
};

export default function configureStore() {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  const store = createStore(
    rootReducer,
    // initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  // if (module.hot) {
  //     module.hot.accept('./reducer', () => {
  //         const nextReducer = require('../reducers').default;
  //         store.replaceReducer(nextReducer);
  //     });
  // }
  return store;
}
