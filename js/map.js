var map; //the map
var homeMarker; //marker in the users location
var myLatlng; //user home location
var centerLatlng; //location of Linkoping centrum


function initialize() { 
  centerLatlng = new google.maps.LatLng(58.41075642311165, 15.621438785552755); //linkoping centrum
  myLatlng = centerLatlng; //set user location to centrum by default

  /* Map style */
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

  /* Create the map */
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  /* Home marker */
  homeMarker = new google.maps.Marker({
      map: map,
      draggable:true,
      position: centerLatlng,
      icon: 'img/home-blue.png'
  });

  /* Use the users current location */
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

  /*Content displayed in homwmarker tooltip*/
  var contentString = '<div id="content">'+
    '<div id="bodyContent">'+
    '<p>Din bostad</p>'+
    '</div>'+
    '</div>';

  /* setting content to tooltip/infowindow */
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  /* Adding tooltip/infowindow to homeMarker, display when clicking the marker */
  google.maps.event.addListener(homeMarker, 'click', function() {
    infowindow.open(map, homeMarker);
  });

  /* After moving the marker (on mouseup), run updatePos function */
  google.maps.event.addListener(homeMarker, 'mouseup', updatePos);
}

/* If geolocation fails - print console message */
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    console.log('Error: The Geolocation service failed.');
  } else {
    console.log('Error: Your browser doesn\'t support geolocation.');
  }
}

/* When moving the user location marker (homeMarker) the location variable is updated */
function updatePos() {
  myLatlng = new google.maps.LatLng(homeMarker.getPosition().lat(), homeMarker.getPosition().lng());
}

google.maps.event.addDomListener(window, 'load', initialize);