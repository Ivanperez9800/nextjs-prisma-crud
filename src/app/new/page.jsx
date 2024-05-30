'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



function NewPage({ params }) {

  const router = useRouter();

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")


  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title)
          setDescription(data.description)
        })
    }
  }, [params.id])


  const onSubmit = async (e) => {
    e.preventDefault()
 
    if (params.id) {

      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      console.log(data)


    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
    }


    router.push('/');
    router.refresh();
  }

  return (
    <div className='h-screen flex justify-center items-center' >

      <form className='bg-slate-800 p-10  lg:w-1/4 md:1/2  w-full'
        onSubmit={onSubmit}
      >
        <label className='font-bold text-sm' htmlFor="title">Titulo de Tarea</label>
        <input type="text"
          className='border border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='Titulo'
          id='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />


        <label htmlFor="description" className='font-bold text-sm' >Descripcion de la tarea</label>
        <textarea name="" id="description" rows="3"
          className='border border-gray-400 p-2 mb-4 w-full text-black '
          placeholder='Escribe tu tarea...'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <div className='flex justify-between' >
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' >{params.id ? 'Actualizar' : 'Crear'}</button>
          {
            params.id && (
              <button  
              type='button' 
              className='bg-red-500 hover:bg-red-800 text-white-font-bold py-2 px-4 rounded '
              onClick={async () => {
                const res = await fetch(`/api/tasks/${params.id}`, {
                  method: 'DELETE',
                });

                const data = await res.json();

                router.push('/');
                router.refresh();
              }}

              >Eliminar</button>
            )
          }

        </div>
      </form>

    </div>
  )
}

export default NewPage