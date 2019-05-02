const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
const {Listposts} = require('./minirobo-model');
router.get('/grupo/:grupo', ( req,res, next) => { // /list-sports

	let grupo = req.params.grupo;
	Listposts.getgrup(grupo)
		.then( posts => {
			res.status(200).json({
				message : 'Successfully sending the list of posts',
				status : 200,
				posts : posts
			});
		}).catch( err => {
			res.status(500).json({
				message : `Internal server error.`,
				status : 500
			});
			return next();
	
		});
	});
router.get('/getanun/', ( req,res, next) => { // /list-sports

	Listposts.getmens()
		.then( posts => {
			res.status(200).json({
				message : 'Successfully sending the list of posts',
				status : 200,
				posts : posts
			});
		}).catch( err => {
			res.status(500).json({
				message : `Internal server error.`,
				status : 500
			});
			return next();
	
		});
	});


router.get('/active-us/', ( req,res, next) => { // /list-sports

	Listposts.getactusr()
		.then( posts => {
			res.status(200).json({
				message : 'Successfully sending the list of posts',
				status : 200,
				posts : posts
			});
		}).catch( err => {
			res.status(500).json({
				message : `Internal server error.`,
				status : 500
			});
			return next();
	
		});
	});


router.get('/hist/:nombre', ( req,res, next) => { // /list-sports

	let nombre = req.params.nombre;
	console.log(nombre);

	Listposts.gethist(nombre)
		.then( posts => {
			res.status(200).json({
				message : 'Successfully sending the list of posts',
				status : 200,
				posts : posts
			});
		}).catch( err => {
			res.status(500).json({
				message : `Internal server error.`,
				status : 500
			});
			return next();
	
		});
	});

router.get('/all', ( req,res, next) => { // /list-sports


Listposts.get()
	.then( posts => {
		res.status(200).json({
			message : 'Successfully sending the list of posts',
			status : 200,
			posts : posts
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});

router.get('/img', ( req,res, next) => { // /list-sports


	Listposts.getimg()
	.then( posts => {
		res.status(200).json({
			message : 'Successfully sending the list of posts',
			status : 200,
			posts : posts
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});
router.get('/log/:email', ( req,res, next) => { // /list-sports

	let email = req.params.email;
	Listposts.getlog(email)
	.then( posts => {
		res.status(200).json({
			message : 'Successfully sending the list of users',
			status : 200,
			posts : posts
		});
	}).catch( err => {
		console.log(err);
		res.status(404).json({
			message : `Email not Found`,
			status : 404
		});
		return next();

	});
});



router.post('/create-user', (req,res,next) => {
	
	let objectToAdd = {
		tipo : req.body.tipo,
		name : req.body.name,
		email : req.body.email,
		password: req.body.password,
		Privilegio:req.body.Privilegio,
		active : true
	};

	Listposts.postUser(objectToAdd)
		.then(posts => {
			res.status(201).json({
				message : "Successfully added the user",
				status : 201,
				posts : posts
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});

});
router.post('/create-registry', (req,res,next) => {
	
	let objectToAdd = {
		tipo: "registro",
		timestamp: req.body.timestamp,
		email: req.body.email,
		beneficiario: req.body.beneficiario,
		edad: req.body.edad,
		GradoEscolar:req.body.GradoEscolar,
		Escuela: req.body.Escuela,
		Publica_O_Privada:req.body.Publica_O_Privada,
		PadreBenef: req.body.PadreBenef,
		Telefono: req.body.Telefono,
		TelefonoSegRef:req.body.TelefonoSegRef,
		Nivel: req.body.Nivel
	};

	Listposts.postUser(objectToAdd)
		.then(posts => {
			res.status(201).json({
				message : "Successfully added the post",
				status : 201,
				posts : posts
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});

});  
router.post('/mensaje', (req,res,next) => {
	
	let objectToAdd = {
		tipo: "anuncio",
		dia :    req.body.dia,
        mes :    req.body.mes,
        autor:   req.body.autor,
        mensaje: req.body.mensaje
	};

	Listposts.postUser(objectToAdd)
		.then(posts => {
			res.status(201).json({
				message : "Successfully added the post",
				status : 201,
				posts : posts
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});

});  

router.delete('/blog-posts/:id', (req,res,next) => {

	let bodyId = req.body._id
	let paramsId = req.params.id;
	
	let errMissingField = new Error(`Missing field Id in body or path, or it doesn't match.` )
	errMissingField.statusCode = 406;

	let errIDnotFound = new Error(`Id not found` );
	errIDnotFound.statusCode = 404;

  let sportId = req.params.id;

  if (sportId){
	  if(sportId == req.body._id){

		Listposts.delete(sportId)
			  .then(post => {
				  res.status(204).json({
					  message : "Successfully deleted the post",
					  status : 204,
					  post : post
				  });
			  })
			  .catch(err => {
				  res.status(404).json({
					  message : "Post not found in the list",
					  status : 404
				  }).send("Finish");
			  })
  
	  }
	  else{
		  res.status(400).json({
			  message : "Param and body do not match",
			  status : 400
		  });

		  next();
	  }
  }
  else{
	  res.status(406).json({
		  message : "Missing param 'id'",
		  status : 406
	  });

	  next();
  }
}); 
router.put('/califas/:nombre', (req,res, next) => {
	let calificaciones = req.body.calificaciones;
	

	let errIdNotFound = new Error("Id not Found");
	errIdNotFound.statusCode = 406;
	

	
		
		let updatedFields = {};
			updatedFields.calificaciones = calificaciones;


		Listposts.putcalifas(updatedFields,nombre)
			.then(posts => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					posts : posts
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});	
	
	

}); 
router.put('/faltas/:nombre', (req,res, next) => {
	let faltas = req.body.faltas;
	let nombre = req.params.nombre;
	console.log(faltas);
	

	let errIdNotFound = new Error("Id not Found");
	errIdNotFound.statusCode = 406;
	

	
		
		let updatedFields = {};

			updatedFields.faltas = faltas;


		Listposts.putfalta(updatedFields,nombre)
			.then(posts => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					posts : posts
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});	
	
	

}); 

router.put('/status/:email', (req,res, next) => {
	let stat = req.body.active
	

	let errIdNotFound = new Error("Id not Found");
	errIdNotFound.statusCode = 406;
	

	let postemail = req.params.email;

	
		
		let updatedFields = {};

			updatedFields.active = stat;


		Listposts.putactive(updatedFields,postemail)
			.then(posts => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					posts : posts
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});	
	
	

}); 




module.exports = router;
