import React, { Fragment } from 'react'
import ReactPlayer from 'react-player'

function Player({url}) {
  return (
    <Fragment>
      <ReactPlayer url={url}
          controls
          width={500}
          height={360}
      />
    </Fragment>
  )
}

export default Player