var infoWindows = [];
var queryNews= '';

$(document).ready(function() {

    function addCountries(map){
        $.getJSON('https://api.reliefweb.int/v1/disasters?appname=apidoc', function(disasters) {

            $.each(disasters.data, function(index, disaster) {

                $.getJSON(disaster.href, function (location) {

                    location.data.forEach(function (city){
                        console.log(city);
                        let location = city.fields.country[0].location;

                        addMarker(location.lat, location.lon, map, city);


                    });
                });
            });
        });
    }

    function addMarker(latitud, longitud, map, city){

        let objInfoWindow = new google.maps.InfoWindow({
            content: `<p>${city.fields.name}</p>
                <a href="secondPage.html">More Info</a>
                `


        });

        infoWindows.push(objInfoWindow);


        queryNews = objInfoWindow.content;



        var objMarker = new google.maps.Marker({
            position:{
                lat: latitud,
                lng: longitud,
            },
            map: map
        });





        objMarker.addListener('click', function(){
            infoWindows.forEach(function(items) {
                items.close();
            });
            objInfoWindow.open(map, objMarker);

            var citySaved= {
                id: city.fields.id,
                lat: city.fields.country[0].location.lat,
                lon: city.fields.country[0].location.lon,
                name: city.fields.name,
                description: city.fields.description

            };


            localStorage.setItem('city', JSON.stringify(citySaved));

        });
    }







    function initMap(latitude, longitude) {
        var mapCenter = { lat: latitude, lng: longitude };

        var map = new google.maps.Map($('#map')[0], {
            center: mapCenter,
            zoom: 2
        });

        addCountries(map);

    }






    initMap(0,0);

});



