var overlay = document.getElementById('overlay');

function openModal(id){
	console.log('OPEN MODAL ID: ', id)
	overlay.classList.remove("is-hidden");
}

function closeModal(){
	overlay.classList.add("is-hidden");
	flushModal();
}

function getAllFields () {

		var placeObj = {}

		placeObj.title = document.getElementById("title").value
		placeObj.description = document.getElementById("description").value
		placeObj.openfrom = document.getElementById("openfrom").value
		placeObj.opento = document.getElementById("opento").value
		placeObj.lat = document.getElementById("lat").value
		placeObj.lng = document.getElementById("lng").value


		return placeObj;

}