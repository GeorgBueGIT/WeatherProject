import './App.css';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CustomProgressBar from './Components/CustomProgressBar.js';


function App() {

  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState('Stuttgart');
  const [textInput, setInput] = useState('');
  const [daylightProgress, setDaylightProgress] = useState(0);
  const [cityApproved, setCityApproved] = useState(true);

  const key = 'K33WSN84G3H86NQKB86QS9XQF';


  var today = new Date();
  var dateTime = ((today.getHours() > 9) ? today.getHours() : '0' + today.getHours()) + ":" + ((today.getMinutes() > 9) ? today.getMinutes() : '0' + today.getMinutes())

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
      var nowTime = new Date();
      var nowHour = nowTime.getHours();
      var nowMinutes = nowTime.getMinutes();

      var sunriseTime = weatherData.currentConditions.sunrise.split(":");
      var sunsetTime = weatherData.currentConditions.sunset.split(":");

      // console.log("Now: " + nowHour + ":" + nowMinutes + "  Sunset: " + sunsetTime[0] + ":" + sunsetTime[1]);

      if ((nowMinutes <= parseInt(sunriseTime[1]) && nowHour === parseInt(sunriseTime[0])) || nowHour < parseInt(sunriseTime[0])) {
        setDaylightProgress(0);
      }
      else if ((nowMinutes >= parseInt(sunsetTime[1]) && nowHour === parseInt(sunsetTime[0])) || nowHour > parseInt(sunsetTime[0])) {
        setDaylightProgress(100);
      }
      else {
        const minutesSunsetDifSunrise = ((parseInt(sunsetTime[1]) + parseInt(sunsetTime[0]) * 60) - (parseInt(sunriseTime[1]) + parseInt(sunriseTime[0]) * 60));
        const minutesNowDifSunrise = (nowHour * 60 + nowMinutes - (parseInt(sunriseTime[1]) + parseInt(sunriseTime[0]) * 60));
        setDaylightProgress(Math.round(((minutesNowDifSunrise / minutesSunsetDifSunrise) * 100)));
      }
    }
  }, [isLoading, weatherData]);


  if (!isLoading) {

    return (
      <div className='page'>

        <CustomProgressBar daylightProgress={daylightProgress} />

        <div className='weatherData'>

          <div className='head'>
            <div className='address'>
              <b> {weatherData.address} </b>
              <b className='AddressWOCity'> {weatherData.resolvedAddress.split(", ")[1]},  {weatherData.resolvedAddress.split(", ")[2]}</b>
            </div>
            {/* <div> <img src={snow} width={"64px"} height={"64px"} /> </div> */}
            <div className="icon"> <img src={require('./RealNiceWeatherIcons/' + weatherData.currentConditions.icon + '.png')} alt="Weathericon" className="weatherImage" /> </div>

          </div>


          <b className='temp'> {weatherData.currentConditions.temp}°</b>


          <div className='rows'>

            <div className='column'>
              <div className="icon2"> <img src={'https://cdn-icons-png.flaticon.com/512/8098/8098355.png'} width={"24px"} height={"24px"} alt="SunriseIcon" /> </div>
              <b> {weatherData.currentConditions.sunrise} </b>
            </div>

            <div className='column'>
              <b id="time"> {dateTime} </b>
            </div>

            <div className='column'>
              <div className="icon2"> <img src={'https://cdn-icons-png.flaticon.com/512/8098/8098358.png'} width={"24px"} height={"24px"} alt="SunsetIcon" /> </div>
              <b> {weatherData.currentConditions.sunset}  </b>
            </div>

          </div>

          {/* <div className='visualSeperator'> </div> */}

          <img src={require('./CSS/pngegg.png')} alt="Weathericon" className='image'></img>

          <div className="forecast">
            {weatherData.days.map((item, id) => {
              return (
                <div className="forecastDay" key={id}>
                  <div className="forecastDate">
                    <b> {item.datetime.split("-")[2]}. </b>
                    <b> {item.datetime.split("-")[1]} </b>
                  </div>
                  <div className='iconAndTemp'>
                    <div className="icon"> <img src={require('./RealNiceWeatherIcons/' + item.icon + '.png')} alt="Weathericon" className='weatherImage2' /> </div>
                    <b style={{ display: 'flex', justifyContent: 'center' }}> {item.temp}° </b>
                  </div>
                  <div></div>
                </div>
              )
            })
            }
          </div>
        </div>


        <div className='inputArea'>

          <input type="text" id="inputTextfield" placeholder=" Type in City" value={textInput} onChange={(newValue) => setInput(newValue.target.value)} onKeyDown={event => {
            if (event.key === 'Enter') {
              setCity(textInput);
              setInput('');
            }
          }} />
        </div>



        <div id='errorAlert'>
          <Alert severity="error" style={!cityApproved ? {} : { display: 'none' }} > ERROR, city not found!</Alert>
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
