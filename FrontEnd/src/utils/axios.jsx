import axios from 'axios'

//base template to call our api's
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        //get and accept json
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})
export default axiosInstance