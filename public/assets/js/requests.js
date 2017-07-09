var sessionKey = ''
registerSession();
//getPlaces(true, [], false, false, '')
var keywordsArr = []
var currentPlaces = {}


function getPlaces (init, filterArr, onlyFavourites, onlyOpen, searchTerm, updateFilters, sessionKey) {
  onlyFavourites = onlyFavourites ? 1 : 0
  onlyOpen = onlyOpen ? 1 : 0 
  var url = '/api/v1/places?onlyfav=' + onlyFavourites + '&onlyopen=' + onlyOpen + '&keywords=' + filterArr + '&search=' + searchTerm + '&sessionKey=' + sessionKey
  
  genericXhrReq('GET', url).onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      currentPlaces = this.response.data
      results.innerHTML = ''
      
      if(updateFilters) {
        keywordsArr = []
      }

      for (var i = 0; i < this.response.data.length; i++) {
        var favImage = ''
        if (this.response.data[i].favourite) {
          favImage = '<\/p><img src="assets/images/favourite.png" height="22" width="22"><\/img>'
        }

        results.innerHTML += '<li class=\"placeslist li_num_0_1\" onClick=\"openEdit(' + this.response.data[i].id + ');\"><a href=\"#\"><div id=\"openhours\"><p>' + (this.response.data[i].openfrom).slice(0, -3) + ' - ' + (this.response.data[i].opento).slice(0, -3) + '<\/p><\/div><div id=\"title\"><h4>' + this.response.data[i].title + '<\/h4><p>' + this.response.data[i].description + favImage + '<\/div></a><\/li>'

        if (filterArr.length === 0) {
          for (var k = 0; k < this.response.data[i].Keywords.length; k++) {
            if (!keywordsArr.includes(this.response.data[i].Keywords[k].label)) {
              keywordsArr.push(this.response.data[i].Keywords[k].label)
            }
          }
        }
      }
      filters.innerHTML = ''
      for (i = 0; i < keywordsArr.length; i++) {
        filters.innerHTML += '<input type=\"checkbox\" name=\"' + keywordsArr[i] + '\" value=\"' + keywordsArr[i] + '\" onchange=\"toggleCheckbox(this)\"><label>' + keywordsArr[i] + '<\/label><br>'
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
    if (this.readyState === 4 && this.status === 200) {
      keywords.innerHTML = ''
      for (var i = 0; i < this.response.data.Keywords.length; i++) {
        keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"' + this.response.data.Keywords[i].id + '\" readonly><input type=\"button\" id=\"deletekeywordbtn\" onclick=\"deleteKeyword(' + id + ',' + this.response.data.Keywords[i].id + ');\" value=\"x\"\/><br>'
      }

      keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"keyword\" onkeyup=\"checkIfEmpty(this)\"\/><br>'
      fillModal(this.response.data)

      for (var i = 0; i < this.response.data.Keywords.length; i++) {
        document.getElementById(this.response.data.Keywords[i].id).value = this.response.data.Keywords[i].label
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
    if (this.readyState === 4 && this.status === 200) {
      closeModal()
      getPlaces(false, filterArr, showfavourites, showopen, searchTerm, true, this.response.data.sessionKey)
      document.getElementsByName('saveOption')[0].disabled = false;
    }
  }
}

function updatePlace (placeObj) {
  var url = '/api/v1/places/' + placeObj.id
  genericXhrReq('PUT', url, placeObj).onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      closeModal()
      getPlaces(true, filterArr, showfavourites, showopen, searchTerm, true)
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
    if (this.readyState === 4 && this.status === 200) {
      getPlace(placeId)
    }
  }
}

function createSession () {
  var url = '/api/v1/sessions'
  genericXhrReq('GET', url).onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      sessionKey = this.response.data.sessionKey
      getPlaces(true, filterArr, showfavourites, showopen, searchTerm, true, sessionKey)
    }
  }
}

function checkIfExists (sessionKey, callback) {
  var url = '/api/v1/sessions/' + sessionKey
  genericXhrReq('GET', url).onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(null, this.response.data)
    }
  }
}

function genericXhrReq (httpVerb, url, dataObj) {
  var xhr = new XMLHttpRequest()
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
