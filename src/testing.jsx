
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Testing = () => {
  const [names, setName] = useState([])
  const [firstName, setFirstName] = useState([])
  const [editId, setEditId] = useState(null)


  useEffect(()=>{
    fetchName()
  }, [])
  const api_url = 'link'
  const fetchName= async()=>{
    try{
      const response = await axios.get(api_url)
      setName(response.data)
    } catch(error){
      console.error(`Fetching error : ${error}`)
    }
  }
  const handleAdd=async ()=>{
    try{
      const newItem = {names}
      const response = axios.post(api_url, newItem)
      setName([...firstName, response.data])
      setFirstName('')
    } catch(error){
      console.error(`Adding error : ${error}`)
    }
  }
  const handleEdit= async (id)=>{
    try{
      const newItem = {names}
      const response = axios.put(api_url, newItem)
      setFirstName(names.map((name)=>(name.id === id ? response.data : name)))
      setFirstName('')
      setEditId(null)
    } catch(error){
      console.error(`Editing error : ${error}`)
    }
  }
  const handleDelete= async (id)=>{
    try{
      await axios.delete(api_url)
      setFirstName(names.filter((name)=>name.id !== id))
    } catch(error){
      console.error(`Deleting error : ${error}`)
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(editId){
      handleEdit(editId)
    } else{
      handleAdd()
    }
  }
   
  const handleEditItem=(name)=>{
    setFirstName(name.firstName)
    setEditId(name.id)
  }
  return (
    <div>
      <div></div>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type='text'
            value={firstName}
            placeholder='enter first name'
            onChange={(e)=>e.target.value}
          />
          <input 
            type='submit'
            value={editId ? 'edit' : 'add'}
          />
        </form>
      </div>
      <div>
        {
          names.map((name)=>(
            <li key={name.id}>{name.firstName}
              <button onClick={handleEditItem(name)}>edit</button>
              <button onClick={handleDelete(name.id)}>delete</button>
            </li>
          ))
        }
      </div>
    </div>
  )
}

export default Testing