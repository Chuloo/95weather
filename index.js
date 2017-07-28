{/*<script>*/}
  $(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      getWeather(lat, long)
    })
  }
  function getWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/50241cf7be6767a7a0ccd9527633b8e9/${lat},${long}`;
    console.log(url)
    $.get(url, function(data) {
    updateDOM(data)
  }, 'jsonp')
  }

  function updateDOM(data) {
    console.log(data)
    document.querySelector('#temp').innerHTML =
      `${convertTemp(data.currently.temperature, 'F')} | ${data.currently.temperature} F`;
    document.getElementById('place').append(data.timezone)
    document.getElementById('wind-speed').append(data.currently.windSpeed + " Knots")
    document.getElementById('details').append(data.currently.summary)
  }

  function convertTemp(temp, mode) {
    if(mode === 'C') {
      return ((temp * 1.8) + 32).toFixed(2) + ' F'
    } else if(mode === 'F') {
      return ((temp - 32) / 1.8).toFixed(2) + ' C'
    }
    else {
      return temp
    }
  }
});
  // </script>