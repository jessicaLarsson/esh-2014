var map;
var homeMarker;

var myLatlng;
var centerLatlng;


function initialize() { 
  centerLatlng = new google.maps.LatLng(58.41075642311165, 15.621438785552755); //linkoping centrum
  myLatlng = centerLatlng; //set home position to centrum by default


  var styles = [
  {
    stylers: [
      { hue: "#4cd9c0" },
      { saturation: 20 },
      { lightness: 0  }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]
  }
];
  var mapOptions = {
    zoom: 13,
    center: centerLatlng,
    styles: styles
  }


  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  homeMarker = new google.maps.Marker({
      map: map,
      draggable:true,
      position: centerLatlng,
      icon: 'img/home-blue.png'
  });

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // does not update the global variable, why???
      homeMarker.setPosition(myLatlng);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


  var contentString = '<div id="content">'+
    '<div id="bodyContent">'+
    '<p>Din bostad</p>'+
    '</div>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  google.maps.event.addListener(homeMarker, 'click', function() {
    infowindow.open(map, homeMarker);
  });

  google.maps.event.addListener(homeMarker, 'mouseup', updatePos);
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    console.log('Error: The Geolocation service failed.');
  } else {
    console.log('Error: Your browser doesn\'t support geolocation.');
  }
}

function updatePos() {
  myLatlng = new google.maps.LatLng(homeMarker.getPosition().lat(), homeMarker.getPosition().lng());
}

google.maps.event.addDomListener(window, 'load', initialize);