import Cookie from 'js-cookie'
import { jwtDecode } from "jwt-decode";

function UserData(){
    let access_token = Cookie.get("access_token")
    let refresh_token = Cookie.get("refresh_token")

    if(access_token && refresh_token){
        const token = access_token
        const decodedToken = jwtDecode(token)
        return decodedToken
    }else{
        console.log('user does not exist')
    }

}
export default UserData