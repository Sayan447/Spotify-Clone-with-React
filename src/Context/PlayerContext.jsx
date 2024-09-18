import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

// after that we create one context provider function
const PlayerContextProvider = (props) =>{
    // here we'll create one refference variable
    const audioRef = useRef();
    // for the seek bar
    const seekBg = useRef();
    const seekBar = useRef();


    const [track , setTrack] = useState(songsData[0]);
    // to manage the player status play and pause
    const[playStatus , setPlayStatus] = useState(false) // false means it'll be paused
    // another state variable for total duration and current time 
    const[time , setTime] = useState({
        currentTime:{
            second : 0,
            minute: 0
        },
        totalTime:{
            second : 0,
            minute: 0

        }
    })

    const play = () =>{
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () =>{
        audioRef.current.pause();
        setPlayStatus(false)
    }


    const previous = async ()=>{
        if(track.id > 0){
            await setTrack(songsData[track.id-1])
            await audioRef.current.play()
            setPlayStatus(true)

        }
    }
    const next = async ()=>{
        if(track.id < songsData.length-1){
            await setTrack(songsData[track.id+1])
            await audioRef.current.play()
            setPlayStatus(true)

        }
    }


    const playWithId = async(id) =>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true)

    }

    const seekSong = async(e) =>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)

    }

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate=()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration * 100))+"%"
                setTime({
                    currentTime:{
                        second : Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second : Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
            
                    }
                })
            }

        },1000);

    },[audioRef])



    // it'll be one object, 
    const contextValue = {
// whatever function and state we'll create in this contextValue
// we can access that in any other component

        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        time,setTime,
        playStatus,setPlayStatus,
        play,pause,playWithId,previous,next,seekSong

    }
 
    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;