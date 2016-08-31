$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }
  
  var findCoords = function(name, type){
    for(var i = 0; i < type.length; i++){
      if(type[i].name === name){
        return type[i].place.location;
      }
    }
  };
  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);
}

function initializeOptions(){
  hotels.forEach(function(hotel){
    $('#hotel-choices').append('<option>' + hotel.name + '</option>');
  });
    restaurants.forEach(function(restaurant){
    $('#restaurant-choices').append('<option>' + restaurant.name + '</option>');
  });
  activities.forEach(function(activity){
    $('#activity-choices').append('<option>' + activity.name + '</option>');
  });

});

$(function addToItinerary(){
  $('#hotel-btn').on('click', function(){
    var selectedHotel = $('#hotel-choices').find(':selected').text();
    $('#hotel-pick').append('<span class="title">' + selectedHotel + '</span> <button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    console.log(findCoords(selectedHotel, hotels));
    drawMarker('hotel', findCoords(selectedHotel, hotels));
  });
  $('#restaurant-btn').on('click', function(){
    var selectedRestaurant = $('#restaurant-choices').find(':selected').text();
    $('#restaurant-picks').append('<span class="title">' + selectedRestaurant + '</span> <button class="btn btn-xs btn-danger remove btn-circle">x</button>');
  });
  $('#activities-btn').on('click', function(){
    var selectedActivity = $('#activity-choices').find(':selected').text();
    $('#activity-picks').append('<span class="title">' + selectedActivity + '</span> <button class="btn btn-xs btn-danger remove btn-circle">x</button>');
  });
});

$();

