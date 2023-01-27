import './App.css';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import DaylightVisual from './Components/DaylightVisual.js';
import CityResize from './Components/CityResize';


function App() {

  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState('Stuttgart');
  const [textInput, setInput] = useState('');
  const [daylightProgress, setDaylightProgress] = useState(0);
  const [cityApproved, setCityApproved] = useState(true);
  const [dateTime, setDateTime] = useState("404:404");

  const key = 'K33WSN84G3H86NQKB86QS9XQF';

  
  useEffect(() => {

    const fetchURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city + "?unitGroup=metric&key=" + key + "&contentType=json";

    const fetchData = async () => {

      try {
        const response = await fetch(fetchURL, {
          "method": "GET",
          "headers": {
          }
        });
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
        setIsLoading(false);
        setCityApproved(true);

      } catch (error) {
        setCityApproved(false);
      }


    };

    fetchData();

  }, [city])


  useEffect(() => {

    if (!isLoading) {
      var nowTime = new Date().toLocaleString('be-EU', { timeZone: weatherData.timezone });
      var nowHour = nowTime.split(", ")[1].split(":")[0];
      var nowMinutes = nowTime.split(", ")[1].split(":")[1];

      var sunriseTime = weatherData.currentConditions.sunrise.split(":");
      var sunsetTime = weatherData.currentConditions.sunset.split(":");

      // console.log("Now: " + nowHour + ":" + nowMinutes + "  Sunset: " + sunsetTime[0] + ":" + sunsetTime[1]);

      if ((nowMinutes <= parseInt(sunriseTime[1]) && parseInt(nowHour) === parseInt(sunriseTime[0])) || parseInt(nowHour) < parseInt(sunriseTime[0])) {
        setDaylightProgress(0);
      }
      else if ((nowMinutes >= parseInt(sunsetTime[1]) && parseInt(nowHour) === parseInt(sunsetTime[0])) || parseInt(nowHour) > parseInt(sunsetTime[0])) {
        setDaylightProgress(100);
      }
      else {
        const minutesSunsetDifSunrise = ((parseInt(sunsetTime[1]) + parseInt(sunsetTime[0]) * 60) - (parseInt(sunriseTime[1]) + parseInt(sunriseTime[0]) * 60));
        const minutesNowDifSunrise = (parseInt(nowHour) * 60 + parseInt(nowMinutes) - (parseInt(sunriseTime[1]) + parseInt(sunriseTime[0]) * 60));
        setDaylightProgress(Math.round(((minutesNowDifSunrise / minutesSunsetDifSunrise) * 100)));
      }

      setDateTime(nowHour + ":" + nowMinutes);

    }
  }, [isLoading, weatherData]);


  if (!isLoading) {

    return (
      <div className='page'>

        <DaylightVisual daylightProgress={daylightProgress} />

        <div id='weatherPanel'>

          <div id='head'>
            <div id='address'>
              <CityResize city={city}/>
              <b id='addressWOCity'> {weatherData.resolvedAddress.split(", ")[1]},  {weatherData.resolvedAddress.split(", ")[2]}</b>
            </div>
            <div> <img src={require('./Media/WeatherIcons/' + weatherData.currentConditions.icon + '.png')} alt="Weathericon" id="weatherImage" /> </div>

          </div>


          <b id='temp'> {weatherData.currentConditions.temp}°</b>


          <div id='sTs'>
            <div className='sTscolumn'>
              <div > <img src={'https://cdn-icons-png.flaticon.com/512/8098/8098355.png'} width={"24px"} height={"24px"} alt="SunriseIcon" /> </div>
              <b> {weatherData.currentConditions.sunrise} </b>
            </div>

            <div className='sTscolumn'>
              <b id="time"> {dateTime} </b>
            </div>

            <div className='sTscolumn'>
              <div> <img src={'https://cdn-icons-png.flaticon.com/512/8098/8098358.png'} width={"24px"} height={"24px"} alt="SunsetIcon" /> </div>
              <b> {weatherData.currentConditions.sunset}  </b>
            </div>
          </div>

          <img src={require('./Media/dottedline.png')} alt="Just a visual" id='visualLine'></img>

          <div id="forecast">
            {weatherData.days.map((item, id) => {
              if (item !== weatherData.days[0]) {
                return (
                  <div id="forecastDay" key={id}>
                    <div id="forecastDate">
                      <b> {item.datetime.split("-")[2]}. </b>
                      <b> {item.datetime.split("-")[1]} </b>
                    </div>
                    <div id='iconAndTemp'>
                      <div> <img src={require('./Media/WeatherIcons/' + item.icon + '.png')} alt="Weathericon" id='smallWeatherImages' /> </div>
                      <b style={{ display: 'flex', justifyContent: 'center' }}> {item.temp}° </b>
                    </div>
                    <div></div>
                  </div>
                )
              }
              else {
                return null;
              }
            })
            }
          </div>
        </div>


        <div id='inputArea'>

          <input type="text" id="inputTextfield" placeholder=" Type in City" value={textInput} onChange={(newValue) => setInput(newValue.target.value)} onKeyDown={event => {
            if (event.key === 'Enter') {
              setCity(textInput);
              setInput('');
            }
          }} />
        </div>



        <div id='errorAlert'>
          <Alert severity="error" style={!cityApproved ? {} : { display: 'none' }} > ERROR, City not found!</Alert>
        </div>

      </div>
    );
  }
  else {
    return (
      <div className='page'>
        <CircularProgress size={200} />
      </div>
    )
  }

}

export default App;
