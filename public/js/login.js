function login() {
	var name = null;

	$('#create-account').on('submit', function(e) {
		e.preventDefault();
		
		var email = $('#c-email').val();
		var password = $('#c-password').val();
		name = $('#c-name').val();
		
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(function (err){
				M.toast({html: err.message, classes: 'red'});
			});
	});
	
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			if(name){
				user.updateProfile({
					displayName: name,
					photoURL: 'https://static.boredpanda.com/blog/wp-content/uploads/2014/01/funny-cats-sneezing-3.jpg',
				}).then(function(){
					window.location = "file:///C:/Users/training/Downloads/firebase-codelabs-bacolod-master/public/add-product.html";
				});
			}
			console.log(user);
			$('#avatar').html('<img src="' + user.photoURL + '" width="40px">');	
			$('#avatar').on('click', function(e) {
				e.preventDefault();
				firebase.auth().signOut();
				alert('Signed out');
				window.location.reload();
			});
			window.location = "file:///C:/Users/training/Downloads/firebase-codelabs-bacolod-master/public/add-product.html";
		}
	});
	
	$('#login-form').on('submit', function(e) {
		e.preventDefault();
		
		var email = $('#l-email').val();
		var password = $('#l-password').val();
		
		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(function (err){
				M.toast({html: err.message, classes: 'red'});
			});
	});

}

$(document).ready(login);