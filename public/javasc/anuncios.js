function createAnn(){
        let dia = $("#day").val();
        let mes = $("#month").val();
        let author = $("#ann").val();
        let message = $(".mss").val();



        let data = {};
        data.dia = dia;
        data.mes = mes;
        data.autor = author;
        data.mensaje = message;

    

        url = `/minirobo/api/mensaje`;
        let settings = {
            method : 'POST',
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
        alert("Mensaje Enviado");
    })
    .catch(err => {
        console.log(err);
    })
    //window.location.href = "profile.html";

    }  


$("#sub").click(function(e){
    e.preventDefault();                     //Evita el refresh              
    createAnn();
});