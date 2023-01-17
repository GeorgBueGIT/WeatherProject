import './App.css';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function App() {

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Stuttgart');
  const [textInput, setInput] = useState('');

  const key = 'EGWZBVQGZGUCQMGN57N26TQSV';
  const fetchURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city + "?unitGroup=metric&key=GULV4PSEG2ZAQNKGHQ953UDMX&contentType=json";

  const iconSource = './WeatherIcons/clear-day.png';

  const sun = "https://cdn-icons-png.flaticon.com/512/4814/4814268.png";
  const cloudy = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
  const clouds = "https://cdn-icons-png.flaticon.com/512/6316/6316087.png";
  const rain = "https://cdn-icons-png.flaticon.com/512/4834/4834677.png";
  const snow = "https://cdn-icons-png.flaticon.com/512/6363/6363108.png";

  var today = new Date();
  var dateTime = today.getHours() + ":" + today.getMinutes();


  const fetchData = async () => {
    const response = await fetch(fetchURL, {
      "method": "GET",
      "headers": {
      }
    });
    const data = await response.json();
    setWeatherData(data);
    console.log(data);
    setLoading(false);
  };


  useEffect(() => {
    fetchData()
  }, [city])



  function WeatherDisplay() {

    if (!loading) {

      const daylightStatus = () => {
        var nowTime = new Date();
        var nowHour = nowTime.getHours;
        var nowMinutes = nowTime.getMinutes;

        var sunriseTime = weatherData.currentConditions.sunrise.split(":");
        var sunsetTime = weatherData.currentConditions.sunset.split(":");

        console.log(sunriseTime[0]);

        const forecastArray = weatherData.days;


        if (nowMinutes <= sunriseTime[1] && nowHour <= sunriseTime[0]) {
          return 0;
        }
        else if (nowMinutes >= sunsetTime[1] && nowHour >= sunsetTime[0]) {
          return 100;
        }
        else {
          const minutesSunsetDifSunrise = sunsetTime[0] * 60 + sunsetTime[1] - sunriseTime[0] * 60 + sunriseTime[1];
          const minutesNowDifSunrise = nowHour * 60 + nowMinutes - sunriseTime[0] * 60 + sunriseTime[1];
          const percentage = Math.round(minutesNowDifSunrise / minutesSunsetDifSunrise * 100);
          return percentage;
        }
      }

      return (
        <div className='weatherData'>

          <div className='head'>
            <div className='address'>
              <b> {weatherData.address} </b>
              <b className='AddressWOCity'> {weatherData.resolvedAddress.split(", ")[1]},  {weatherData.resolvedAddress.split(", ")[2]}</b>
            </div>
            <div> <img src={snow} width={"64px"} height={"64px"} /> </div>
            {/* <div className="icon"> <img src='./WeatherIcons/clear-day.png' alt="Funktioniert nicht"/> </div> */}

          </div>

          <div className='middle'>
            <b className='temp'> {weatherData.currentConditions.temp}°</b>
            <b id="time"> {dateTime} </b>
          </div>

          <LinearProgress variant="determinate" className='bar' value={daylightStatus} />


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

          <div className='visualSeperator'> </div>

          {/* Hier noch Vorhersage */}

          <div className="forecast">
            {weatherData.days.map((item) => {
              return (
                <div className="forecastDay">
                  <div className="forecastDate">
                    <b> {item.datetime.split("-")[2]}. </b>
                    <b> {item.datetime.split("-")[1]} </b>
                  </div>
                  <div> <img src={snow} width={"16px"} height={"16px"} /> </div>
                  <b> {item.temp}° </b>
                </div>
              )
            })
            }



          </div>

        </div>
      );
    }

  }


  return (

    <div className='page'>
      <WeatherDisplay />

      <div className='inputArea'>
        <div id="locationDiv"> <LocationOnIcon sx={{ fontSize: 20 }} /> </div>
        <input type="text" id="inputTextfield" placeholder=" Type in City" value={textInput} onChange={(newValue) => setInput(newValue.target.value)} onKeyDown={event => {
          if (event.key === 'Enter') {
            setCity(textInput);
            setInput('');
          }
        }} />

      </div>
    </div>
  );
}

export default App;
