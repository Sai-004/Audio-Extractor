import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "./audioPlayer/audio_player.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SongPage = ({ match }) => {
  let navigate = useNavigate();
  const { id } = useParams();
  let [song, SetSong] = useState(null);
  let [comments, SetComments] = useState(null);
  const [isplaying, setisplaying] = useState(false);
  const [isfinished, setisFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioElem = useRef();
  useEffect(() => {
    getSong();
  }, [id]);
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
  let DeleteComment = async (id) => {
    await axios.delete(`/api/comment/del/${id}`);
    alert("File deleted successfully.");
    window.location.reload();
  };
  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

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
  };

  return (
    <div>
      <h1>{song?.name}</h1>
      <div className="app-container">
        <div id="cover"></div>
        <p id="title"></p>
        <h1>Player</h1>
        <audio
          id="song"
          src={song?.upload_file}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        ></audio>
        <AudioPlayer
          isplaying={isplaying}
          setisplaying={setisplaying}
          audioElem={audioElem}
          duration={duration}
          progress={progress}
          setProgress={setProgress}
          isFinished={isfinished}
          setisFinished={setisFinished}
        />
      </div>
      <div className="audios-list">
        {comments?.map((comment, index) => (
          <div>
            <h3>{comment.text}</h3>
            <div className="actions">
              <button
                className="btn btn-danger deletefile"
                onClick={() => DeleteComment(comment.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SongPage;
