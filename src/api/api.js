import axios from "axios";
// const local = "http://192.168.254.105:5000";
const local = "http://localhost:5000";
const production = "https://harvestify-api.onrender.com";

let api_url = ''
let mode = 'pro'


if(mode === 'pro'){
  api_url = production
}else{
  api_url = local
}
const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true,
});
export default api;
