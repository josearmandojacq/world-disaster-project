$(document).ready(function() {
    var city = JSON.parse(localStorage.getItem('city'));
    console.log(city);

    $('main').append(`
    <h1> ${city.name} </h1>
    <section class="map">
        <div id="map" ></div>
      
    <div id="infoContainer">
        <h3>Info</h3>
        <br>
        <p class="infoText">${city.description}</p>
    </div>
    </section>
`);



    initMap(city.lat, city.lon);

    function initMap(latitude, longitude) {
        var mapCenter = {lat: latitude, lng: longitude};

        var map = new google.maps.Map($('#map')[0], {
            center: mapCenter,
            zoom: 7
        });
        var objMarker = new google.maps.Marker({
            position: mapCenter,
            map: map
        });


    }
});