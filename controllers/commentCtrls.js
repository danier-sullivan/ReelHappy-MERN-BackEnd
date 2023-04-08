
const { Movie } = require("../models");


const addComment= (req, res)=>{
    Movie.findOneAndUpdate({title: req.params.title}, {$push: 
        {comments: {
            name: req.body.name,
            body: req.body.body
        }}}, {new: true})
        .then((updatedMovie)=>{
            if(!updatedMovie){
                res.status(400).json({Message: 'Could not update movie'})
            } else {
                res.status(200).json({Data: updatedMovie, Message: "Movie updated"})
            }
        } )  
}
const deleteComment= (req, res)=>{
    Movie.findOneAndUpdate({title: req.params.title}, {$pull: {comments: {_id: req.params.commentId}}}, {new: true})
    .then((updatedMovie)=>{
        if(!updatedMovie){
            res.status(400).json({Message: 'Could not update movie'})
        } else {
            res.status(200).json({Data: updatedMovie, Message: "Movie updated"})
        }
    })
}

const updateComment=(req, res)=>{
    Movie.findOneAndUpdate({title: req.params.title, "comments._id": req.params.commentId},{$set: {"comments.$.body": req.body.body, "comments.$.name": req.body.name}}, {new: true})
    .then((updatedMovie)=>{
        if(!updatedMovie){
            res.status(400).json({Message: 'Could not update movie'})
        } else {
            res.status(200).json({Data: updatedMovie, Message: "Movie updated"})
        }
    })
}
module.exports={
    addComment,
    deleteComment,
    updateComment,
}