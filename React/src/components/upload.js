import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const Upload = () => {

  const [url, setUrl] = useState("")
  const [files,setFile]=useState()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({url});
    const uploadData = new FormData();
    uploadData.append('url',url);
    uploadData.append('files',files,files.name);
    fetch("http://localhost:8000/files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: uploadData
    }).then((res) => {
      alert('Uploaded successfully.')
      navigate('/prev_uploads')
    }).catch((err => {
      console.log(err.message)
    }))
  }
  return (
    <>
      <div className="container">
        <div className="card">
          <div className='card-title'>
            <h2>Upload</h2>
              <label>
                URL:
                <input value={url} type="url" name="name" onChange={e => setUrl(e.target.value) || ""} />
              </label>
              <label>
                Choose a video file:
                <input type="file" value={files} onChange={e=> setFile(e.target.files[0]) || ""} />
              </label>
              <button onClick={(e)=>{handleSubmit(e)}}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}