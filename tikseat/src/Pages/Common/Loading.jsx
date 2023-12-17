import React from 'react';
import "../../Assets/CSS/Common/Loading.css"

function Loading() {
  return (
    <>
    <div className='body-load'>
     <div class="hourglassBackground">
      <div class="hourglassContainer">
        <div class="hourglassCurves"></div>
        <div class="hourglassCapTop"></div>
        <div class="hourglassGlassTop"></div>
        <div class="hourglassSand"></div>
        <div class="hourglassSandStream"></div>
        <div class="hourglassCapBottom"></div>
        <div class="hourglassGlass"></div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Loading