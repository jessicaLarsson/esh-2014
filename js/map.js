function mapFile(){

  var map; //the map
  var homeMarker; //marker in the users location
  var myLatlng; //user home location
  var centerLatlng; //location of Linkoping centrum
  var markerArray = [];
  var distanceArray = [];

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

    addSchoolMarker(58.41075642311165, 15.621438785552755);
    hideSchoolMarker(58.41075642311165, 15.621438785552755);
    showSchoolMarker(58.41075642311165, 15.621438785552755);

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
    google.maps.event.addListener(homeMarker, 'mouseup', updateUserPos);
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
  function updateUserPos() {
    myLatlng = new google.maps.LatLng(homeMarker.getPosition().lat(), homeMarker.getPosition().lng());
    updateDistances();
    alert(distanceArray[0]);
  }

  /* Adds a marker to the map and to the marker array at the given lat lon position */
  function addSchoolMarker(lat, lon){
    pos = new google.maps.LatLng(lat, lon); 
    var marker = new google.maps.Marker({
        map: map,
        draggable:true,
        position: pos
    });
    markerArray.push(marker);
    distanceArray.push(calculateDistance(markerArray[0].getPosition(), myLatlng));
  }

  /* Hides the marker at the given lat lon position in the map */
  function hideSchoolMarker(lat, lon){
    for(i = 0; i < markerArray.length; i++){
      if(markerArray[i].getPosition().lat() == lat && markerArray[i].getPosition().lng() == lon){
        markerArray[i].setVisible(false);
        break;
      }
    }
  }

  /* Shows the marker at the given lat lon position in the map */
  function showSchoolMarker(lat, lon){
    for(i = 0; i < markerArray.length; i++){
      if(markerArray[i].getPosition().lat() == lat && markerArray[i].getPosition().lng() == lon){
        markerArray[i].setVisible(true);
        break;
      }
    }
  }

function calculateDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  function rad(x) {
    return x * Math.PI / 180;
  };

  function updateDistances(){
    for(i = 0; i < markerArray.length; i++){
      distanceArray[i] = calculateDistance(markerArray[0].getPosition(), myLatlng);
    }
  }

this.getDistance = function(lat, lon) {
  console.log(lat + " " + lon);
  for(i = 0; i < markerArray.length; i++){
    if(markerArray[i].getPosition().lat() == lat && markerArray[i].getPosition().lng() == lon){
      return distanceArray[i];
    }
  }
}

  google.maps.event.addDomListener(window, 'load', initialize);
}