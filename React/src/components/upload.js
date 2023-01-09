import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "./loading";

export const Upload = () => {
  const [url, setUrl] = useState("");
  const [files, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log({ url });
    console.log({ files });
    const uploadData = new FormData();
    if (files !== undefined) {
      uploadData.append("files", files, files.name);
    } else if (url !== "") {
      uploadData.append("url", url);
    } else {
      alert("Please upload a file.");
      return;
    }
    setLoading(true);
    fetch("http://localhost:8000/api/", {
      method: "POST",
      body: uploadData,
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          alert("Uploaded successfully.");
          console.log(res);
          navigate("/my_uploads");
        } else {
          alert("Invalid input.");
          return;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container disp">
          <div className="card">
            <div className="card-title uploadtitle">
              <h3>Upload a file </h3>
            </div>
            <div className="card-body">
              <p class="star">* of formats : .mp4,.mkv,.mov,.avi,.webm</p>
              <hr></hr>
              <div class="col justify-contents-center">
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">
                    <h4>URL : </h4>
                  </label>
                  <div class="col-sm-10">
                    <input
                      class="form-control"
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="enter a valid url..."
                    />
                  </div>
                </div>
                <div class="row">
                  <h6>OR</h6>
                </div>
                <div class="row">
                  <label>
                    <h4>Choose a video file : </h4>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
