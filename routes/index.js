const router = require("express").Router()
const movieRoutes = require("./movieRoutes")//

router.use('/movies', movieRoutes) //any url beginning in /people will be directed to ./peopleRoutes and then use the request's HTTP method sent

module.exports = router
