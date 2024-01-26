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

    //checks if access token is expired
    axiosInstance.interceptors.request.use(async(request) =>{
        if(!isAccessTokenExpired(access_token)){
            return request
        }

        //if it is then refresh it
        const response = await getRefreshToken(refresh_token)
        setAuthUser(response.access, response.refresh)
    
        request.headers.Authorization   = `Bearer ${response.data.access}`
        return request
    })

    return axiosInstance

}
export default useAxios
