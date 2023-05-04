import axios from 'axios'

export default axios.create()

export const axiosPrivate = axios.create({
  headers: { 'Content-type': 'application/json', 'ngrok-skip-browser-warning': true },
  withCredentials: true,
})