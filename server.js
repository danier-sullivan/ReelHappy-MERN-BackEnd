require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index')

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({message: "NOT A PROPER ROUTE"})
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));