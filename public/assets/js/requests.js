getPlaces(true, [], false, false, '')
var keywordsArr = []

function getPlaces (init, filterArr, onlyFavourites, onlyOpen, searchTerm) {
  onlyFavourites = onlyFavourites ? 1 : 0
  onlyOpen = onlyOpen ? 1 : 0
  var url = '/api/v1/places?onlyfav=' + onlyFavourites + '&onlyopen=' + onlyOpen + '&keywords=' + filterArr + '&search=' + searchTerm
  genericXhrReq('GET', url).onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
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
    }
  }
}

function getPlace (id) {
  var keywords = document.getElementById('keywords')
  var url = '/api/v1/places/' + id
  genericXhrReq('GET', url).onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      keywords.innerHTML = ''
      for (var i = 0; i < xhr.response.data.Keywords.length; i++) {
        keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"' + xhr.response.data.Keywords[i].id + '\" readonly><input type=\"button\" id=\"deletekeywordbtn\" onclick=\"deleteKeyword(' + id + ',' + xhr.response.data.Keywords[i].id + ');\" value=\"x\"\/><br>'
      }

      keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"keyword\" onkeyup=\"checkIfEmpty(this)\"\/><br>'
      fillModal(xhr.response.data)

      for (var i = 0; i < xhr.response.data.Keywords.length; i++) {
        document.getElementById(xhr.response.data.Keywords[i].id).value = xhr.response.data.Keywords[i].label
      }
    }
  }
}

function deletePlace () {
  var id = document.getElementById('id').value
  var url = '/api/v1/places/' + id
  genericXhrReq('DELETE', url).onreadystatechange = function () {
    closeModal()
    reloadMarkers()
    getPlaces(false, filterArr, showfavourites, showopen, searchTerm)
  }
}

function createPlace (placeObj) {
  var url = '/api/v1/places'
  genericXhrReq('POST', url, placeObj).onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      closeModal()
      getPlaces(false, filterArr, showfavourites, showopen, searchTerm)
    }
  }
}

function updatePlace (placeObj) {
  var url = '/api/v1/places/' + placeObj.id
  genericXhrReq('PUT', url, placeObj).onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      closeModal()
      flushModal()
      getPlaces(false, filterArr, showfavourites, showopen, searchTerm)
    }
  }
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
            getPlace(placeId)
          }
        }
        xhr[i].send(JSON.stringify(keyword))
      })(i)
    }
  })()
}

function deleteKeyword (placeId, keywordId) {
  var url = '/api/v1/' + placeId + '/' + keywordId + '/keywords'
  genericXhrReq('DELETE', url).onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      getPlace(placeId)
    }
  }
}

function genericXhrReq (httpVerb, url, dataObj) {
  xhr = new XMLHttpRequest()
  xhr.open(httpVerb, url, true)
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/json')
  if (dataObj) {
    xhr.send(JSON.stringify(dataObj))
  } else {
    xhr.send()
  }
  return xhr
}
