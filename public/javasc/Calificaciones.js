function createHistoFetch(nombre,Nivel){
	let url = `/minirobo/api/hist/${nombre}`; // /sports/api/list-sports


	
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResults(responseJSON,Nivel))
		.catch(err => {
			console.log(err);
		});}


function displayResults(data,Nivel){

	$("#extra").remove();

	 $("#results").append(`<div id= "extra"> <label id = "ResCalif"><b> Calificaciones:</b> <br> </label> <br><label id = "ResFaltas"><b> Faltas: </b> </label>  </div>` );
		//console.log(data.posts.calificaciones.Nivel1(1));
		let i = 0;
		for (	i = 0 ;data.posts[0].calificaciones[Nivel][i] != -1 && i <9 ;i++ ){
	$("#ResCalif").append( `<span class = "res"><label> Semana ${i+1}: </label> <div class = "res"> ${data.posts[0].calificaciones[Nivel][i]}</div> </span> `);
		}

		if ( i == 0){
		$("#ResCalif").append( " No hay calificaciones para este nivel por el momento");
		}

		$("#ResFaltas").append(`<div> ${data.posts[0].faltas}  </div>`  )
		

}


function watchForm(){ // Creates the image grid from the images that are in the database
	$("#BotonEnviar").on("click", function(event){
		let nombre = $("#nombreNino").val();
		nombre = nombre.toUpperCase();
		$("#nombreNino").val('');
		let Nivel = $('input[name=nivel]:checked').val();
		createHistoFetch(nombre,Nivel);
		

		


	});


}


$(watchForm);
 /*<span> 
              <label> Semana 1: </label>
              <div> 8</div>
            </span> */