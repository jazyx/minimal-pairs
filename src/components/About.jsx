/**
 * /src/components/About.jsx
 */


import React from 'react';
import './About.css'


const About = ({ startActivity }) => {
  return (
    <div id="about">
      <h1>Minimal Pairs</h1>
      <p>A minimal pair is a set of two words whose sounds differ by only one phoneme.<br/>For example: "stuff" and "staff".</p>

      <p>When you are learning English as a foreign language, you may have difficulty hearing minor differences which are important in your target language but not in your native language.</p>

      <p>This app helps you to recognize the differences.</p>

      <p>You will see a picture and hear a spoken word. You will also see two  symbols that represent a phonetic sound. Choose which sound you heard in the spoken word. Repeat until you can hear the difference between the two sounds easily.</p>

      <p>You can use the menu in the top corner to choose other pairs of sounds, or to set your preferences.</p>
      <button
        onClick={startActivity}
      >
        Continue
      </button>
    </div>
  )
}


export default About