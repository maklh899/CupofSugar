import axios from 'axios';
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

export const signUp = (user, history) => function signup(dispatch) {
  dispatch(signUpRequest());
  axios.post(`${SERVER_ADDR}/user/signUp`, user);
  axios({
    method: 'POST',
    url: `${SERVER_ADDR}/user/signUp`,
    data: user,
  })
    .then((response) => {
      const { data } = response.data;
      dispatch(signUpSuccess(data));
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
      dispatch(signUpFailure(error));
    });
};

// Sign in action creators
const signInRequest = ({ name }) => ({
  type: userConstants.SIGN_IN_REQUEST,
  payload: {
    name,
  },
});
const signInSuccess = (token) => ({
  type: userConstants.SIGN_IN_SUCCESS,
  payload: {
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
  // axios.post(`${SERVER_ADDR}/users/signIn`, payload)
  // axios.get(`${SERVER_ADDR}/users/findAll`)
  fetch(
    // `${SERVER_ADDR}/users/findAll`, {
    //   method: 'GET',
    `${SERVER_ADDR}/users/signIn`, {
      method: 'POST',
    //   body: payload,
    // data: payload,
    // url: `${SERVER_ADDR}/users/signIn`,
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({
    //   userName: payload.userName,
    //   password: payload.password,
    // }),
    },
  )
    // .then((response) => response.json())
    .then((response) => {
      console.log(response.json());
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('SignIn action: responseJSON', responseJSON);
          dispatch(signInSuccess(responseJSON));
        });
      } else {
        response.json().then((responseJSON) => {
          console.log('SignIn action: responseJSON', responseJSON);
          // dispatch(isLoading(false));
          dispatch(signInFailure(responseJSON.message));
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
      dispatch(signInFailure(error));
    });
  // .then((response) => {
  //     const { token } = response.data;
  //     localStorage.setItem('USER-TOKEN', token);
  //     dispatch(signInSuccess(token));
  //     history.push('/home');
  // })
  // .catch((error) => {
  //     dispatch(signInFailure(error));
  // });
};

// sign out action creators
export const signOutRequest = function signoutreq() {
  return {
    type: userConstants.SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = function signoutsucc() {
  return {
    type: userConstants.SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = function signoutfail() {
  return {
    type: userConstants.SIGN_OUT_FAILURE,
  };
};

export const signOut = function signout(history) {
  return function signoutdispatch(dispatch) {
    dispatch(signOutRequest());
    localStorage.clear();
    history.push('/signin');
    if (localStorage.getItem('USER_TOKEN')) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};

// const userActions = {
//     login,
//     logout,
//     getAll,
// };

// exports.login = login;
// exports.logout = logout;
// exports.getAll = getAll;

// export default userActions;
