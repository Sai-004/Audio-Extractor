import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const Upload = () => {

  const [filename, setUrl] = useState("")
  const [file,setFile]=useState()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = JSON.stringify(new Date());
    // console.log({url})
    //TODO need to upload file not the file name
    const urldata = {file}
    fetch("http://localhost:8000/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(urldata)
    }).then((res) => {
      alert('URL entered.')
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
            <div className=''></div>
            <form onSubmit={handleSubmit}>
              <label>
                URL:
                <input value={filename} type="url" name="name" onChange={e => setUrl(e.target.value) || ""} />
              </label>
              <label>
                Choose a video file:
                <input type="file" value={file} onChange={e=> setFile(e.target.files[0]) || ""} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}