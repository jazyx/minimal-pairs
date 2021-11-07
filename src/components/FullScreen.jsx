/**
 * 
 */

import './FullScreen.css'

export const FullScreenButton = (props) => {
  const toggleFullScreen = () => {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }

    if (document.exitFullscreen) {
      document.exitFullscreen().catch(()=>{});
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen().catch(()=>{});
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen().catch(()=>{});
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen().catch(()=>{});
    }
  }

  const isIOS = (() => {
    var iosQuirkPresent = function () {
        var audio = new Audio();

        audio.volume = 0.5;
        return audio.volume === 1;   // volume cannot be changed from "1" on iOS 12 and below
    };

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var isAppleDevice = navigator.userAgent.includes('Macintosh');
    var isTouchScreen = navigator.maxTouchPoints >= 1;   // true for iOS 13 (and hopefully beyond)

    return isIOS || (isAppleDevice && (isTouchScreen || iosQuirkPresent()));
  })();
  // https://stackoverflow.com/a/62094756/1927589pd
  
  const SVGButton = () => (
    <svg
      id="fullscreen-btn"
      xmlns="http://www.w3.org/2100/svg"
      viewBox="0 0 100 100"
      onMouseUp={toggleFullScreen}
      onClick={props.onClick}
    >

      <rect
        width="100"
        height="100"
        stroke="white"
        strokeWidth="1"
        opacity="0"
      />

      <path
        className="collapse"
        d="
          M 45 55
          v 27
          a 5 5 0 0 1 -10 0
          v -10
          l -21 21
          a 5 5 0 0 1 -7.07 -7.07
          l 21 -21
          h -10
          a 5 5 0 0 1 0 -10
          Z

          M 55 45
          v -27
          a 5 5 0 0 1 10 0
          v 10
          l 21 -21
          a 5 5 0 0 1 7.07 7.07
          l -21 21
          h 10
          a 5 5 0 0 1 0 10
          Z
        "
      />

      <path
        className="expand"
        d="
          M 95 5
          v 27
          a 5 5 0 0 1 -10 0
          v -10
          l -21 21
          a 5 5 0 0 1 -7.07 -7.07
          l 21 -21
          h -10
          a 5 5 0 0 1 0 -10
          Z

          M 5 95
          v -27
          a 5 5 0 0 1 10 0
          v 10
          l 21 -21
          a 5 5 0 0 1 7.07 7.07
          l -21 21
          h 10
          a 5 5 0 0 1 0 10
          Z
        "
      />
    </svg>
  )

  let component = isIOS ? "" : SVGButton()
  
  if (component && props.asListItem) {
    component = (
      <li
        className="fullscreen"
        key="fullscreen"
      >
        {component}
      </li>
    )
  }

  return component
}