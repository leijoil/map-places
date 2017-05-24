var overlay = document.getElementById('overlay');

function openModal(id){
	console.log('OPEN MODAL ID: ', id)
	overlay.classList.remove("is-hidden");
}

function closeModal(){
	overlay.classList.add("is-hidden");
}