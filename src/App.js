import './App.css';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

function App() {

  const [weatherData, setWeatherData] = useState({});
  //  const [city, setCity] = useState('Stuttgart');

  const key = '078aef7f29f0deb7444ee7d94b5c94f5';

  const sun = "https://cdn-icons-png.flaticon.com/512/4814/4814268.png";
  const cloudy = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
  const clouds = "https://cdn-icons-png.flaticon.com/512/6316/6316087.png";
  const rain = "https://cdn-icons-png.flaticon.com/512/4834/4834677.png";
  const snow = "https://cdn-icons-png.flaticon.com/512/6363/6363108.png";


  let addressAr = ["", "", ""];

  // useEffect(() => {

  //   const ar = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Stuttgart?unitGroup=metric&key=EGWZBVQGZGUCQMGN57N26TQSV&contentType=json`)
  //     .then(response => response.json())
  //     .then(data => {setWeatherData(data); 
  //                    addressAr = weatherData.resolvedAddress.split(", ");})
  //     .catch(function(error) {
  //       console.log('Request failed', error)
  //       });

  // }, []);


  fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Stuttgart?unitGroup=metric&key=EGWZBVQGZGUCQMGN57N26TQSV&contentType=json", {
    "method": "GET",
    "headers": {
    }
  })
    .then(response => response.json())
    .then(data => setWeatherData(data))
    .catch(err => {
      console.error(err);
    });



  // let alert = null;
  // if(weatherData.alerts[0].event !== null){
  //   let alert = weatherData.alerts[0].event;
  // }

  return (

    <div className='page'>
      {/* <div className='weatherData'>

        <div className='head'>
          <b> {weatherData.address} </b>
          <div className="icon"> <img src={snow} width={"64px"} height={"64px"} /> </div>
        </div>

        <b className='AddressWOCity'> {addressAr[1]},  {addressAr[2]}</b>


        <div className='timeAndAlert'>
          <b className='middle'> {weatherData.currentConditions.temp} °C</b>
          <b id="alert"> {alert}</b> 
        </div>
        <b id="time"> 14:22 </b>

        <LinearProgress variant="determinate" className='bar' value={66} />


        <div className='bottom'>
          <div className='rows'>
            <div className="icon2"> <img src={'https://cdn-icons-png.flaticon.com/512/8098/8098355.png'} width={"24px"} height={"24px"} /> </div>
            <div className="icon2"> <img src={'https://cdn-icons-png.flaticon.com/512/8098/8098358.png'} width={"24px"} height={"24px"} /> </div>
          </div>
          <div className='rows'>
            <b> {weatherData.currentConditions.sunrise} </b>
            <b> {weatherData.currentConditions.sunset}  </b>
          </div>
        </div>

      </div>

      <TextField id="standard-basic" label="Type in City" variant="standard" /> */}

    </div>
  );
}

export default App;
