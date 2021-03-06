function addProduct(){
	const firestore = firebase.firestore();
	const settings = {/* your settings... */ timestampsInSnapshots: true};
	firestore.settings(settings);

	var products = firebase.firestore().collection('products');
	var imageURL = 'http://cdn.onlinewebfonts.com/svg/img_90947.png';
	

 $('#add-product').on('submit', function(e) {
	e.preventDefault();
	
	var name = $('#name').val();
	var description = $('#description').val();
	var price = $('#cost').val();
	
	products.add({
		name: name,
		description: description,
		price: price,
		imageURL: imageURL,
	}).then(function (result) {
		M.toast({html: name + ' has been added with ID ' + result.id , classes: 'green'});
	});
 });
 
 $('#image').on('change', function(e){
	var image = this.files[0];
	console.log(image);
	readURL(image);
	firebase.storage().ref().child('images/' + image.name).put(image)
	.then(function(snap){
		snap.ref.getDownloadURL().then(function(url) {
		imageURL = url;
		 M.toast({html: 'Image downloadable at '+ url});
		});
	});
 });

 
 function readURL(image) {
	var reader = new FileReader();
	reader.onload=  function(e) {
		$('#preview').attr('src', e.target.result);
		}
	reader.readAsDataURL(image);
 }
}

$(document).ready(addProduct);