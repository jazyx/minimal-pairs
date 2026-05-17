/**
 * /src/components/About.jsx
 */


import { useState } from 'react';
import './About.css'


const About = ({ startActivity }) => {
  const little = {
    position: "absolute",
    top: 0,
    right: 0,
    left: "auto",
    width: "3em",
    height: "3em",
    zIndex: 99
  }
  const big = {
    position: "absolute",
    top: "calc((100vh - 100vmin) / 2)",
    right: "calc((100vw - 100vmin) / 2)",
    left: "auto",
    width: "100vmin",
    height: "100vmin",
    zIndex: 99
  }
  const [ small, setSmall ] = useState(true)
  const [ style, setStyle ] = useState(little)


  const toggleSize = () => {
    const newSmall = !small
    const style = newSmall ? little : big
    setStyle(style)
    setSmall(newSmall)
  }


  return (
    <div id="about">
      <h1>Minimal Pairs</h1>
      <p>A minimal pair is a set of two words whose sounds differ by only one phoneme.<br/>For example: "stuff" and "staff".</p>

      <p>When you are learning a foreign language, you may have difficulty hearing minor differences which are important in your target language but not in your native language.</p>

      <p>This app helps you to recognize the differences.</p>

      <p>You will see a picture and hear a spoken word. You will also see two  symbols that represent a phonetic sound. Choose which sound you heard in the spoken word. Repeat until you can hear the difference between the two sounds easily.</p>

      <p>You can use the menu in the top corner to choose other pairs of sounds, or to set your preferences.</p>
      <button
        className="continue"
        onClick={startActivity}
      >
        Continue
      </button>
      {/* <img src={src} style={style}/> */}
      <div
        style={style}
        onClick={toggleSize}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m2 0h1m1 0h1m2 0h1m1 0h5m1 0h7M4 5.5h1m5 0h1m3 0h1m2 0h1m1 0h1m1 0h1m2 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m7 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m2 0h3m1 0h5m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h4m1 0h1m2 0h5m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h1m1 0h5m4 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h2m1 0h1m2 0h2m3 0h2M4 12.5h1m1 0h5m3 0h1m6 0h1m1 0h1m2 0h5M4 13.5h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1m2 0h4m2 0h3m3 0h1M4 14.5h2m1 0h2m1 0h3m1 0h1m2 0h4m4 0h4M4 15.5h3m5 0h1m2 0h3m1 0h1m3 0h1m1 0h1m3 0h1m1 0h1M4 16.5h3m1 0h3m1 0h3m1 0h1m1 0h2m1 0h1m3 0h1m1 0h1m1 0h2M4 17.5h2m3 0h1m5 0h1m4 0h9m3 0h1M4 18.5h2m1 0h1m2 0h2m2 0h3m2 0h1m2 0h1m1 0h1m1 0h1m2 0h2M4 19.5h3m2 0h1m1 0h1m2 0h2m2 0h2m4 0h3m4 0h1M4 20.5h1m2 0h1m2 0h2m1 0h2m1 0h1m2 0h3m2 0h1m2 0h1m1 0h2M4 21.5h2m3 0h1m1 0h1m4 0h3m1 0h9m1 0h1m1 0h1M4 22.5h1m2 0h4m1 0h1m1 0h1m1 0h6m5 0h2m1 0h1M4 23.5h1m1 0h2m1 0h1m1 0h1m2 0h1m1 0h2m1 0h2m1 0h1m3 0h1m1 0h1m2 0h1M4 24.5h1m1 0h1m2 0h2m1 0h2m4 0h1m2 0h1m1 0h6m1 0h3M12 25.5h1m1 0h3m4 0h2m1 0h1m3 0h5M4 26.5h7m2 0h2m1 0h1m2 0h1m2 0h3m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h1m1 0h1m3 0h3m2 0h2m3 0h1m2 0h2M4 28.5h1m1 0h3m1 0h1m1 0h3m6 0h1m2 0h5m1 0h1M4 29.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h2m1 0h3m6 0h4M4 30.5h1m1 0h3m1 0h1m1 0h1m2 0h2m2 0h2m2 0h1m1 0h7M4 31.5h1m5 0h1m5 0h4m3 0h4m2 0h1m1 0h1M4 32.5h7m1 0h1m1 0h2m3 0h1m1 0h1m1 0h1m6 0h1"/></svg>
      </div>
    </div>
  )
}


export default About