import React from 'react'
import './index.scss'

export default function LearningCards () {

  return (
    <div class="flip">
      <div class="front" style={{"background-image": "url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)"}}>
        <h1 class="text-shadow">MOUNTAIN</h1>
      </div>
      <div class="back">
        <h2>Angular</h2>
        <p>Good tools make application development quicker and easier to maintain than if you did everything by hand..</p>
      </div>
    </div>
  )
}