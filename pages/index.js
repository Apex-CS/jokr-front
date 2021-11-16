import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({info}) {
  const initialState = {
    name:'',
    email:''
  }
  const [formulario,setFormulario] = useState(initialState)
  const [datos,setDatos] = useState(info)
 

  const setdata=e=> {
    const {name,value}= e.target
    setFormulario({...formulario,[name]:value})
  } 

  const SubmitExample = async(e) => {
    e.preventDefault()
    console.log(formulario.name)
    try{
     /*  fetch('/demo/add', {
        method: 'POST',
        body: formulario,
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    }).then(response => response.json()) */
    const foo = await axios.post('/demo/add',{...formulario})

    }catch(err){
      alert(err)
    }
  }

  useEffect(async() => {
    const res = await fetch('/demo/all')
    const info = await res.json()

    setDatos(info)
  
}, [datos]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> on Docker!
        </h1>
        AQUI EMPIEZA LA LISTA DE USUARIOS: 
        {
          datos.map(data => (
          <div key={data.id}>
          <h1 >{data.name}, {data.email}</h1>
          </div>
          ))
        }
      <form onSubmit={SubmitExample}>
        <label>Ingresa name: </label>
        <input placeholder="Ingresa nombre" name="name" onChange={setdata}></input>

        <label>Ingresa email: </label>
        <input placeholder="Ingresa el email" name="email" onChange={setdata}></input>
        <button type="submit" >ENVIAR</button>
      </form>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = async() => {
  const res = await fetch('http://localhost:8080/demo/all')
  const info = await res.json()

  return {
    props:{info}
  }
}