const UnixConvert = {

    GetMonth: (month) => {
        const months  = ['January','February','March','April','May','June','July','August','Septemper','October','November','December'];
        for( let i = 0 ; i !== months.length ; i++ ){
            if(i === month){
                return months[i]
            }
        }
    },

    GetDay : (day) => {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        for( let i = 0 ; i !== days.length ; i++ ){
            if(i === day){
                return days[i]
            }
        }
    },

    TempConvertForecast : (data, id, tempList, setTempList) => {
        if(data.temp.bool === true){ //Depict if bool for card is true = Celcius
            data.temp.bool = false

            for(let key in data.temp){
                if(key !== 'bool'){
                    setTempList([...tempList], tempList[id].temp[key] = (tempList[id].temp[key] * 9/5) + 32) 
                }
            }

        }else{
            data.temp.bool = true

            for(let key in data.temp){
                if(key !== 'bool'){
                    setTempList([...tempList], tempList[id].temp[key] = (tempList[id].temp[key] -32) * 5/9)
                }
            }
        }
    },

    ConvertCityTemp  : (data, setCity) => {
        if(data.main.bool === true){
            data.main.bool = false
            for(let key in data.main){
                if(key !=='feels_like' && key !== 'humidity' && key !== 'pressure' && key !== 'bool'){
                    setCity({...data}, data.main[key] = (data.main[key] * 9/5) + 32)
                }
            }
        }else{
            data.main.bool = true
            for(let key in data.main){
                if(key !=='feels_like' && key !== 'humidity' && key !== 'pressure' && key !== 'bool'){
                    setCity({...data}, data.main[key] = (data.main[key] -32) * 5/9)
                }
            }
        }
    },

 

}

export default UnixConvert

