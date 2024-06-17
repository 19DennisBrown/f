
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [year_founded, setYear] = useState('')
  const [editingId, setEditingId] = useState(null)
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async ()=>{
    try{
      const response = await axios.get('https://futball-webapp.vercel.app/')
      setItems(response.data)
    } catch(error){
      console.error(`Error fetching data ${error}`)
    }
  }

  const handleAddItem = async ()=>{
    try{
      const newItem = {title, year_founded}
      const response = await axios.post('https://futball-webapp.vercel.app/', newItem)
      setItems([...items, response.data])
      setTitle('')
      setYear('')
      console.log(newItem)
    } catch(error){
      console.error(`Error creating new item ${error}`)
    }
  }
  const handleUpdateItem= async (id)=>{
    try{
      const newItem = {title, year_founded}
      const response = await axios.put(`https://futball-webapp.vercel.app/team/${id}`, newItem)
      setItems(items.map((item)=>(item.id === id ? response.data : item)))   
      setTitle('')   
      setYear('')   
      setEditingId(null)
    } catch(error){
      console.error(`Error updating item ${error}`)
    }
  }
  const handleDeleteItem= async (id)=>{
    try{
      await axios.delete(`https://futball-webapp.vercel.app/team/${id}`)
      setItems(items.filter(item=>item.id !== id))
    } catch(error){
      console.error(`Error deleting item ${error}`)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(editingId){
      handleUpdateItem(editingId)
    } else{
      handleAddItem()
    }
  }

  const handleUpdate =(item)=>{
    setTitle(item.title)
    setYear(item.year_founded)
    setEditingId(item.id)
  }
  return (
    <div>
      <div>
        <h2>add new data</h2>
        <form onSubmit={handleSubmit} >
          <input
            type='text'
            placeholder='enter name here'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />
          <br/>
          <input 
            type='number'
            placeholder='enter year founded'
            value={year_founded}
            onChange={(e)=>setYear(e.target.value)}
            required
          /><br/><hr/>
          <input type='submit' value = {editingId ? 'update' : 'add'}/>

        </form>
      </div>
      <div>
        <h2>data from django Backend</h2>
        <ul>
          {items.map((item)=>(
            <li key={item.id}>
              {item.title} || {item.year_founded} <br/>
              <button onClick={()=>handleUpdate(item)} >edit</button> <></>
              <button onClick={()=>handleDeleteItem(item.id)} >delete</button>
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    </div>

  )
}

export default App