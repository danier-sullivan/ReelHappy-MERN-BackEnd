require('dotenv').config()
const API_KEY=process.env.API_KEY
const {Movie} = require("../models/index")

const deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then((deletedMovie) => {
        if(!deletedMovie){
            res.status(400).json({Message: 'Could not delete movie'})
        } else {
            res.status(200).json({Data: deletedMovie, Message: "Movie deleted"})
        }
    })
}

const getAllMovies=(req, res)=>{
    console.log("getting movies...")
     Movie.find({}).then((foundMovies) => {
        if(!foundMovies){
            res.status(404).json({message: 'Cannot find movies'})
        } else {
            res.status(200).json(foundMovies)
        }
     })
}
const getTenMostRecentlyUpdatedMovies=(req, res)=>{
    console.log("getting movies...")
    Movie.find({}).sort({updatedAt:-1}).limit(10).then((foundMovies)=>{
        if(!foundMovies){
            res.status(404).json({message: 'Cannot find movies'})
        } else {
            res.status(200).json(foundMovies)
        }
    })
}
const getTenHappiestMovies=(req, res)=>{
    console.log("getting movies...")
    Movie.find({}).sort({avgHappiness:-1}).limit(10).then((foundMovies)=>{
        if(!foundMovies){
            res.status(404).json({message: 'Cannot find movies'})
        } else {
            res.status(200).json(foundMovies)
        }
    })
}
const getTenMoviesByGenre=(req, res)=>{
    console.log("getting movies...")
    Movie.find({genre:[req.params.genre]}).limit(10).then((foundMovies)=>{
        if(!foundMovies){
            res.status(404).json({message: 'Cannot find movies'})
        } else {
            res.status(200).json(foundMovies)
        }
    })
}
const createMovie= async(title)=> {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
      );
      // Parse JSON response into a javascript object
      const data = await response.json();
      console.log(data)
      if (data.Response=='True'){
        const movie=Movie.create(
            {
                title: data.Title,
                rated: data.Rated,
                img: data.Poster,
                year: data.Year,
                genre: data.Genre.split(", ").map((genre)=>{
                    return genre.toLowerCase()
                }),
                comments: [],
                happinessScores: [],
                avgHappiness: undefined
                
        });
      return (movie);
    }
    else return ({Error: "404 not found"})
      
}
const searchAPIMultipleMovies = async(req, res)=>{
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.params.title}`
      );
      const data= await response.json();
      if (data.Response==='True'){
        res.status(201).json(data.Search);
      }
      else{
        res.status(404).json({Error: "404 Not Found"})
      }
    }

const findMultipleMovies = (req, res)=>{
    Movie.find({title: {regex: req.params.title, $options: "i"}}.then(movies=>{
        if (movies){
            console.log("getting search results from mongo")
            res.status(201).json(result)
        }
        else {
            res.status(404).json({Error: "404 Not Found"})
        }
    }))
}
//Stupid error: title must be capitalized to pull from mongo
const showMovie=(req, res)=>{
    //If movie doesn't exist, try to find it on the api
    Movie.findOne({title: {$regex: req.params.title, $options: "i"}}).then(movie=>{
        if (!movie){
            
            console.log("adding movie to mongo")
            createMovie(req.params.title).then(result=>{
                console.log(result)
                res.status(201).json(result)
            })
            
        }
        //If movie exists, pull it from Mongo
        else{
            console.log("showing data from mongo")
            res.status(200).json(movie)
        }
        
    })
} 

module.exports={
    deleteMovie,
    createMovie,
    getAllMovies,
    showMovie,
    getTenMostRecentlyUpdatedMovies,
    getTenMoviesByGenre,
    getTenHappiestMovies,
    searchAPIMultipleMovies
}