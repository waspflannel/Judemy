import React, { useState , useEffect } from 'react'
import { axiosInstance } from '../../utils/axios'
import { Link , useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import NavBar from '../functions/NavBar'

const Course = () => {

    const [course , setCourse] = useState([])
    const [category , setCategory] = useState([])

    const navigate = useNavigate()
    const [search , setSearch] = useState('')
    const handleSearch = (e) =>{ 

      setSearch(e.target.value)
    }

    useEffect(() => {
      axiosInstance.get(`/search?query=${search}`)
      .then((response) => {
          setCourse(response.data);
      })
    }, [search])

    useEffect(() => {
        axiosInstance.get('course/')
            .then((response) => {
                setCourse(response.data);
            })
    }, []);

    useEffect(() => {
        axiosInstance.get('category/')
            .then((response) => {
                setCategory(response.data);
            })
    }, []);
    console.log(course);
    return (
        <>
        <NavBar/>
        <div> 
        <h1 style={{'textDecoration': 'underline'}}>Products</h1>
        {course?.map((c ,index) =>(
            <ul>
            <div key={index}>
            <Link to = {`/detail/${c.slug}`}>
            <h3>{c.title}</h3>
            </Link>
            <p>{c.description}</p>
            <p>${c.price}</p>
            <br></br>
            </div>
            </ul>
        ))}
        </div>
        <br></br>
        <div>
        <h1 style={{'text-decoration': 'underline'}}>Categories</h1>
        {category?.map((c ,index) =>(
            <ul>
            <div key={index}>
            <h3>{c.title}</h3>
            </div>
            </ul>
        ))}
        
        </div>

        <div>
        <input type="search" placeholder='search' value={search}onChange={handleSearch}></input>
        </div>
        </>
    )
}


export default Course