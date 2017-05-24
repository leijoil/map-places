(function () {
    var results = document.getElementById('results'),
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
            console.log('Inside the onload event');
            console.log('THIS IS: ', e.target)
            if (xhr.responseType === 'json') {
                // results.innerHTML = xhr.response.data;
                

                for (i = 0; i < xhr.response.data.length; i++) { 
                    results.innerHTML += '<li>' + xhr.response.data[i].title + '</li>';
                }
                
            } else {
              console.log('ELSE')
                results.innerHTML = JSON.parse(xhr.responseText).data;
            }
        };
        oReq.onreadystatechange = function () {
            console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };

        oReq.open('GET', '/api/v1/places', true);
        oReq.responseType = 'json';
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send();

}());
