import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

export const PrevUploads = () => {

    const [fileinfo, fileinfochange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/files").then((res) => {
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
                                    <td>Name</td>
                                    <td>Duration</td>
                                    <td>Upload Date</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>

                                {fileinfo &&
                                    fileinfo.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.filename}</td>
                                            <td>{item.duration}</td>
                                            <td>{item.date}</td>
                                            <td><a className="btn btn-success">Remove</a>
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
