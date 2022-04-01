import './App.css'
import { useState, useEffect } from 'react'
import Form from './components/Form/Form'
import Display from './components/Display/Display'
import axios from 'axios'
import WEATHER_API from './components/weather_api'

function App() {

  const [city, setCity] = useState('')
  const [tempList, setTempList] = useState([]);
  const [timeZone, setTimeZone] = useState('')

  const[load, setLoad] = useState(false)
  const [userTemp, setUserTemp] = useState(false)

  const [userTime, setUserTime] = useState('')
    const Clock = () => {
      const current = new Date();
      setUserTime(current.toLocaleTimeString())
  }
  setInterval(Clock, 1000)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&appid=${WEATHER_API.KEY2}&units=metric`)
            .then(res => setUserTemp(UnixConvert(res.data.current)))
            .catch(err => console.log(err))
    })
  }, [])

  const UnixHelp = (unix_timestamp) => {
    const time = new Date(unix_timestamp * 1000)
    return time.toLocaleTimeString()
  }


  const UnixConvert = (data) => {
    data['bool'] = true
    for (let key in data){
      if(key === 'sunrise' || key === 'sunset' ){//|| key === 'dt'
        data[key] = UnixHelp(data[key])
      }
    }
    return data
  }

  return (
    <div className="App">
      
      <Form setCity={setCity} setTempList={setTempList} setLoad={setLoad} setTimeZone={setTimeZone} city={city} userTemp={userTemp} setUserTemp={setUserTemp} userTime={userTime}/>
      {load && <Display city={city} tempList={tempList} timeZone={timeZone} setTempList={setTempList} userTemp={userTemp} setCity={setCity}/>}

    </div>
  );
}

export default App;
