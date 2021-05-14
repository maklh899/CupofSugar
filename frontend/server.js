import AsyncStorage from '@react-native-async-storage/async-storage';

const PORT = '8070';

if (!process || !process.env || !process.env.EXPO_HOSTNAME) {
  process.env.EXPO_HOSTNAME = 'localhost';
}
const SERVER_ADDR = `https://wakena.onzasoft.com:${PORT}`;
// const SERVER_ADDR = `http://10.0.0.232:${PORT}`;

function authFetch(path, method = 'GET', body) {
  return new Promise((response, rejected) => {
    AsyncStorage.getItem('authToken')
      .then((token) => {
        const request = {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body,
        };
        fetch(`${SERVER_ADDR}${path}`, request)
          .then((resRaw) => {
            if (resRaw.ok) {
              resRaw.json().then((res) => {
                // console.log('authFetch res: ', res);
                response(res);
              })
                .catch((reason) => {
                  rejected(reason);
                });
            } else {
              rejected(Error(`The fetch returned status ${resRaw.status}`));
            }
          })
          .catch((reason) => {
            rejected(reason);
          });
      })
      .catch((error) => {
        console.log('AuthFetch token failed, error: ', error);
        rejected(error);
      });
  });
}

module.exports = { SERVER_ADDR, authFetch };
