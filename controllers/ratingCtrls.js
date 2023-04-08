const { default: mongoose } = require("mongoose");
const { Movie } = require("../models");

const calculateHappiness=(numArray)=>{
    let total=0;
    for (num in numArray){
        total+=parseInt(num);
    }
    if (numArray.length>0){
        return (total/numArray.length)
    }
    else return 0;
}

const addRating= (req, res)=>{
    
    Movie.findOneAndUpdate({title: req.params.title}, {$push: 
        {happinessScores: 
            req.body.rating
        }},)
        .then((updatedMovie)=>{
            if(!updatedMovie){
                res.status(400).json({Message: 'Could not update movie'})
            } else {
                let avg=calculateHappiness(updatedMovie.happinessScores)
                Movie.findOneAndUpdate({title: req.params.title}, {$set :{avgHappiness: avg}}).then((updatedMovie)=>{
                    res.status(200).json({Data: updatedMovie, Message: "Movie updated"})
                })
                
            }
        } )  
}

module.exports={
    calculateHappiness,
    addRating
}