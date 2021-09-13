const router = require('express').Router()
const commentCtrl =  require('../controllers/commentCtrl')

router.get('/comments/:id', commentCtrl.getComments)

router.delete('/comments/:id' , commentCtrl.deleteComment)

// router.delete('/comments/reply/:id', commentCtrl.deleteReply)

router.put('/comments/reply/:id', commentCtrl.DeleteReply)


module.exports = router

