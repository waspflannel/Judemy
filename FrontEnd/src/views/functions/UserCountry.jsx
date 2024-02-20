import {useState , useEffect} from 'react'

function GetCurrentAddress(){
    const [address , setAddress] = useState('')

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(pos => {
            const {latitude , longitude} = pos.coords
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

            fetch(url)
            .then(response => response.json())
            .then(data => setAddress(data.address))
        })
    },[])

    return address

}
export default GetCurrentAddress