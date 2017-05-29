esaksi(true, [])
var keywordsArr = []

function esaksi (init, filterArr) {
    // var results = document.getElementById('results')
  var toReadyStateDescription = function (state) {
    switch (state) {
      case 0:
        return 'UNSENT'
      case 1:
        return 'OPENED'
      case 2:
        return 'HEADERS_RECEIVED'
      case 3:
        return 'LOADING'
      case 4:
        return 'DONE'
      default:
        return ''
    }
  }
  var bustCache = '?' + new Date().getTime(),
    oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      currentPlaces = xhr.response.data

      results.innerHTML = ''

      for (i = 0; i < xhr.response.data.length; i++) {
        var favImage = ''
        if (xhr.response.data[i].favourite) {
          favImage = '<\/p><img src="test.png" height="22" width="22"><\/img>'
        }

        results.innerHTML += '<li class=\"list_shopping li_num_0_1\" onClick=\"openEdit(' + xhr.response.data[i].id + ');\"><a href=\"#\"><div class=\"col_md_1_list\"><p>' + (xhr.response.data[i].openfrom).slice(0, -3) + ' - ' + (xhr.response.data[i].opento).slice(0, -3) + '<\/p><\/div><div class=\"col_md_2_list\"><h4>' + xhr.response.data[i].title + '<\/h4><p>' + xhr.response.data[i].description + favImage + '<\/div></a><\/li>'

        if (filterArr.length === 0) {
          for (k = 0; k < xhr.response.data[i].Keywords.length; k++) {
            if (!keywordsArr.includes(xhr.response.data[i].Keywords[k].label)) {
              keywordsArr.push(xhr.response.data[i].Keywords[k].label)
            }
          }
        }
      }

      if (filterArr.length === 0) {
        filters.innerHTML = ''
        for (i = 0; i < keywordsArr.length; i++) {
          filters.innerHTML += '<li><input type=\"checkbox\" name=\"' + keywordsArr[i] + '\" value=\"' + keywordsArr[i] + '\" onchange=\"toggleCheckbox(this)\">' + keywordsArr[i] + ' <\/li>'
        }
      }

      if (!init) {
        reloadMarkers()
      }
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {
  }

  if (filterArr.length > 0) {
    var url = '/api/v1/places?label=' + filterArr
  } else {
    var url = '/api/v1/places'
  }

  oReq.open('GET', url, true)
  oReq.responseType = 'json'
  oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0')
  oReq.send()
};

function getPlaceById (id) {
  var keywords = document.getElementById('keywords')
  var addkeyword = document.getElementById('addkeyword')
  var toReadyStateDescription = function (state) {
    switch (state) {
      case 0:
        return 'UNSENT'
      case 1:
        return 'OPENED'
      case 2:
        return 'HEADERS_RECEIVED'
      case 3:
        return 'LOADING'
      case 4:
        return 'DONE'
      default:
        return ''
    }
  }
  var bustCache = '?' + new Date().getTime(),
    oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      addkeyword.innerHTML = ''
      keywords.innerHTML = ''
      for (i = 0; i < xhr.response.data.Keywords.length; i++) {
        keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"' + xhr.response.data.Keywords[i].id + '\"><br>'
      }

      document.getElementById('id').value = xhr.response.data.id
      document.getElementById('title').value = xhr.response.data.title
      document.getElementById('description').value = xhr.response.data.description
      document.getElementById('openfrom').value = xhr.response.data.openfrom
      document.getElementById('opento').value = xhr.response.data.opento
      document.getElementById('lat').value = xhr.response.data.lat
      document.getElementById('lng').value = xhr.response.data.lng
      document.getElementById('favourite').checked = xhr.response.data.favourite

      for (i = 0; i < xhr.response.data.Keywords.length; i++) {
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
  oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0')
  oReq.send()
}

function deletePlaceFromDb () {
  var id = document.getElementById('id').value

  toReadyStateDescription = function (state) {
    switch (state) {
      case 0:
        return 'UNSENT'
      case 1:
        return 'OPENED'
      case 2:
        return 'HEADERS_RECEIVED'
      case 3:
        return 'LOADING'
      case 4:
        return 'DONE'
      default:
        return ''
    }
  }
  var bustCache = '?' + new Date().getTime(),
    oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      closeModal()
      reloadMarkers()
      esaksi(false, [])
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {

  }

  oReq.open('DELETE', '/api/v1/places/' + id, true)
  oReq.responseType = 'json'
  oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0')
  oReq.send()
}

function createNewPlace (placeObj) {
  toReadyStateDescription = function (state) {
    switch (state) {
      case 0:
        return 'UNSENT'
      case 1:
        return 'OPENED'
      case 2:
        return 'HEADERS_RECEIVED'
      case 3:
        return 'LOADING'
      case 4:
        return 'DONE'
      default:
        return ''
    }
  }
  var bustCache = '?' + new Date().getTime(),
    oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      closeModal()
      esaksi(false, [])
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {
  }

  oReq.open('POST', '/api/v1/places', true)
  oReq.responseType = 'json'
  oReq.setRequestHeader('Content-Type', 'application/json')
  oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0')
  oReq.send(JSON.stringify(placeObj))
}

function updatePlace (placeObj) {
  toReadyStateDescription = function (state) {
    switch (state) {
      case 0:
        return 'UNSENT'
      case 1:
        return 'OPENED'
      case 2:
        return 'HEADERS_RECEIVED'
      case 3:
        return 'LOADING'
      case 4:
        return 'DONE'
      default:
        return ''
    }
  }
  var bustCache = '?' + new Date().getTime(),
    oReq = new XMLHttpRequest()
  oReq.onload = function (e) {
    var xhr = e.target

    if (xhr.responseType === 'json') {
      closeModal()
      flushModal()
      esaksi(false, [])
    } else {
      results.innerHTML = JSON.parse(xhr.responseText).data
    }
  }
  oReq.onreadystatechange = function () {

  }

  oReq.open('PUT', '/api/v1/places/' + placeObj.id, true)
  oReq.responseType = 'json'
  oReq.setRequestHeader('Content-Type', 'application/json')
  oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0')
  oReq.send(JSON.stringify(placeObj))
}

function updateKeywordsForPlace (keywords, placeId) {
  var addKeywords = (function () {
    var xhr = []
    for (i = 0; i < keywords.length; i++) {
      (function (i) {
        var keyword = {}
        keyword.label = keywords[i]
        xhr[i] = new XMLHttpRequest()
        xhr[i].open('POST', 'api/v1/' + placeId + '/keywords', true)
        xhr[i].setRequestHeader('Content-Type', 'application/json')
        xhr[i].onreadystatechange = function () {
          if (xhr[i].readyState == 4 && xhr[i].status == 200) {

          }
        }
        xhr[i].send(JSON.stringify(keyword))
      })(i)
    }
  })()
}
