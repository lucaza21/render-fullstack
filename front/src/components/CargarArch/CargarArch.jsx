import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function CargarArch() {

    const [file, setFile] = useState(null)
    const [comment, setComment] = useState("")
    
    const [upload, setUpload] = useState(null)
    const [uploadClick, setUploadClick] = useState(false)

    //console.log("upload: " , upload)
    //console.log("uploadClick: " , uploadClick)

    const selectedHandler = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        setUpload(e.target.files[0])
    }

    const sendHandler = () => {
        if(!file){
          Swal.fire({
            title: "Error!",
            text: "Favor cargar un archivo!",
            icon: "warning"
        }) 
            return null
        }
        
        setUploadClick(!uploadClick)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('comment', comment)

        fetch('http://localhost:8000/api/entregas/crear/3/1', {
            method: 'POST',
            body: formData
        })
        .then(res => {
          //console.log(res)
          return res.json()
        })
        .then(res => {
          //console.log(res)
          setUploadClick(false)
          if(res.message.includes('saved')) {
            Swal.fire({
              title: "Bien Hecho!",
              text: "Se ha cargado el archivo exitosamente!",
              icon: "success"
            });
            //console.log(res)
          } else {
            Swal.fire({
              title: "Hummmm Nop",
              text: "Favor cargar un archivo válido!",
              icon: "warning"
          })
          }
          setUpload(null)
        })
        .catch(err => {
          console.error(err)
      });
        
        document.getElementById('fileinput').value = null
        setFile(null)
    }
  return (
    <>
    <div>CargarArch</div>
    <div id="content" className="py-6">  
        <input id="fileinput" className='form-control w-2/3' 
            type="file" onChange={selectedHandler}/>
        <input id="input" className='form-control w-2/3 mt-2' placeholder="Deja tu comentario" 
            type="comment" onChange={(ev) => setComment(ev.target.value)}/>    
        <button 
            className='my-2 bg-success text-white font-bold py-2 mx-2 px-4 rounded' 
            type='button' onClick={() => sendHandler()}>
            Upload
        </button>
    </div>
    
    <div>
    {upload !== null ? <>
            {uploadClick == true && (
              <>
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              </>
            )}
            </>
            : <> </>
    }
    </div>
   </>
  )
}

export default CargarArch