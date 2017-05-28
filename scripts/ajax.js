esaksi(true, []);
var keywordsArr = []

function esaksi (init, filterArr) {
    console.log('esaksi', filterArr)
    //var results = document.getElementById('results')
    var toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
        };
        var bustCache = '?' + new Date().getTime(),
            oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            //console.log('Inside the onload event');
            //console.log('THIS IS: ', e.target)
            if (xhr.responseType === 'json') {
                // results.innerHTML = xhr.response.data;
                currentPlaces = xhr.response.data;

                results.innerHTML = '';
                // filters.innerHTML = '';

                for (i = 0; i < xhr.response.data.length; i++) {

                    results.innerHTML += '<li class=\"list_shopping li_num_0_1\" onClick=\"openEdit('+ xhr.response.data[i].id +');\"><a href=\"#\"><div class=\"col_md_1_list\"><p>' + (xhr.response.data[i].openfrom).slice(0, -3) + ' - ' + (xhr.response.data[i].opento).slice(0, -3) + '<\/p><\/div><div class=\"col_md_2_list\"><h4>' + xhr.response.data[i].title + '<\/h4><p>'+  xhr.response.data[i].description  +'<\/p><\/div></a><\/li>'

                    //console.log(xhr.response.data[i].Keywords)

                    if(filterArr.length === 0) {

                        for (k = 0; k < xhr.response.data[i].Keywords.length; k++) {
                            if(!keywordsArr.includes(xhr.response.data[i].Keywords[k].label)) {
                                //console.log(keywordsArr.push(xhr.response.data[i].Keywords[k].label))
                                keywordsArr.push(xhr.response.data[i].Keywords[k].label)
                            }
                        }
                    }

                }
                
                    console.log('keywordsArr ', keywordsArr);

                    if(filterArr.length === 0) {
                        filters.innerHTML = '';
                        for (i = 0; i < keywordsArr.length; i++) {
                            filters.innerHTML += '<li><input type=\"checkbox\" name=\"' + keywordsArr[i] + '\" value=\"' + keywordsArr[i] + '\" onchange=\"toggleCheckbox(this)\">' +keywordsArr[i] + ' <\/li>'
                            //console.log('results.innerHTML ', results.innerHTML);
                        }
                    }
                
                
                if (!init) {
                  reloadMarkers();
                }
                
                
            } else {
              //console.log('ELSE')
                results.innerHTML = JSON.parse(xhr.responseText).data;
            }
        };
        oReq.onreadystatechange = function () {
            //console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };

        //var params = filterArr.toString();
        console.log(filterArr);
        if(filterArr.length > 0) {
            var url = '/api/v1/places?label=' + filterArr
        } else {
            var url = '/api/v1/places'
        }
        
        oReq.open('GET', url, true);
        oReq.responseType = 'json';
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send();

};

function getPlaceById (id) {

        // console.log('IIDEE', id)
        var keywords = document.getElementById('keywords');
        var addkeyword = document.getElementById('addkeyword');
        var toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
        };
        var bustCache = '?' + new Date().getTime(),
            oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            //console.log('Inside the onload event');
            //console.log('THIS IS: ', e.target)
            if (xhr.responseType === 'json') {
                // results.innerHTML = xhr.response.data;
            console.log('JEAA',xhr.response.data.Keywords)

            addkeyword.innerHTML = '';
            keywords.innerHTML = '';
            for (i = 0; i < xhr.response.data.Keywords.length; i++) { 
                keywords.innerHTML += '<input type=\"text\" name=\"keyword\" id=\"' + xhr.response.data.Keywords[i].id + '\"><br>';
                //document.getElementById(xhr.response.data.Keywords[i].id).value = xhr.response.data.Keywords[i].label
            }
            
            console.log('keywords.innerHTML ', keywords.innerHTML)
                
            document.getElementById("id").value = xhr.response.data.id;
            document.getElementById("title").value = xhr.response.data.title;
            document.getElementById("description").value = xhr.response.data.description;
            document.getElementById("openfrom").value = xhr.response.data.openfrom;
            document.getElementById("opento").value = xhr.response.data.opento;
            document.getElementById("lat").value = xhr.response.data.lat;
            document.getElementById("lng").value = xhr.response.data.lng;
            
            for (i = 0; i < xhr.response.data.Keywords.length; i++) { 
            
                document.getElementById(xhr.response.data.Keywords[i].id).value = xhr.response.data.Keywords[i].label

            }
                
            } else {
              //console.log('ELSE')
                results.innerHTML = JSON.parse(xhr.responseText).data;
            }
        };
        oReq.onreadystatechange = function () {
            //console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };

        oReq.open('GET', '/api/v1/places/' + id, true);
        oReq.responseType = 'json';
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send();

}



function deletePlaceFromDb () {
	//console.log('DELETE: ',document.getElementById("id").value)
    var id = document.getElementById("id").value;

       //console.log('IIDEE', id)
        toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
        };
        var bustCache = '?' + new Date().getTime(),
            oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            //console.log('Inside the onload event');
            //console.log('THIS IS: ', e.target)
            if (xhr.responseType === 'json') {
                // results.innerHTML = xhr.response.data;
                console.log('DEL-ID: ', id)
                closeModal();
                //removeSingleMarker(id);
                reloadMarkers();
                // removeMarkers();
                esaksi(false, []);
            } else {
              //console.log('ELSE')
                results.innerHTML = JSON.parse(xhr.responseText).data;
            }
        };
        oReq.onreadystatechange = function () {
            //console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };

        oReq.open('DELETE', '/api/v1/places/' + id, true);
        oReq.responseType = 'json';
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send();
}

function createNewPlace (placeObj) {

       
        toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
        };
        var bustCache = '?' + new Date().getTime(),
            oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            //console.log('Inside the onload event');
            //console.log('THIS IS: ', e.target)
            if (xhr.responseType === 'json') {
                // results.innerHTML = xhr.response.data;
                closeModal()
                esaksi(false, []);
            } else {
              //console.log('ELSE')
                results.innerHTML = JSON.parse(xhr.responseText).data;
            }
        };
        oReq.onreadystatechange = function () {
            //console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };

        //console.log('AJAXJS', placeObj)

        oReq.open('POST', '/api/v1/places', true);
        oReq.responseType = 'json';
        oReq.setRequestHeader("Content-Type", "application/json");
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send(JSON.stringify(placeObj));
        //oReq.send();

}

function updatePlace (placeObj) {

        toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
        };
        var bustCache = '?' + new Date().getTime(),
            oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            //console.log('Inside the onload event');
            //console.log('THIS IS: ', e.target)
            if (xhr.responseType === 'json') {
                // results.innerHTML = xhr.response.data;
                closeModal()
                flushModal()
                esaksi(false, []);
            } else {
              //console.log('ELSE')
                results.innerHTML = JSON.parse(xhr.responseText).data;
            }
        };
        oReq.onreadystatechange = function () {
            //console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };

        //console.log('AJAXJS', placeObj)

        oReq.open('PUT', '/api/v1/places/' + placeObj.id, true);
        oReq.responseType = 'json';
        oReq.setRequestHeader("Content-Type", "application/json");
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send(JSON.stringify(placeObj));
        //oReq.send();

}


function updateKeywordsForPlace (keywords, placeId) {

    console.log('updateKeywordsForPlace')

    var addKeywords = (function(){
        var xhr = [];
        for (i = 0; i < keywords.length; i++){
            (function (i){
                var keyword = {}
                keyword.label = keywords[i];
                //console.log('KW ', keyword)
                xhr[i] = new XMLHttpRequest();
                xhr[i].open("POST", 'api/v1/'+ placeId +'/keywords', true);
                xhr[i].setRequestHeader("Content-Type", "application/json");
                xhr[i].onreadystatechange = function () {
                    if (xhr[i].readyState == 4 && xhr[i].status == 200) {
                        //console.log('Response from request ' + i + ' [ ' + xhr[i].responseText + ']');
                        //console.log('elli', JSON.parse(xhr[i].responseText).data.id)
                    }
                };
                xhr[i].send(JSON.stringify(keyword));
            })(i);
        }
    })();

}

