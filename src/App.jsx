import React, { useContext } from 'react'
import SideBar from './Component/SideBar'
import Player from './Component/Player'
import Display from './Component/Display'
import { PlayerContext } from './Context/PlayerContext'

const App = () => {

  const {audioRef,track} = useContext(PlayerContext)
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <SideBar/>
        <Display />
      </div>
      <Player/>
      {/* using this refference we can pause play or change the track of the audio file */}
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App

