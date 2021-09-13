const Comments = require('../models/commentModel')

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;

    }
    sorting(){
        this.query = this.query.sort('-createdAt')
        return this;
    }
}



const commentCtrl = {
    getComments: async(req, res) => {
        try {

            const features = new APIfeatures(Comments.find({product_id: req.params.id}), req.query).sorting()

            const comments = await features.query

            res.json({
                status: 'success',
                result: comments.length,
                comments
            })

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    deleteComment: async(req, res) => {

        try{
            const commentId = req.params.id;
            await Comments.findByIdAndDelete(commentId)

            res.json({
                status: 'successfully deleted',
                
            })
        

        }catch(err){
            return res.status(500).json({msg: err.message})
        }

    },

    //reply delete part 
    //get the value and update it
    // deleteReply: async(req, res) => {
    //     try{
    //         const replyId = req.params.id;
    //         await Comments.findOneAndUpdate()

            
    //         res.json({
    //             status: 'reply successfully deleted',
                
    //         })


    //     }catch(err){
    //         return res.status(500).json({msg: err.message})
    //     }
    // }


    //delete reply

    DeleteReply : async(req, res) => {
        try{
            let commentId = req.params.id;
            const reply = []; 
            
             const updateReply = {
                reply,
             }
             const update = await Comments.findByIdAndUpdate(commentId, updateReply)

             res.status(200).send({status: "Reply deleted"})
             
        }catch(err){
            res.status(500).send({status: "Unsuccess"})
        }

    }


}

module.exports = commentCtrl