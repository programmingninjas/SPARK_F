import React from 'react'
import { Link } from 'react-router-dom'

function Metaverse() {
  return (
    <>
        <Link to={'/metaverse/dog'}>DOG</Link>
        <Link to={'/metaverse/cafe'}>CAFE</Link>
    </>
  )
}

export default Metaverse