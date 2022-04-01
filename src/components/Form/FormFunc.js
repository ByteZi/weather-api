import axios from 'axios'
import WEATHER_API from '../weather_api'

const AddBool = (name, data) => {
    if (name === 'forecast') {
        for (let i = 0; i < data.length; i++) {
            data[i].temp['bool'] = true
        }
    }else{
        data.main['bool'] = true
    }
    return data
}
// ===============FOR CITY=================
const UnixConvertHelper = (unix_timestamp) => {
    const time = new Date(unix_timestamp * 1000)
    const conv_time = `${time.toLocaleTimeString()}`
    return conv_time
}

const UnixConvert = (data, name) => {
    if(name === 'city'){
        for (let key in data.sys){
            if(key === 'sunset' || key === 'sunrise'){
                data.sys[key] = UnixConvertHelper(data.sys[key])
            }
        }
        for ( let key in data){
            if(key === 'dt'){
                data[key] = UnixConvertHelper(data[key])
            }
        }
    }else{
        for(let i = 0 ; i < data.length ; i++){
            for(let key in data[i]){
                if(key === 'sunset' || key === 'sunrise'){
                    data[i][key] = UnixConvertHelper(data[i][key])
                }
            }
        }
    }
    return data
}

 
// ========================================



//Convert days here if refactored

const FormFunc = {

    WeatherFindOne: (setCity, setTempList, setLoad, setTimeZone, input, setInput, setCityError) => {
        setCityError('loading')

        if (input === '') return setCityError('invalid')

        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${WEATHER_API.KEY2}&units=metric`)//&units=metric to conver C default
            .then(res => {
                setInput('')
                setCity(AddBool('city', res.data))
                setCity(UnixConvert(res.data,'city'))
                const cord = { lat: res.data.coord.lat, lon: res.data.coord.lon }
                return cord
            })
            .then((cord) => {
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cord.lat}&lon=${cord.lon}&exclude=hourly,minutely&appid=${WEATHER_API.KEY2}&units=metric`)//&units=metric to conver C default
                    .then(res => {
                        setTimeZone(res.data.timezone)
                        setTempList(AddBool('forecast', res.data.daily))
                        setTempList(UnixConvert(res.data.daily,'forecast'))
                        setLoad(true)
                        setCityError('')
                    })
                    .catch(err => {
                        setLoad(false)
                        console.log(err.response)
                    })
            })
            .catch(err => {
                console.log(err)
                setInput('')
                setCityError('404')
            })

    },

    HandleKeyDown: (e) => {
        if (e.key === 'Enter') {
            //something
        }
    },


}

export default FormFunc