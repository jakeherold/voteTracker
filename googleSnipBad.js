//OLD
  var panorama;

function initializeBad(){
  console.log("INITIALIZE IS FIRING")

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('street-view'),
    {
      position: {lat:32.2989, lng: 90.1847},
      pov: {heading:165, pitch: 0},
      zoom: 1
    });
}

