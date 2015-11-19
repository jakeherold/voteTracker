//OLD
  var panorama;

function initialize(){
  console.log("INITIALIZE IS FIRING")

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'),
    {
      position: {lat:40.7143528, lng: -74.0059731},
      pov: {heading:165, pitch: 0},
      zoom: 1
    });
}

