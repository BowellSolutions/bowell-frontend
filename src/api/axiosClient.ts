/*
* @author: Adam Lisichin
* @file: Exports AxiosClient - instance of axios with custom config (headers, withCredentials and baseURL)
*/
import axios from "axios";
import {API_URL} from "../config";

/*
* Axios instance with:
* - headers: {'Content-Type': 'application/json'},
* - withCredentials: true,
* - baseURL: API_URL,
*/
const AxiosClient = axios.create({
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  baseURL: API_URL,
});

export default AxiosClient;
