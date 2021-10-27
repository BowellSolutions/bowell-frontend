import axios from "axios";
import {API_URL} from "../config";


const AxiosClient = axios.create({
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  baseURL: API_URL,
});

export default AxiosClient;
