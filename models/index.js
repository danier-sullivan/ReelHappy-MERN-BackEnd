
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));


module.exports = {
    Movie: require('./movie')
}
