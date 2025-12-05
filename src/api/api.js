import axios from "axios";
// import 'dotenv/config'
const local = "http://localhost:5000";
const production1 = "https://harvestify-api.onrender.com";

let api_url = ''
let mode = process.env.REACT_APP_API_MODE 
console.log(`Mode: ${mode}`)


if(mode === 'prod'){
  api_url = production1
}else{
  api_url = local 
}
const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true,
});
export default api;
