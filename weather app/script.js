function getweather(){
    var city= document.getElementById("city").value;
    var apikey='a39c1429152507e775150783a7006a0c'
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
    const body=document.body

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

        const weathercityhtml=`
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


        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const sunrise = data.sys.sunrise; // Sunrise time in seconds
        const sunset = data.sys.sunset; // Sunset time in seconds

        let backgroundImage= '';

        if (currentTime >= sunrise && currentTime < sunset) {

        if (description.includes('clear')) {
            backgroundImage = "url('https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (description.includes('clouds')) {
            backgroundImage = "url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg')";
        } else if (description.includes('rain')) {
            backgroundImage = "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (description.includes('snow')) {
            backgroundImage = "url('https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (description.includes('thunderstorm')) {
            backgroundImage = "url('https://images.pexels.com/photos/3657143/pexels-photo-3657143.jpeg?auto=compress&cs=tinysrgb&w=600')";
        } else {
            backgroundImage = "url('https://img.freepik.com/free-photo/colorful-sky-after-sunset_661209-461.jpg')"; // Fallback image
        }


        } else {

        if (description.includes('clear')) {
            backgroundImage = "url('https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (description.includes('clouds')) {
            backgroundImage = "url('https://images.unsplash.com/photo-1572162522099-7a0c28d7691b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (description.includes('rain')) {
            backgroundImage = "url('https://images.pexels.com/photos/2068411/pexels-photo-2068411.jpeg?auto=compress&cs=tinysrgb&w=600')";
        } else if (description.includes('snow')) {
            backgroundImage = "url('https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (description.includes('thunderstorm')) {
            backgroundImage = "url('https://images.pexels.com/photos/3657143/pexels-photo-3657143.jpeg?auto=compress&cs=tinysrgb&w=600')";
        } else {
            backgroundImage = "url('https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Fallback image
        }

        
        }
        // Set the background image
        body.style.backgroundImage = backgroundImage;
        
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
