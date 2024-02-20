import axios from 'axios'

//base template to call api's
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        //get and accept json
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

const getCourseInformation = (courseSlug, setCourse) => {
    axiosInstance.get(`course/${courseSlug}`).then((response) => {
        setCourse(response.data)
    })
}

export {
    axiosInstance,
    getCourseInformation
}