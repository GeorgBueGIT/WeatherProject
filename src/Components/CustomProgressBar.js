import React, { useEffect, useState } from 'react';
import '../CSS/CustomProgressBar.css';

function CustomProgressBar({ daylightProgress }) {

   const [daylightPercentValue, setdaylightPercentValue] = useState(daylightProgress);

   const [daylightSelectionOuter, setdaylightSelectionOuter] = useState(0);
   const [daylightSelectionMiddle, setdaylightSelectionMiddle] = useState(0);
   const [daylightSelectionInner, setdaylightSelectionInner] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   

   useEffect(() => {

      console.log(daylightProgress);

      if (daylightProgress >= 20 && daylightProgress <= 80) {
         setdaylightPercentValue(100);
      }
      else if (daylightProgress < 20) {
         setdaylightPercentValue(daylightProgress * 5);
      }
      else {
         setdaylightPercentValue((100 - daylightProgress) * 5);
      }

   }, [daylightProgress]);



   useEffect(() => {

      setdaylightSelectionOuter((Math.round(daylightPercentValue / 5)) > 0 ? (Math.round(daylightPercentValue / 5)) - 1 : (Math.round(daylightPercentValue / 5)));
      setdaylightSelectionMiddle((Math.round(daylightPercentValue / 22)) > 0 ? (Math.round(daylightPercentValue / 22)) - 1 : (Math.round(daylightPercentValue / 22)));
      setdaylightSelectionInner((Math.round(daylightPercentValue / 33)) > 0 ? (Math.round(daylightPercentValue / 33)) - 1 : (Math.round(daylightPercentValue / 33)));

      setIsLoading(false);

   }, [daylightPercentValue]);


   const colorGradientInner = [
      "#FFD500",
      "#FFD500",
      "#847F42",
   ];

   const colorGradientMiddle = [
      "#FFB700",
      "#CE9B1A",
      "#847042",
      "#847042",
      "#151515"];

   const colorGradientOuter = [
      "#FF7300", "#F36F07", "#E66C0D", "#DA6814", "#CE641A", "#C16121", "#B55D28", "#A9592E", "#9C5535", "#90523B",
      "#844E42", "#774A49", "#6B474F", "#5E4356", "#523F5C", "#463C63", "#151515", "#151515", "#151515",
      "#151515"];


   if (!isLoading) {


      return (
         <div className='progressCustom'>
            <div className='mainCircle'>
               <div className='innerCircles' style={{ background: colorGradientInner[(2 - daylightSelectionInner)] }}>
                  <div className='innerCircles' style={{ background: colorGradientMiddle[4 - daylightSelectionMiddle] }}>
                     <div className='innerCircles' style={{ background: colorGradientOuter[19 - daylightSelectionOuter] }}> </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default CustomProgressBar