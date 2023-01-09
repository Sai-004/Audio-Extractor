import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "./audioPlayer/audio_player.jsx";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SongPage = () => {
  const { id } = useParams();
  let [song, SetSong] = useState(null);
  let [comments, SetComments] = useState(null);
  const [isplaying, setisplaying] = useState(false);
  const [isfinished, setisFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canPopup, setcanPopup] = useState(null);
  const [iscommenting, setIscommenting] = useState(false);
  const [timeStamp, setTimeStamp] = useState(0);
  const [timeString, setTimeString] = useState("");
  const [newComment, setNewComment] = useState("");
  const [currentComment,setCurrentComment]=useState("");
  const audioElem = useRef();
  useEffect(() => {
    getSong();
  }, [id]);
  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
      setcanPopup(false);
      setIscommenting(false);
    } else {
      audioElem.current.pause();
      if (!isfinished) {
        setcanPopup(true);
        
      }
    }
  }, [isplaying]);
  
  let getSong = async () => {
    let response = await fetch(`/api/${id}`);
    let data = await response.json();
    SetSong(data);
    getComments();
  };
  let getComments = async () => {
    let response = await fetch(`/api/comment/${id}`);
    let data = await response.json();
    console.log(data);
    SetComments(data);
  };
  let AddComment = (id) => {
    setIscommenting(true);
  };
  let postComment = async (id) => {
    const body = { text: newComment, audio: id, added_on: timeString };
    console.log(body);
    fetch(`/api/comment/${id}/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        window.location.reload();
      });
  };
  let DeleteComment = async (id) => {
    await axios.delete(`/api/comment/del/${id}`);
    alert("File deleted successfully.");
    window.location.reload();
  };
  const onPlaying = () => {
    const duration = audioElem.current.duration;
    setDuration(duration);
    const ct = audioElem.current.currentTime;
    if (ct !== duration) {
      setProgress((ct / duration) * 100);
    } else {
      setisFinished(true);
      setisplaying(false);
    }
    setTimeStamp(audioElem.current.currentTime);
    let dateObj = new Date(timeStamp * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();
    let timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0"); setTimeString(timeString);
      console.log(timeString)
    console.log(timeStamp)
  };

  return (
    <div class="cont row justify-content-around">
      <div class="col-6">
        <div className="app-container">
          <div className="songtitle">
            <p>{song?.name}</p>
          </div>
          <audio
            id="song"
            src={song?.upload_file}
            ref={audioElem}
            onTimeUpdate={onPlaying}
          ></audio>
          <div class="container text-center">
            <div class="row align-items-start">
              <div class="col">
                <AudioPlayer
                  isplaying={isplaying}
                  setisplaying={setisplaying}
                  audioElem={audioElem}
                  duration={duration}
                  progress={progress}
                  setProgress={setProgress}
                  isFinished={isfinished}
                  setisFinished={setisFinished}
                  setTimeStamp={setTimeStamp}
                  currentComment={currentComment}
                />
              </div>
              {iscommenting ? (
                <div class="col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{timeString}</Card.Title>
                      <Card.Text>
                        <form>
                          <input
                            type="text"
                            onChange={(e) => {
                              setNewComment(e.target.value);
                              console.log(newComment);
                            }}
                          />
                        </form>
                      </Card.Text>
                      <Button variant="primary" onClick={() => postComment(id)}>
                        Add Comment
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div className="audios-list card">
          <div className="scrollable">
          {comments?.map((comment, index) => (
            <div class="row justify-content-evenly">
              <div className="col-6">
                {comment.text}
              </div>
              <div className="col-2">
                  {comment.added_on}
              </div>
              <div className="col-1">
                <button
                  className="btn btn-danger btn-circle btn-sm deletecomment"
                  onClick={() => DeleteComment(comment.id)}
                >
                  x
                </button>
              </div>
              <hr></hr>
            </div>
          ))}
          </div>
          {canPopup ? (
            <div className="row justify-content-center">
            <button
              className="btn addcomment"
              onClick={() => AddComment(id)}
            >
              AddComment
            </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default SongPage;
