const mongoose=require('mongoose');

const MovieSchema= new mongoose.Schema({
    title: {type: String, required: true},
    rated: {type: String},
    img: {type: String},
    year: {type: String},
    genre: [{type: String}],
    comments: [{name: {type: String}, body: {type: String}, index:  {type: mongoose.Schema.ObjectId}} ],
    happinessScores: [{type: Number}],
    avgHappiness: {type: Number}
}, {timestamps: true});

const Movie=mongoose.model("Movie", MovieSchema);
module.exports=Movie;

