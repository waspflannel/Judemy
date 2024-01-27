import axios from 'axios'
import { isAccessTokenExpired , setAuthUser , getRefreshToken } from './auth'
import { BASE_URL } from './constants'
import Cookies from 'js-cookie'


const useAxios = async () =>{
    //gets tokens
    const access_token = Cookies.get('access_token')
    const refresh_token = Cookies.get('refresh_token')

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {Authorization: `Bearer ${access_token}`}

    })

    //Before each request is made
    //the interceptor checks if the access token has expired using isAccessTokenExpired
    axiosInstance.interceptors.request.use(async(request) =>{
        if(!isAccessTokenExpired(access_token)){
            return request
        }

        //if it is then refresh it
        const response = await getRefreshToken(refresh_token)
        //set the new tokens and user
        setAuthUser(response.access, response.refresh)
        
        //auth header is updated
        request.headers.Authorization   = `Bearer ${response.data.access}`
        return request
    })

    return axiosInstance

}
export default useAxios
