import './Form.css'
import FormFunc from './FormFunc'
import { useState } from 'react'

const Form = (props) => {

    const {userTemp} = props
    const [input, setInput] = useState('')
    const [cityError, setCityError] = useState('')

    return (
        <>
            <div className='header'>
                <div className='header_left'>
                    <h1 className='pointer'>Weather<span>Loaf</span>🍞</h1>
                </div>
                <div className='header_right'>

                    {
                        cityError === 'loading' && <div className='ball' />
                    }
                    {
                        cityError === '404' &&
                        <div className='error_container_404 flex'>
                            <p className='input_error'>City not found</p><button onClick={() => setCityError('')} className='btn_error'>X</button>
                        </div>
                    }
                    {
                        cityError === 'invalid' &&
                        <div className='error_container_invalid flex'>
                            <p className='input_error'>Field required</p><button onClick={() => setCityError('')} className='btn_error_invalid'>X</button>
                        </div>
                    }
                    <input className='search ' placeholder='Search a city' onKeyDown={(e) => FormFunc.HandleKeyDown(e)} onChange={e => setInput(e.target.value)} value={input} />
                    <button onClick={() => FormFunc.WeatherFindOne(props.setCity, props.setTempList, props.setLoad, props.setTimeZone, input, setInput, setCityError)} className='btn_search pointer'>Search</button>
                    {
                        userTemp &&
                        <div className='user_weather_card'>
                                <img className='user_weather_card_img' src={`https://openweathermap.org/img/wn/${userTemp.weather[0].icon}@2x.png`} alt='weather' />
                                <h3>| {userTemp.weather[0].description} | </h3>
                        
                            <h3 className='pointer'>Temp : {Math.ceil(userTemp.temp)} °{userTemp.bool === true ? 'C' : 'F'}</h3>
                            

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Form