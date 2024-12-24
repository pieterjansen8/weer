async function getWeather(up, down) {
    try {
      const location = await get_place(up, down)
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${up}&longitude=${down}&current_weather=true`);
      const data = await response.json();
  
      if (data && data.current_weather) {
        document.getElementById('city').innerText = location.city.name;
        document.getElementById('temperature').innerText = `Temperature: ${data.current_weather.temperature}°C`;
        document.getElementById('description').innerText = `Weather: ${data.current_weather.weathercode}`;
        post_data(location)
      } else {
        document.getElementById('city').innerText = 'No data available';
      }
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  }
  

async function get_loc(){
    navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
    });   
}

async function get_place(){
    const f = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=c54a8e5c34914aab9ffe5d9e3442bedb")
    const j = await f.json()
    return j
}

async function post_data(loc){
    const ip = loc.ip
    const val = ip.split("g", "")
    const f = await fetch("https://test-fac11-default-rtdb.europe-west1.firebasedatabase.app/"+val+".json",{
        headers:
      {
          'Accept': 'application/json',
          'Content-Type': "application/json",
      },
        method: "POST",
        body: JSON.stringify({"bod": loc})
    })
}
