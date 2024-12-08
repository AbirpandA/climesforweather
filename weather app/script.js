function getweather(){
    var city= document.getElementById("city").value;
    var apikey='734f87419b9d42249032b89d4703639f'
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
    
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayweather(data)
        console.log(data)
    })

    .catch(err=>{
        console.log('Error:',err);
        alert('error fetching weather data')
    })

    fetch(forecastUrl)
    .then(response=>response.json())
    .then(data=>displayforecast(data.list))
    .catch(err=>{
        console.log('Error:',err);
        alert('error fetching forecast')
    })

}
function displayweather(data){
    const temp=document.querySelector('.temp')
    const tempsec=document.querySelector('#temp')
    const weatherinfo=document.querySelector('#weatheris')
    const weathericon =document.querySelector('#weatherlogo')
    const cloudy=document.querySelector('#cloudy')
    const humidity=document.querySelector('#humidity')
    const winds=document.querySelector('#winds')

    weatherinfo.innerHTML=''
    temp.innerHTML=''

    if(data.cod==400){
        weatherinfo.innerHTML=`<p>${data.message}<p>`
    }
    else{
        const temprature= Math.round(data.main.temp - 273.15)
        const description=data.weather[0].description
        const iconcode=data.weather[0].icon
        const cityname=data.name
        const wind=data.wind.speed
        const humiditydata=data.main.humidity
        const clouds=data.clouds.all
        
        const iconurl=`https://openweathermap.org/img/wn/${iconcode}@4x.png`

        const weathercityhtml=`0.............................................................console.log('Fetching current weather data...');
console.log('Fetching forecast data...');
console.log('Displaying weather data...');
console.log('Displaying forecast data...');24
        60.........................
        <p>${cityname}</p>
        <p>${description}</p>
        `

        temp.innerHTML=`${temprature}°C`
        tempsec.innerHTML=`${temprature}°C`
        weatherinfo.innerHTML=weathercityhtml
        winds.innerHTML=`${wind}m/s`
        cloudy.innerText=`${clouds}%`
        humidity.innerHTML=`${humiditydata}%`
        weathericon.src=iconurl
        
        showImage()

    }
}
function displayforecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('forecast');
    hourlyForecastDiv.innerHTML = '';

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <div>${hour}:00</div>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <div>${temperature}°C</div>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
function showImage() {
    const weatherIcon = document.getElementById('weatherlogo');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
