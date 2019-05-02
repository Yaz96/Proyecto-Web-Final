var ObjFaltas = []
var Niv;

function displayNinos(data, nivel){
	var Objaux = [];
	nivel = nivel.substring(0,nivel.length-1);
	nivel = "Nivel"+nivel;
	Niv = nivel;

	for (let i= 0;i<data.posts.length; i++){
		Objaux.push(data.posts[i].beneficiario);
		Objaux.push(data.posts[i].faltas.toString(10));

		$("#extra").append(`  <input class="ch" name="${data.posts[i].beneficiario}" type="checkbox"> ${data.posts[i].beneficiario} <br>`);
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

function createUserUpdateFetch(nombre,faltas){
	let data = {};
	data.faltas = faltas;



	url = `/minirobo/api/faltas/${nombre}`;
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
		fetchSalon(grupo);


	});


		var selected = [];

	$("#BotonTerminar").on("click", function(event){
			event.preventDefault();
	$('#extra input:checked').each(function() {
				selected.push($(this).attr('name'));
			});
	
		
			console.log(ObjFaltas);
			for (let j= 0; j< selected.length; j++){
			for(let i = 0; i<ObjFaltas.length/2; i++){ //iteracion atravez del obj de faltas
				if( ObjFaltas[i*2]== selected[j] ){
					ObjFaltas.splice(i*2,2);
				}}
		}
		console.log(ObjFaltas);
		for (let i= 0; i< ObjFaltas.length/2; i++){
			let nombre = ObjFaltas[2*i];
			let faltas= parseInt(ObjFaltas[2*i+1],10)+1;
			createUserUpdateFetch(nombre,faltas);
		}
		
		
	} );



}


$(watchForm);
 /*<span> 
              <label> Semana 1: </label>
              <div> 8</div>
            </span> */