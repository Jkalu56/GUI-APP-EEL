eel.expose(prompt_alerts);
function prompt_alerts(description) {
    alert(description);
}

var map, Marker;

async function createMap() {
    pythonData = await eel.retrieve_data()();
    let latitude = pythonData["Latitude"];
    let longitude = pythonData["Longitude"];
    var mapOptions = {
        center: [latitude, longitude],
        zoom: 40,
        watch: true,
    }

    map = new L.map('map', mapOptions);

    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    map.addLayer(layer);

    var myIcon = L.divIcon({ className: 'my-div-icon' });
    Marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(map)
        .bindPopup('Payload Position')
        .openPopup();
};

async function update() {
    pythonData = await eel.retrieve_data()();
    lat = pythonData["Latitude"];
    lng = pythonData["Longitude"];
    Marker.setLatLng([lat, lng]).update();
    map.panTo([lat, lng]);

    for (var key in pythonData) {
        var value = pythonData[key];
        document.getElementById(key).innerHTML = key + ': ' + value;
    }
}

async function get_time() {
    var clock = document.getElementById("clock");
    var time = new Date();
    var now = time.toLocaleString('en-US', { hour12: true })
    clock.innerHTML = now + " EST";
}


/* 
Let's get everything going!
*/

createMap();

/*
the interval for updating data is set to update every 1 seconds
*/

setInterval(get_time, 1000);
setInterval(update, 1000);