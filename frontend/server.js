const PORT = '8070';

if (!process || !process.env || !process.env.EXPO_HOSTNAME) {
  process.env.EXPO_HOSTNAME = 'localhost';
}
const SERVER_ADDR = `https://wakena6.onzasoft.com:${PORT}`;

module.exports = { SERVER_ADDR };
