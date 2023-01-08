import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from './slider/slider.js';
import ControlPanel from './controls/ControlPanel.js';

export const PlaySong = () => {
    const [audiofile, setAudioFile] = useState("")

    const { id } = useParams()

    const getAudio = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/${id}`)
        console.log(data)
        setAudioFile(data)
    }

    useEffect(() => {
        getAudio();
    }, [])

    const [percentage, setPercentage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef()
    const onChange = (e) => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setPercentage(e.target.value)
    }

    const play = () => {
        const audio = audioRef.current
        audio.volume = 0.1

        if (!isPlaying) {
            setIsPlaying(true)
            audio.play()
        }
        else {
            setIsPlaying(false)
            audio.pause()
        }
    }

    const getCurrentDuration = (e) => {
        const percentage = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percentage)
        setCurrentTime(time.toFixed(2))
    }
    return (
        <div className="app-container">
            <div id="cover"></div>
            <p id="title"></p>
            <h1>Player</h1>
            <Slider onChange={onChange} percentage={percentage} />
            <audio id="song" ref={audioRef} src={audiofile.upload_file}
                onLoadedData={(e) => {
                    setDuration(e.currentTarget.duration.toFixed(2))
                }}
                onTimeUpdate={getCurrentDuration}
            ></audio>
            <ControlPanel
                play={play}
                isPlaying={isPlaying}
                duration={duration}
                currentTime={currentTime}
            />
        </div>
    );
}
