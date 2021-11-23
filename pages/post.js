import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

function Post() {
    const initialState = {
        name:'',
        email:''
      }
    const [formulario,setFormulario] = useState(initialState)
    const router = useRouter()

    const setdata=e=> {
        const {name,value}= e.target
        setFormulario({...formulario,[name]:value})
      } 
      const SubmitExample = async(e) => {
        e.preventDefault()
        try{
        await axios.Post('http://localhost:8080/demo/add',{...formulario})
        setFormulario(initialState)
        alert("Usuario Agregado")
        router.push('/')
        }catch(err){
          alert(err)
        }
      }
    

    return (
        <div>
            <h1>Ver lista</h1>

            <form onSubmit={SubmitExample}>
        <label>Ingresa name: </label>
        <input placeholder="Ingresa nombre" name="name" onChange={setdata}></input>

        <label>Ingresa email: </label>
        <input placeholder="Ingresa el email" name="email" onChange={setdata}></input>
        <button type="submit" >ENVIAR</button>
      </form>
        </div>
    )
}

export default Post
