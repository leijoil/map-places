var overlay = document.getElementById('overlay')
var filterArr = []

function openModal (id) {
  overlay.classList.remove('is-hidden')
}

function closeModal () {
  overlay.classList.add('is-hidden')
  flushModal()
}

function getAllFields () {
  var placeObj = {}
  placeObj.id = document.getElementById('id').value || undefined
  placeObj.title = document.getElementById('title').value
  placeObj.description = document.getElementById('description').value
  placeObj.openfrom = document.getElementById('openfrom').value
  placeObj.opento = document.getElementById('opento').value
  placeObj.lat = document.getElementById('lat').value
  placeObj.lng = document.getElementById('lng').value
  placeObj.favourite = document.getElementById('favourite').checked ? 1 : 0
  return placeObj
}

function getKeywords () {
  var keywords = []
  for (var i = 0; i < document.getElementsByName('keyword').length; i++) {
    keywords.push(document.getElementsByName('keyword')[i].value)
  }
  return keywords
}

function toggleCheckbox (element) {
  if (filterArr.includes(element.value)) {
    filterArr.remove(element.value)
  } else {
    filterArr.push(element.value)
  }
  getPlaces(false, filterArr)
}

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}

function addKeyword () {
  document.getElementById('addkeyword').innerHTML += '<input type=\"text\" name=\"keyword\" id=\"\"><br>'
}

function chooseLocation () {
  google.maps.event.addListener(map, 'click', function (event) {
    var latitude = event.latLng.lat()
    var longitude = event.latLng.lng()
    openModal()
    document.getElementById('title').value = placeObj.title
    document.getElementById('description').value = placeObj.description
    document.getElementById('openfrom').value = placeObj.openfrom
    document.getElementById('opento').value = placeObj.opento
    document.getElementById('lat').value = latitude
    document.getElementById('lng').value = longitude
  })
  var placeObj = getAllFields()
  closeModal()
}

function flushModal () {
  document.getElementById('id').value = ''
  document.getElementById('title').value = ''
  document.getElementById('description').value = ''
  document.getElementById('openfrom').value = ''
  document.getElementById('opento').value = ''
  document.getElementById('lat').value = ''
  document.getElementById('lng').value = ''
}

function openEdit (id) {
  getPlace(id)
  openModal(id)
}

function addOrEditPlace () {
  var placeObj = getAllFields()
  var keywords = getKeywords()
  if (placeObj.id === undefined) {
    createPlace(placeObj)
  } else {
    updatePlace(placeObj)
    updateKeywordsForPlace(keywords, placeObj.id)
  }
}

function removePlace () {
  deletePlace()
  flushModal()
}

function placeMarker (location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  })
}