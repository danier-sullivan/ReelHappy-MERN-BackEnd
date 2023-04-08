const router = require('express').Router();
const {movieCtrl} = require('../controllers/index')
const {commentCtrl}= require('../controllers/index')
const {ratingCtrl}= require('../controllers/index')



// ROUTES - METHODS //
router.get('/', movieCtrl.getAllMovies)
router.get("/recentlyUpdated", movieCtrl.getTenMostRecentlyUpdatedMovies)
router.get('/:title', movieCtrl.showMovie)
router.delete('/:title', movieCtrl.deleteMovie)

//Comment Routes
router.put('/:title/comments/', commentCtrl.addComment)
router.put('/:title/comments/:commentId/delete', commentCtrl.deleteComment)
router.put("/:title/comments/:commentId/edit", commentCtrl.updateComment)

//Rating Routes
router.put('/:title/rating', ratingCtrl.addRating)



module.exports = router;
