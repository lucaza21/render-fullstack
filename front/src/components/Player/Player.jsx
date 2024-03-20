import React from 'react'
import ReactPlayer from 'react-player'

function Player({url}) {
  return (
    <>
    <div className='container my-2'>

    <ReactPlayer url={url}
        controls 

        />
    </div>
    </>
  )
}

export default Player