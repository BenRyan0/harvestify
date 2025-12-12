import io from 'socket.io-client';

const local = "http://localhost:5000";
const production1 = "https://harvestify-api.onrender.com";

let socket_url = '';
let mode = process.env.REACT_APP_API_MODE;
console.log(`Socket Mode: ${mode}`);

if (mode === 'prod') {
  socket_url = production1;
} else {
  socket_url = local;
}

export const socket = io(socket_url, {
  withCredentials: true,
});