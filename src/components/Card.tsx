// import React from 'react'
import '../styles/card.css'

function Card() {
  return (
    <div className='cardContainer'>
        <img src="https://img.freepik.com/free-photo/fresh-ripe-apple-white-background-close-up-generative-ai_188544-8731.jpg" alt="this is an image" />
        <h1>{'item name'}</h1>
        <p>{"detail"}</p>
        <p>{"location"}</p>
        <button>Found it!</button>
    </div>
  )
}

export default Card;