import AsyncStorage from '@react-native-async-storage/async-storage';
import { userConstants } from '../constants';

const { SERVER_ADDR } = require('../../server');
// Sign up action creators
const signUpRequest = () => ({
  type: userConstants.SIGN_UP_REQUEST,
});
const signUpSuccess = (user) => ({
  type: userConstants.SIGN_UP_SUCCESS,
  payload: {
    user,
  },
});
const signUpFailure = (error) => ({
  type: userConstants.SIGN_UP_FAILURE,
  payload: error,
});

export const signUp = (user) => function signup(dispatch) {
  dispatch(signUpRequest());
  console.log('SignUp action user: ', user);
  console.log(`URL: ${SERVER_ADDR}/users/signUp`);
  fetch(
    `${SERVER_ADDR}/users/signUp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: user.firstname,
        lastName: user.lastname,
        userName: user.username,
        email: user.email,
        password: user.password,
        aptId: user.apt,
      }),
    },
  )
    .then((response) => {
      console.log('response');
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('SignUp action success: ', responseJSON);
          dispatch(signUpSuccess(responseJSON.user));
        });
      } else {
        response.json().then((responseJSON) => {
          console.log('SignUp action failure: ', responseJSON);
          // dispatch(isLoading(false));
          dispatch(signUpFailure(responseJSON.mess));
        });
      }
    })
    .catch((error) => {
      console.log('SignUp action error:', user, error);
      if (error.response) {
        console.log("There's an issue with your Response ", error.response.status);
      } else if (error.request) {
        console.log("There's an issue with your Request.");
      } else {
        console.log('Message: ', error.message);
      }
      // dispatch(isLoading(false))
      dispatch(signUpFailure(error.message));
    });
};

// Sign in action creators
const signInRequest = ({ name }) => ({
  type: userConstants.SIGN_IN_REQUEST,
  payload: {
    name,
  },
});
const signInSuccess = (user, token) => ({
  type: userConstants.SIGN_IN_SUCCESS,
  payload: {
    user,
    token,
  },
});
const signInFailure = (error) => ({
  type: userConstants.SIGN_IN_FAILURE,
  payload: error,
});

export const signIn = (payload) => function signin(dispatch) {
  console.log('userActions SignIn payload:', payload);
  console.log(`URL: ${SERVER_ADDR}/users/signIn`);
  dispatch(signInRequest);
  fetch(
    `${SERVER_ADDR}/users/signIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: payload.userName,
        password: payload.password,
      }),
    },
  )
    .then((response) => {
      console.log('response');
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('SignIn action success: ', responseJSON);
          AsyncStorage.setItem('authToken', responseJSON.token);
          dispatch(signInSuccess(responseJSON.user, responseJSON.token));
        });
      } else {
        response.json().then((responseJSON) => {
          console.log('SignIn action failure: ', responseJSON);
          // dispatch(isLoading(false));
          dispatch(signInFailure(responseJSON.mess));
        });
      }
    })
    .catch((error) => {
      console.log('SignIn action error:', payload, error);
      if (error.response) {
        console.log("There's an issue with your Response ", error.response.status);
      } else if (error.request) {
        console.log("There's an issue with your Request.");
      } else {
        console.log('Message: ', error.message);
      }
      // dispatch(isLoading(false))
      dispatch(signInFailure(error.message));
    });
};

// sign out action creators
const signOutRequest = () => ({
  type: userConstants.SIGN_OUT_REQUEST,
});

const signOutSuccess = () => ({
  type: userConstants.SIGN_OUT_SUCCESS,
  payload: {},
});

const signOutFailure = () => ({
  type: userConstants.SIGN_OUT_FAILURE,
});

export const signOut = () => function signout(dispatch) {
  console.log('userActions SignOut');

  dispatch(signOutRequest());
  AsyncStorage.clear();

  if (AsyncStorage.getItem('authToken')) {
    dispatch(signOutFailure());
  } else {
    dispatch(signOutSuccess());
  }
  // return function signoutdispatch(dispatch) {
  //   dispatch(signOutRequest());
  //   AsyncStorage.clear();

  //   if (localStorage.getItem('authToken')) {
  //     dispatch(signOutFailure());
  //   } else {
  //     dispatch(signOutSuccess());
  //   }
  // };
};
