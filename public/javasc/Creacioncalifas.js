var ObjFaltas = [];
var ObjCalif = [];

function displayNinos(data, nivel){
	var Objaux = [];
	

	for (let i= 0;i<data.posts.length; i++){
		Objaux.push(data.posts[i].beneficiario);
		ObjCalif.push(data.posts[i].calificaciones);

		$("#extra").append(`  <input class="ch" id="${data.posts[i].beneficiario}" type="text"> ${data.posts[i].beneficiario} <br>`);
	}
	ObjFaltas = Objaux;

}


function fetchSalon(grupo){

	let url = `/minirobo/api/grupo/${grupo}`; // /sports/api/list-sports
    
	fetch(url) 
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayNinos(responseJSON,grupo))
		.catch(err => {
			console.log(err);
        });
}

function createUserUpdateFetch(ObjCalif,nombre){
	let data = {};
	data.calificaciones = ObjCalif;



	url = `/minirobo/api/califas/${nombre}`;
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
	
})
.catch(err => {
	console.log(err);
})


} 




function watchForm(){ // Creates the image grid from the images that are in the database

	

	$("#BotonEnviar").on("click", function(event){
		event.preventDefault();
	
		let grupo = $("#grupo").val();
		$("#grupo").val('');
		fetchSalon(grupo);


	});


		var selected = [];

	$("#BotonTerminar").on("click", function(event){
			event.preventDefault();
			var inputs = $(".ch");
			let Nivel = "Nivel"+$("#Nivel").val();
			let semana = $("#semana").val();
			for( let i=0;   i<ObjFaltas.length; i++){
			let nombre = ObjFaltas[i];
			let grade = $(inputs[i]).val();
			$(inputs[i]).val('');
			ObjCalif[0][Nivel][semana] = grade;
			
			//createUserUpdateFetch(ObjCalif,nombre);
			}

		$("#Nivel").val('');
		$("#semana").val('');
		alert("Calificaciones subidas");
		
	} );



}


$(watchForm);
 /*<span> 
              <label> Semana 1: </label>
              <div> 8</div>
            </span> */