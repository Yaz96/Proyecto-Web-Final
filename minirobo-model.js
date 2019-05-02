 const uuid = require('uuid');
 const mongoose = require('mongoose');
 mongoose.Promise = global.Promise;



let postSchema = mongoose.Schema({
	//id : {type : Number, required : true, unique : true},
	tipo : {type : String, required : false},
	url : {type : String, required : false},
	name : {type : String, required : false},
	active : {type : Boolean, required : false},
	email : {type : String, required : false},
	password :{type : String, required : false},
	timestamp : {type : String, required : false},
	beneficiario : {type : String, required : false},
	edad : {type : String, required : false},
	GradoEscolar : {type : String, required : false},
	Escuela : {type : String, required : false},
	PadreBenef : {type : String, required : false},
	Publica_O_Privada : {type : String, required : false},
	Telefono : {type : String, required : false},
	TelefonoSegRef : {type : String, required : false},
	Nivel : {type : String, required : false},
	Privilegio : {type : Number, required : false},
	mensaje : {type : String, required : false},
	dia : {type : Number, required : false},
	mes : {type : Number, required : false},
	autor : {type : String, required : false},
	faltas : {type : Number, required : false}

});
let Posts = mongoose.model('Posts', postSchema);


const Listposts = {  //ListSports
	getgrup: function(grupo){
		return Posts.find({tipo:"historial",GrupoAct:`${grupo}`})
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	getmens : function(){
		return Posts.find({tipo:"anuncio"})
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	getactusr : function(){
		return Posts.find({tipo:"user", active:true})
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	get : function(){
		return Posts.find()
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	gethist : function(nombre){
		return Posts.find({tipo:"historial", beneficiario:`${nombre}` })
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	getimg : function(){
		return Posts.find({tipo:"Imagen"})
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	getlog : function(email){
		return Posts.find({ email : `${email}`})
		.then(posts => {
			if (posts){
				return posts;
			}
			throw new Err("email not found");
		})
		.catch(err =>{
			throw new Error(err);
		});
	},

	postUser : function(post){
		return Posts.create(post)
			.then(posts => {
				return posts;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	delete: function(bodyId){
		return Posts.findOneAndRemove({_id : bodyId})
		//return Posts.findOne({ _id : bodyId})

			.then(post => {
				if (post){
					return post;
				}
				throw new Err("Post not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	putcalifas: function(body,paramsId){
		//let status= body.active;

		return Posts.findOneAndUpdate({tipo : "historial", beneficiario: paramsId  }, { $set: body })
			.then(posts => {
				if (posts){
					return posts;
				}
				throw new Err("Post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
		},
	putfalta: function(body,paramsId){
		//let status= body.active;

		return Posts.findOneAndUpdate({tipo : "historial", beneficiario: paramsId  }, { $set: body }, { new: true })
			.then(posts => {
				if (posts){
					return posts;
				}
				throw new Err("Post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});

},

	putactive: function(body,paramsId){
		//let status= body.active;

		return Posts.findOneAndUpdate({email : paramsId}, { $set: body }, { new: true })
			.then(posts => {
				if (posts){
					return posts;
				}
				throw new Err("Post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});

}

}




module.exports = {Listposts};





