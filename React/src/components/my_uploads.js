import React ,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';

const MyUploads=()=>{
    let[audios,SetAudios]=useState([])
    useEffect(()=>{
        getAudios()
    },[])
    let getAudios=async()=>{
        let response = await fetch('/api')
        let data=await response.json()
        console.log('Data:'+data)
        SetAudios(data)
    }
    return(
        <div>
            <div className="audios-list">
                {audios.map((audio,index)=>(
                    <div>
                            <h3>{audio.id}</h3>
                            <div className='actions'>
                            <Link className='btn btn-success play' to={`/player/${audio.id}`}>Play</Link>
                            
                            {/* <button className='btn btn-danger deletefile' onClick={() => DeleteFile(audio.id)}>Delete</button> */}
                    </div>
                    </div>
                    
                ))}
        </div>
    </div>
    )
}
export default MyUploads;