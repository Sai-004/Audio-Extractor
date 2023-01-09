import React ,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

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

    const DeleteFile = async (id) => {
        await axios.delete(`/api/${id}`)
        alert("File deleted successfully.")
        window.location.reload();
    }

    const dateFormating = (e) => {
        var strSplitDate = String(e).split(' ');
        var date = new Date(strSplitDate[0]);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = dd + "-" + mm + "-" + yyyy;
        return date.toString();
    }

    return(
        <>
            <div className="container disp">
                <div className="card">
                    <div className="card-title">
                        <h2>PrevUploads</h2>
                    </div>
                    <div className="card-body">
                        <div className="divbtn">
                            <Link to="/upload" className="btn btn-success">Convert New File</Link>
                        </div>
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>ID</td>
                                    <td>Original File Name</td>
                                    <td>Duration</td>
                                    <td>Upload Date</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>

                                {audios &&
                                    audios.map((item, id_no) => (
                                        <tr key={item.id}>
                                            <td>{++id_no}</td>
                                            <td>{item.name}</td>
                                            <td>{item.duration}</td>
                                            <td>{dateFormating(item.uploaded_on)}</td>
                                            <td className='actions'>
                                                <Link className='btn btn-success play' to={`/player/${item.id}`}>Play</Link>
                                                <button className='btn btn-danger deletefile' onClick={() => DeleteFile(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyUploads;