/**
 * /src/components/Contact.jsx
 */


import React from 'react';
import './Contact.css'


const Contact = (props) => {
 return (
   <div id="contact">
    <h3>Contact us</h3>
    <p>Please <a href="https://github.com/jazyx/minimal-pairs/issues/new/choose">create an issue on the GitHub website</a> and we'll get back to you as soon as we can.</p>
    <a
      className="github"
      href="https://github.com/jazyx/minimal-pairs"
      target="github"
    >
      <img src="img/icons/github.svg" alt="github"/>
    </a>
  </div>
 )
}


export default Contact