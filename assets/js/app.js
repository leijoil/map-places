var overlay = document.getElementById('overlay');

function openModal(id){
	overlay.classList.remove("is-hidden");
}

function closeModal(){
	overlay.classList.add("is-hidden");
	flushModal();
}

function getAllFields () {

		var placeObj = {}

		placeObj.id = document.getElementById("id").value || undefined
		placeObj.title = document.getElementById("title").value
		placeObj.description = document.getElementById("description").value
		placeObj.openfrom = document.getElementById("openfrom").value
		placeObj.opento = document.getElementById("opento").value
		placeObj.lat = document.getElementById("lat").value
		placeObj.lng = document.getElementById("lng").value


		return placeObj;

}

function getKeywords () {
		var keywords = []
		console.log('KEYWORDS: ', keywords)
		for (i = 0; i < document.getElementsByName("keyword").length; i++) { 
			keywords.push(document.getElementsByName("keyword")[i].value)
		}
		return keywords;
}
