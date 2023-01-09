import React, { useRef } from 'react';
import './audio_player.scss';
import {BsFillPlayCircleFill, BsFillPauseCircleFill,BsArrowCounterclockwise} from 'react-icons/bs';
const AudioPlayer = ({audioElem, isplaying, setisplaying, duration,progress,setTimeStamp,isFinished,setisFinished,currentComment})=> {

    const clickRef = useRef();
  
    const PlayPause = ()=>
    {
      setisplaying(!isplaying);
    }
    const Replay=()=>
    {
        setisFinished(!isFinished);
        setisplaying(true);
    }
    const checkWidth = (e)=>
    {
      let width = clickRef.current.clientWidth;
      setisplaying(false)
      const offset = e.nativeEvent.offsetX;
      const divprogress = offset / width * 100;
      audioElem.current.currentTime = divprogress / 100 * duration;
      setTimeStamp(audioElem.current.currentTime);
    }

    return (
      <div className='player_container'>
        <div className="title">
        </div>
        <div className="navigation">
          <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
            <div className="seek_bar" style={{width: `${progress+"%"}`}}></div>
          </div>
        </div>
        <div className="controls">
          {isFinished? <BsArrowCounterclockwise className='btn_action pp' onClick={Replay}/> : [
            isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause}/>
            : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause}/>]}
        </div>
      </div>
    
    )
  }
  
export default AudioPlayer;
