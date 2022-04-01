import Temp from './Temp'
import './Display.css'


const Display = (props) => {

    const { city, setCity, tempList, setTempList, timeZone } = props //timeZone // userTemp

    const UnixForecastConvert = (unix_timestamp) => {
        var date = new Date(unix_timestamp * 1000)
        const forecast_date = {
            day: Temp.GetDay(date.getDay()),
            month: Temp.GetMonth(date.getMonth()),
            date: date.getDate()
        }
        return forecast_date
    }

    return (

        <div className='display_parent'>
            {/* BODY */}

            <div className='forecast_body flex'>

                <div className='current_weather pointer' onClick={() => Temp.ConvertCityTemp(city, setCity)}>
                    {/* Add Relative time using newDate */}
                    <h1 className='current_weather_header'>{city.name} | {city.sys.country} </h1>
                    <h4>| {timeZone} |</h4>
                    <p>{city.dt}</p>
                    <img className='current_weather_img' src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt='Weather' />
                    <h2>{city.weather[0].description}</h2>
                    <div className='current_weather_div_container'>
                        <div className='current_weather_left flex_1'>
                            <p>Temperature : {Math.ceil(city.main.temp)} °{city.main.bool ? 'C' : 'F'} </p>
                            <p>Min Temp : {Math.ceil(city.main.temp_min)} °{city.main.bool ? 'C' : 'F'} </p>
                            <p>Max Temp : {Math.ceil(city.main.temp_max)} °{city.main.bool ? 'C' : 'F'} </p>
                            <p>Air Pressurer : {city.main.pressure}</p>
                            <p>Humidity : {city.main.humidity}</p>
                        </div>
                        <div className='current_weather_right flex_1'>
                            <p>Wind Speed : {city.wind.speed} mph</p>
                            <p>Wind Degree : {city.wind.deg}</p>
                        </div>
                    </div>
                    <p>Sunrise : {city.sys.sunrise}</p>
                    <p>Sunset: {city.sys.sunset}</p>
                </div>

            </div>

            {/* +FOOT */}
            <div className='forecast_seven_day_footer'>
                {
                    tempList &&
                    tempList.map((temp, i) => {
                        return (
                            <div className='forecast_day_card pointer' key={i} onClick={() => Temp.TempConvertForecast(temp, i, tempList, setTempList)}>
                                <h3 className='forecast_day'>{UnixForecastConvert(temp.dt).day}</h3>
                                <h4 className='forecast_date'>{UnixForecastConvert(temp.dt).date} | {UnixForecastConvert(temp.dt).month}</h4>
                                <p className='forecast_description'>{temp.weather[0].description}</p>
                                <div className='forecast_cards_container flex'>
                                    <div className='forecast_card_left flex_1' >
                                        <img src={`http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`} className='weather_img' alt='Weather img' />
                                    </div>
                                    <div className='forecast_card_right flex_2'>
                                        <p className='forecast_daytime'>Day :{Math.ceil(temp.temp.day)} °{temp.temp.bool === true ? 'C' : 'F'}  </p>
                                        <p className='forecast_evening'>Evening :{Math.ceil(temp.temp.eve)}  °{temp.temp.bool === true ? 'C' : 'F'} </p>
                                        <p className='forecast_night'>Night :{Math.ceil(temp.temp.night)}  °{temp.temp.bool === true ? 'C' : 'F'}</p>
                                    </div>
                                </div>
                                <div className='forecast_card_foot'>
                                    <p>Sunrise : {temp.sunrise}</p>
                                    <p>Sunset : {temp.sunset}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Display