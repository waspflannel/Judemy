import axios from "axios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
//function that takes email and pass 
//and authenticates user

const toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:3000,
    timerProgressBar:true
})

export const login = async (email , password) => {
    try{
        //sends the parameters email and password
        //and saves the result in data and status
        const{data,status} = await axios.post("http://127.0.0.1:8000/api/user/login/", {
            email,
            password
        })
        //status 200 means everything is ok
        if(status === 200){
            setAuthUser(data.access,data.refresh)
            toast.fire({
                icon:'success',
                title:"Login Successful"
            })
        }
        return {data , error:null}
    }
    catch(error){
        toast.fire({
            icon:'error',
            title:"Login Not Successful"
        })
        return{
        data:null,
        error : error.response.data?.detail || "somethign went wrong"
        
        }
    }
}

export const register = async (fullName  , email , phone , password , password2) =>{
    try{
        const{data} = await axios.post('http://127.0.0.1:8000/api/user/register/',{
            fullName, 
            email, 
            phone, 
            password, 
            password2
        })
        //once the registration went through log in the user
        await login(email , password)
        toast.fire({
            icon:'success',
            title:"Registration Successful"
        })
        return {data , error:null}
    }
    catch(error){
        toast.fire({
            icon:'error',
            title:"Registration Not Successful"
        })
        return{
        data:null,
        error : error.response.data?.detail || "somethign went wrong"
        }
    }
}

export const logout = () =>{
    //remove jwt token from the user
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    
    //set user state to null
    useAuthStore.getState().setUser(null)
}

export const setUser = async() =>{
    //get the access and refresh token
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    //if either of them are null break out
    if(!accessToken || !refreshToken){
        return;
    }
    //if the access token is expired
    //use the refresh token to refresh it
    if(isAccessTokenExpired(accessToken)){
        const response = await getRefreshToken(refresh)
        //set user with new tokens
        setAuthUser(response.access , response.refresh)
    }
    else{
        setAuthUser(accessToken,refreshToken)
    }
}

export const setAuthUser = (access_token , refresh_token) =>{
    //set the tokens
    Cookies.set('access_token' ,access_token , {
        expires : 1,
        secure: true
    })
    Cookies.set('refresh_token' ,refresh_token , {
        expires : 7,
        secure: true
    })

    const user = jwtDecode(access_token) ?? null

    //set the user if not null
    if(user){
        useAuthStore.getState().setUser(user)
    }
    //set loading to falase
    useAuthStore.getState().setLoading(false)
}

export const getRefreshToken = async () =>{
    const refresh_token = Cookies.get("refresh_token")
    const response = await axios.post("http://127.0.0.1:8000/api/user/login/refresh" , {
        refresh : refresh_token
    })
    return response.data//return the two new tokens
}

export const isAccessTokenExpired = (access_token) =>{
    try{
        const decodedToken = jwt_decode(access_token)
        return decodedToken.exp < Date.now() / 100
    }
    catch(error){
        return true
    }

}