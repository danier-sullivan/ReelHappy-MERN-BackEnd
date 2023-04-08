//import all available routes in our /routes/index.js the user can use
require('dotenv').config()
const routes = require('./routes/index')
const express=require('express');

const app = express();
// add this - import middlware
// const cors = require("cors");
const PORT=process.env.PORT

///////////////////////////////
// MiddleWare
////////////////////////////////
// app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse json bodies

app.use('/', routes) 
// app.get('/', (req, res)=>{
//     res.send('hello world')
// })
//catch all 404 route! 
app.use((req, res) => {res.status(404).json({message: "NOT A PROPER ROUTE"})})
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
