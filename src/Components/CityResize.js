import { useState, useEffect } from 'react';

function CityResize({city}) {

 const [fontsize, setFontsize] = useState(2.5);

 useEffect(() => { 

    const standardSize = 35;
    
   if(city.length > 12 ){
    setFontsize(standardSize - (city.length - 12)); 
   }
   else{
    setFontsize(standardSize);
   }

}, [city]);  


  return (
    <b style={{ fontSize: fontsize + 'px'}}> {city} </b>
  )
}

export default CityResize