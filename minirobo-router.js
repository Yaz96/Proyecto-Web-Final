const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
const {Listposts} = require('./minirobo-model');

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


router.get('/blog-posts/:author', (req, res, next) =>{

	let blogAuthor = req.params.author;
	let errNoauth = new Error(`No author in parameters.` )
	errNoauth.statusCode = 406;

	if(!blogAuthor){
		next(errNoauth);
	}

	Listposts.getauth(blogAuthor) 
	.then(posts => {
		res.status(200).json({
			message : "Successfully sent the post",
			status : 200,
			posts : posts
		});
	})
	.catch(err => {
		res.status(404).json({
			message : "Author not found in the list",
			status : 404
		});
	});	
	
});


router.post('/blog-posts', (req,res,next) => {
	let requiredFields = ['title', 'content','author','publishDate'];

	
	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}
	let objectToAdd = {
		title : req.body.title,
		content : req.body.content,
		author : req.body.author,
		publishDate: req.body.publishDate
	};

	Listposts.post(objectToAdd)
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

  if( !paramsId  ||  !bodyId || bodyId != paramsId  ){
    res.status(406).json({
      message : "Missing field Id in body or path, or it doesn't match",
      status : 406
		});
		next("Status Error: " + errMissingField.statusCode);
		return next(errMissingField);

  }

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

router.put('/status/:email', (req,res, next) => {
	let stat = req.body.active
	

	let errIdNotFound = new Error("Id not Found");
	errIdNotFound.statusCode = 406;
	

	let postemail = req.params.email;
	console.log(postemail);
	
		
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
