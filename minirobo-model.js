 const uuid = require('uuid');
 const mongoose = require('mongoose');
 mongoose.Promise = global.Promise;



let postSchema = mongoose.Schema({
	//id : {type : Number, required : true, unique : true},
	tipo : {type : String, required : false},
	url : {type : String, required : false},
	name : {type : String, required : false}
});
let Posts = mongoose.model('Posts', postSchema);


const Listposts = {  //ListSports
	getimg : function(){
		return Posts.find({tipo:"Imagen"})
		.then (posts=>{
			return posts;
		})
		.catch(err => {
			throw new Error(err);
	   });
	},
	getauth : function(author){

		return Posts.find({ author : `${author}`})
		.then(posts => {
			if (posts){
				return posts;
			}
			throw new Err("Author not found");
		})
		.catch(err =>{
			throw new Error(err);
		});

	},

	post : function(post){
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

	put: function(body,paramsId){

		return Posts.findOneAndUpdate({_id : paramsId}, { $set: body }, { new: true })
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





