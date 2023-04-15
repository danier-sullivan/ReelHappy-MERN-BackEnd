
const { Movie } = require("../models");

const calculateHappiness=(numArray)=>{
    let total=0;
    console.log(numArray)
    for (let i=0; i<numArray.length; i++){
        total+=parseInt(numArray[i]);
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
        }}, {new: true})
        .then((updatedMovie)=>{
            if(!updatedMovie){
                res.status(400).json({Message: 'Could not update movie'})
            } else {
                console.log("setting avg")
                let avg=Math.round(calculateHappiness(updatedMovie.happinessScores))
                console.log(avg)
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