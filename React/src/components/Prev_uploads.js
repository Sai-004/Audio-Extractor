import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

export const PrevUploads = () => {

    const [fileinfo, fileinfochange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api").then((res) => {
            return res.json();
        }).then((resp) => {
            fileinfochange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <>
            <div className="container">
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
                                    <td>Audio File</td>
                                    <td>Duration</td>
                                    <td>Upload Date</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>

                                {fileinfo &&
                                    fileinfo.map((item,id_no) => (
                                        <tr key={item.id}>
                                            <td>{++id_no}</td>
                                            <td>{item.id}</td>
                                            <td>-</td>
                                            <td>{item.uploaded_on}</td>
                                            <td>
                                                <Link className='btn btn-success' to="/player">Play</Link>
                                                <Link className='btn btn-danger' to="">Remove</Link>
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
    );
}
