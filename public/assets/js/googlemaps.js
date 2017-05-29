var map
var markers = []
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 60.192059, lng: 24.945831 },
    zoom: 11
  })
  google.maps.event.addListener(map, 'idle', function () {
    setMarkers(currentPlaces)
  })
}

function setMarkers (currentPlaces) {
  for (var i = 0; i < currentPlaces.length; i++) {
    var location = new google.maps.LatLng(currentPlaces[i].lat, currentPlaces[i].lng)
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      id: currentPlaces[i].id,
      title: currentPlaces[i].title,
      label: {
        text: currentPlaces[i].title,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: '10px'
      }
    })
    markers.push(marker)
   // marker.setMap(map)
  }
  for(var i=0; i<markers.length; i++) {
    markers[i].addListener('click', function() {
      openEdit(this.id)
    });
  }
}

function reloadMarkers () {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  markers = []
  setMarkers(currentPlaces)
}
