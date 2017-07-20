var overlay = document.getElementById('overlay')
var filterArr = []
var showfavourites = false
var showopen = false
var searchTerm = ''
var saveCount = 0


function registerSession () {

  if(window.location.pathname === '/') {
    createSession()    
  } else {
    sessionKey = (window.location.pathname).replace(/\//g, '');
    getSession(sessionKey, function (err, data) {
      if(err) {
        console.log('error')
      } else {
        if (data) {
          saveCount = data.saveCount
          getPlaces(true, filterArr, showfavourites, showopen, searchTerm, true, sessionKey)
        } else {
          document.location.href='/';
        }
      }
    })
  }
}

function setSaveCount () {
  getSession(sessionKey, function (err, data) {
    if(err) {
      console.log('setSaveCount error')
    } else {
      saveCount = data.saveCount
    }
  })
}

function saveSession () {
  window.history.pushState("","", sessionKey); 
}

function openModal (id) {
  flushModal();
  if (!id) {
    document.getElementById('newPlaceKeywords').style.display = ''
    initializeModal();
  } else {
    document.getElementById('newPlaceKeywords').style.display = 'none'
    document.getElementById('kwpanel').style.display = ''
  }
  overlay.classList.remove('is-hidden')
}


function validate () {

  var valid = true;
  var validateElements = document.getElementsByClassName("validate");
  var inputs = Array.prototype.filter.call(validateElements, function(element){
    return element.nodeName === 'INPUT';
  });

  for(var i=0; i < inputs.length; i ++ ){
    var input = inputs[i];
    if(input.value.length == 0) {
      input.placeholder = "kindly enter value";
      input.classList.add("err");
      input.focus();
      valid = false;
      break;
    }
  }

  if (valid) {
    console.log('hyva')
    addOrEditPlace();
  }

}

function initializeModal () {
  // console.log('initializeModal AJETTU')
  // document.getElementById('id').value = ''
  document.getElementById('title').value = 'Place no. ' + saveCount
  document.getElementById('description').value = 'Description of place no. ' + saveCount
  document.getElementById('openfrom').value = '09:00:00'
  document.getElementById('opento').value = '17:00:00'
  document.getElementById('lat').value = ''
  document.getElementById('lng').value = ''
}

function closeModal () {
  overlay.classList.add('is-hidden')
  // flushModal()
  // getPlaces(true, filterArr, showfavourites, showopen, searchTerm)
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

function flushModal () {
  document.getElementById('id').value = ''
  document.getElementById('title').value = ''
  document.getElementById('description').value = ''
  document.getElementById('openfrom').value = ''
  document.getElementById('opento').value = ''
  document.getElementById('lat').value = ''
  document.getElementById('lng').value = ''
  // document.getElementById('keyword').value = ''
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

(function () {
  function checkTime (i) {
    return (i < 10) ? '0' + i : i
  }

  function startTime () {
    var today = new Date(),
      h = checkTime(today.getHours()),
      m = checkTime(today.getMinutes()),
      s = checkTime(today.getSeconds())
    document.getElementById('time').innerHTML = h + ':' + m + ':' + s
    t = setTimeout(function () {
      startTime()
    }, 500)
  }
  startTime()
})()

function getKeywords () {
  var keywords = []
  for (var i = 0; i < document.getElementsByName('keyword').length; i++) {
    if ((document.getElementsByName('keyword')[i].value).length > 0) {
      keywords.push(document.getElementsByName('keyword')[i].value)
    }
  }
  return keywords
}

function toggleCheckbox (element) {
  if (filterArr.includes(element.value)) {
    filterArr.remove(element.value)
  } else {
    filterArr.push(element.value)
  }
  getPlaces(false, filterArr, showfavourites, showopen, searchTerm, true, this.response.data.sessionKey)
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

function checkIfEmpty (esa) {
  console.log('checkIfEmpty')
  if (esa.value.length > 0) {
    document.getElementById('addkeywordbtn').disabled = false
  } else {
    document.getElementById('addkeywordbtn').disabled = true
  }
}
var counter = 0;
function addKeyword () {

  document.getElementById("keyword").setAttribute("id", 'keyword-' + counter++);

  var placeObj = getAllFields()
  var keywords = getKeywords()

  var keywordId = document.getElementsByName("keyword")[0].id
  var keywordValue = document.getElementsByName("keyword")[0].value

  /*
  var input = document.createElement("input");
  var br = document.createElement("br");
  input.type = "text";
  // input.className = "css-class-name"; // set the CSS class
  input.name = 'keyword'
  input.id = 'keyword'
  console.log('jotai', this)
  input.setAttribute('onkeyup','checkIfEmpty(this)')
  newPlaceKeywords.appendChild(br)
  newPlaceKeywords.appendChild(input); // put it into the DOM
  // updateKeywordsForPlace(keywords, placeObj.id)

  */
  //console.log('lokki', document.getElementById('keyword').id)

  var x = new MyImage(keywordValue, keywordId);
  document.getElementById("screen").appendChild(x.getImage());
  document.getElementById(keywordId).value = ''
  

}

function getIdForKeyword () {
  return document.getElementById('keyword').id + 1 || 0
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

function openEdit (id) {
  getPlace(id)
  openModal(id)
}

function addOrEditPlace () {
  var placeObj = getAllFields()
  var keywords = getKeywords()

  if (placeObj.id === undefined) {
    placeObj.sessionKey = sessionKey
    createPlace(placeObj)
  } else {
    updatePlace(placeObj)
    updateKeywordsForPlace(keywords, placeObj.id)
    closeModal()
  }
}

function removePlace () {
  deletePlace()
  flushModal()
}

function extras (element) {
  if (element.id === 'showfavourites') {
    showfavourites = element.checked
  }
  if (element.id === 'showopen') {
    showopen = element.checked
  }
  getPlaces(false, filterArr, showfavourites, showopen, searchTerm, true, this.response.data.sessionKey)
}

function search () {
  searchTerm = document.getElementById('search').value
  getPlaces(false, filterArr, showfavourites, showopen, searchTerm, true, this.response.data.sessionKey)
}

function resetSearch () {
  searchTerm = ''
  getPlaces(false, filterArr, showfavourites, showopen, searchTerm, true, this.response.data.sessionKey)
}














var data = ["http://cdn.cutestpaw.com/wp-content/uploads/2011/11/cute-cat-l.jpg"]

/*
var MyImage = function (url, id) {
    this.url = url;
    this.id = id;
};
*/

function MyImage (inputValue, id) {
  console.log('inputValue JA ID', inputValue, id)
  this.inputValue = inputValue;
  this.id = id;
}

MyImage.prototype.getImage = function () {

  // <input type="text" name="keyword" id="keyword" onkeyup="checkIfEmpty(this)">

    var s = document.createElement('span');
    s.id = "myImage" + this.id;
    var i = document.createElement('input');
    var br = document.createElement("br");
    i.name = "keyword"
    i.readOnly = true
    i.value = this.inputValue
    s.appendChild(br)
    s.appendChild(i);
    var c = document.createElement('img');
    c.src = "https://www.flooranddecor.com/on/demandware.static/Sites-floor-decor-Site/Sites-floor-decor-Library/default/v1414669733935/images/close-icon-grey.png";
    c.className = "close";
    c.onclick = function () {
        var d = document.getElementById("myImage" + this.id);
        var s = document.getElementById("screen");
        if (d !== null && s !== null) {
            console.log("removing " + d.id);
            s.removeChild(d);
        }
    }.bind(this);
    s.appendChild(c);
    return s;

/*

  

    var s = document.createElement('span');
    s.id = "myImage" + this.id;
    var i = document.createElement('img');
    i.src = this.url;
    i.width = 150;
    i.height = 150;
    s.appendChild(i);
    var c = document.createElement('img');
    c.src = "https://www.flooranddecor.com/on/demandware.static/Sites-floor-decor-Site/Sites-floor-decor-Library/default/v1414669733935/images/close-icon-grey.png";
    c.className = "close";
    c.onclick = function () {
        var d = document.getElementById("myImage" + this.id);
        var s = document.getElementById("screen");
        if (d !== null && s !== null) {
            console.log("removing " + d.id);
            s.removeChild(d);
        }
    }.bind(this);
    s.appendChild(c);
    return s;

*/
};


