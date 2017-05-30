getPlaces(true, [], false, false, '')
var keywordsArr = []

function getPlaces (init, filterArr, onlyFavourites, onlyOpen, searchTerm) {
  var oReq = new XMLHttpRequest()
  onlyFavourites = onlyFavourites ? 1 : 0;
  onlyOpen = onlyOpen ? 1 : 0;
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      currentPlaces = xhr.response.data
      results.innerHTML = ''
      for (var i = 0; i < xhr.response.data.length; i++) {
        var favImage = ''
        if (xhr.response.data[i].favourite) {
          favImage = '<\/p><img src="assets/images/favourite.png" height="22" width="22"><\/img>'
        }

        results.innerHTML += '<li class=\"placeslist li_num_0_1\" onClick=\"openEdit(' + xhr.response.data[i].id + ');\"><a href=\"#\"><div id=\"openhours\"><p>' + (xhr.response.data[i].openfrom).slice(0, -3) + ' - ' + (xhr.response.data[i].opento).slice(0, -3) + '<\/p><\/div><div id=\"title\"><h4>' + xhr.response.data[i].title + '<\/h4><p>' + xhr.response.data[i].description + favImage + '<\/div></a><\/li>'

        if (filterArr.length === 0) {
          for (var k = 0; k < xhr.response.data[i].Keywords.length; k++) {
            if (!keywordsArr.includes(xhr.response.data[i].Keywords[k].label)) {
              keywordsArr.push(xhr.response.data[i].Keywords[k].label)
            }
          }
        }
      }
      if (filterArr.length === 0) {
        filters.innerHTML = ''
        for (i = 0; i < keywordsArr.length; i++) {
          filters.innerHTML += '<input type=\"checkbox\" name=\"' + keywordsArr[i] + '\" value=\"' + keywordsArr[i] + '\" onchange=\"toggleCheckbox(this)\"><label>' + keywordsArr[i] + '<\/label><br>'
        }
      }
      if (!init) {
        reloadMarkers()
      }
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }

  var url = '/api/v1/places?onlyfav=' + onlyFavourites + '&onlyopen=' + onlyOpen + '&keywords=' + filterArr + '&search=' + searchTerm

  oReq.open('GET', url, true)
  oReq.responseType = 'json'
  oReq.send()
}

function getPlace (id) {
  var keywords = document.getElementById('keywords')
  var addkeyword = document.getElementById('addkeyword')

  var oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      addkeyword.innerHTML = ''
      keywords.innerHTML = ''
      for (var i = 0; i < xhr.response.data.Keywords.length; i++) {
        keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"' + xhr.response.data.Keywords[i].id + '\"><br>'
      }

      fillModal(xhr.response.data)

      for (var i = 0; i < xhr.response.data.Keywords.length; i++) {
        document.getElementById(xhr.response.data.Keywords[i].id).value = xhr.response.data.Keywords[i].label
      }
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {

  }

  oReq.open('GET', '/api/v1/places/' + id, true)
  oReq.responseType = 'json'
  oReq.send()
}

function deletePlace () {
  var id = document.getElementById('id').value
  var oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      closeModal()
      reloadMarkers()
      getPlaces(false, filterArr, showfavourites, showopen, searchTerm)
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {

  }

  oReq.open('DELETE', '/api/v1/places/' + id, true)
  oReq.responseType = 'json'
  oReq.send()
}

function createPlace (placeObj) {
  var oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      closeModal()
      getPlaces(false, filterArr, showfavourites, showopen, searchTerm)
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {
  }

  oReq.open('POST', '/api/v1/places', true)
  oReq.setRequestHeader('Content-Type', 'application/json')
  oReq.responseType = 'json'
  oReq.send(JSON.stringify(placeObj))
}

function updatePlace (placeObj) {
  var oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      closeModal()
      flushModal()
      getPlaces(false, filterArr, showfavourites, showopen, searchTerm)
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {

  }

  oReq.open('PUT', '/api/v1/places/' + placeObj.id, true)
  oReq.responseType = 'json'
  oReq.setRequestHeader('Content-Type', 'application/json')
  oReq.send(JSON.stringify(placeObj))
}

function updateKeywordsForPlace (keywords, placeId) {
  var addKeywords = (function () {
    var xhr = []
    for (var i = 0; i < keywords.length; i++) {
      (function (i) {
        var keyword = {}
        keyword.label = keywords[i]
        xhr[i] = new XMLHttpRequest()
        xhr[i].open('POST', 'api/v1/' + placeId + '/keywords', true)
        xhr[i].setRequestHeader('Content-Type', 'application/json')
        xhr[i].onreadystatechange = function () {
          if (xhr[i].readyState === 4 && xhr[i].status === 200) {

          }
        }
        xhr[i].send(JSON.stringify(keyword))
      })(i)
    }
  })()
}

function fillModal (place) {
  document.getElementById('id').value = place.id
  document.getElementById('title').value = place.title
  document.getElementById('description').value = place.description
  document.getElementById('openfrom').value = place.openfrom
  document.getElementById('opento').value = place.opento
  document.getElementById('lat').value = place.lat
  document.getElementById('lng').value = place.lng
  document.getElementById('favourite').checked = place.favourite
}
