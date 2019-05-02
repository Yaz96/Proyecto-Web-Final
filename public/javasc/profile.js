function createUserUpdateFetch(email){
	let data = {};
	data.active = false;


	url = `/minirobo/api/status/${email}`;
	let settings = {
		method : 'PUT',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify(data)
	};

fetch(url, settings)
.then(response => {
	if(response.ok){
	}
	else{
		throw Error("Something went wrong.");
	}
})		
.then(responseJSON => {
	alert("Welcome back!");
})
.catch(err => {
	console.log(err);
})

window.location.href = "index.html";

} 

function displayResults(data){

	var slides = document.getElementsByClassName("mySlides");

	for(let i= 0; i<data.posts.length;i++){
		
		$("#extra").prepend(`<div class="mySlides ">   
		<div class="Mensaje" > <div><Label style="font-size:50px; padding: 0px 10px;opacity:.6;" >Anuncios </Label>
		</div><div class="Mens"> ${data.posts[i].mensaje}</div><div class = "Mens"> autor: ${data.posts[i].autor}</div></div></div>` );
	}
	slides[1].style.display = "block";
	slideIndex = 2;

}

function createMensFetch(){
	let url = '/minirobo/api/getanun/'; // /sports/api/list-sports
    
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResults(responseJSON) )
		.catch(err => {
			console.log(err);
		});}



function LoginResolution(data,boton){
	let email = data.posts[0].email;
	let priv = data.posts[0].Privilegio;

	if(boton=="Asistencia"){
		if(priv<3){ window.location.href = "Asistencia.html";
	}
	else{ alert("Cambia de cuenta para Poder Acceder a la Asistencia") } }

	if(boton=="Calificaciones"){
		if(priv<3){ window.location.href = "CalifasCreacion.html";
	}
	else{ alert("Cambia de cuenta para Poder Acceder a las Calificaciones") } }

	if(boton=="Salones"){
		window.location.href = "Salones.html"; }

	if(boton=="Anuncios"){
		if(priv<2){ window.location.href = "Anuncios.html"; }
		else{ alert("Cambia de cuenta para Poder Acceder a los Anuncios") } }
	
	if(boton=="Log-Out"){
		createUserUpdateFetch(email)

	}

}

function createUserFetch(boton){
	let url = '/minirobo/api/active-us/'; // /sports/api/list-sports
    
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => LoginResolution(responseJSON,boton) )
		.catch(err => {
			console.log(err);
		});}


function watchForm(){ // Creates the image grid from the images that are in the database
	$(".botMenu").on("click", function(event){
		
		event.preventDefault();
		let boton = this.id;
		console.log(boton);
		createUserFetch(boton);



	});


}
var slideIndex = 1;
createMensFetch();



$(watchForm);



showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  

  
  slides[slideIndex-1].style.display = "block";  
  
}



