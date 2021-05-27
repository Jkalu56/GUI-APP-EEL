eel.expose(prompt_alerts);
function prompt_alerts(description) {
  alert(description);
}

var map, Marker, Data
async function createMap(){
  let latitude = await eel.get_latitude()();
  let longitude = await eel.get_longitude()();
  var mapOptions = {
  center: [latitude, longitude],
  zoom: 40,
  watch: true,
  }

  // Creating a map object
  map = new L.map('map', mapOptions);

  // Creating a Layer object
  var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

  // Adding layer to the map
  map.addLayer(layer); 

  var myIcon = L.divIcon({className: 'my-div-icon'});
  Marker = L.marker([latitude, longitude], {icon:myIcon}).addTo(map)
    .bindPopup('Payload Position')
    .openPopup();
};

async function update_map(){
  lat = await eel.get_latitude()();
  lng = await eel.get_longitude()();
  Marker.setLatLng([lat, lng]).update();
  map.panTo([lat, lng]);
}

createMap();


function timed_functions(){
  get_time();
  retrieve_data();
  //eel.print_stuff(Data.longitude);
  for (var key in Data){
    var value = Data[key];
    document.getElementById(key).innerHTML = key+': '+value;
  }
}

async function get_time(){
  var clock = document.getElementById("clock");
  var time = new Date();
  var now = time.toLocaleString('en-US', {hour12: true })
  clock.innerHTML = now + " EST";
}


async function retrieve_data(){
  Data = {
    "altitude": await eel.get_altitude()(),
    "latitude": await eel.get_latitude()(),
    "longitude": await eel.get_longitude()(),
    "ext_temperature": await eel.get_ext_temperature()(),
    "int_temperature": await eel.get_int_temperature()(),
  }
}

setInterval(timed_functions, 1000);
setInterval(update_map, 1000);