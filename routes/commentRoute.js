const router = require('express').Router()
const commentCtrl =  require('../controllers/commentCtrl')

router.get('/comments/:id', commentCtrl.getComments)

router.delete('/comments/:id' , commentCtrl.deleteComment)

router.put('/comments/reply/:id', commentCtrl.DeleteReply)

//update is not working
router.put('/comments/reply/update/:id', commentCtrl.UpdataReply)





module.exports = router

