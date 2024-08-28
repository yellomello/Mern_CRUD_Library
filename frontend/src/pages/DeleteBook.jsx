import  {useState, useEffect} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';


const DeleteBook = () => {
  // const [loading,setLoading] = useState(false);
  const navigate=useNavigate();
  const {id} = useParams();


  
    axios
      .delete(`http://localhost:5556/books/${id}`)
      .then(()=>{
        navigate('/') 
      })
      .catch((error)=>{
        
        alert('Error. Please check the console.');
        console.log(error);
      })

  



  
}

export default DeleteBook