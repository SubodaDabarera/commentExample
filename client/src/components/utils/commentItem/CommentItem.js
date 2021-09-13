import React, {useState, useEffect, useCallback} from 'react'
import CommentCard from './CommentCard'
import FormInput from '../formInput/FormInput'
import {deleteComment, deleteReply} from '../FetchData'
import './CommentCard.css'

function CommentItem({comment, socket}){
    const [reply, setReply] = useState(false)
    const [name, setName] = useState('')
    const [commentDelete, setCommentDelete] = useState('')
    const [replyDelete, setReplyDelete] = useState('')

    
    const handleReply = (username) => {
        setReply(true)
        setName(username)
       
    }

    const hideReply = () =>{
        setReply(false)
    }

    
   //delete comment
    useEffect(() => {
        deleteComment(`/api/comments/${commentDelete}`)
            .then(res => {
            console.log("Comment Deleted")
            })
            .catch(err => console.log("Comment Delete unsuccess"))

    }, [commentDelete])

    const handleCommentDelete = (commentId) => {
        setCommentDelete(commentId)
    }

    //delete reply
    useEffect(() => {
        deleteReply(`/api/comments/reply/${replyDelete}`)
            .then(res => {
            console.log("Reply Deleted")
            })
            .catch(err => console.log("Reply Delete unsuccess"))

    }, [replyDelete])

    const handleReplyDelete = (commentId) => {
        setReplyDelete(commentId)
    }



    if(comment.reply) {
        if(comment.reply[0]){
            console.log(comment.reply[0].content)
        }
    }
    

    return (
        <div>
            <CommentCard comment = {comment}>

                
                <div className = "nav_comment">
                    <button  style = {{backgroundColor: "#cad2d9", width: "100px", height: "20",  margin: "10px", borderRadius: "10px", cursor: "pointer", borderColor: "#e3e6e8"}} onClick={() => handleReply(comment.username)}>Reply</button> {'  '}

                    {/* style = {{backgroundColor: "#cad2d9", width: "100px", height: "20",  margin: "10px", borderRadius: "10px", cursor: "pointer"}} */}

                    <button style = {{backgroundColor: "#ff1c1c", width: "100px", height: "30", margin: "10px",  borderRadius: "10px", color: "white", cursor: "pointer",  borderColor: "#fc4242"}} onClick={() => handleCommentDelete(comment._id)}>Delete Comment</button>
                   
                    {   reply &&
                         <p onClick={hideReply}>Hide Reply</p>
                    }

                   
                </div>
                

                <div className = "reply_comment">
                    {
                        comment.reply.map(rep => (
                            <CommentCard comment = {rep} key={rep._id}>
                                   
                                    <button style = {{backgroundColor: "#ff1c1c", width: "100px", height: "30", margin: "10px",  borderRadius: "10px", color: "white", cursor: "pointer", borderColor: "#fc4242"}} onClick={() => handleReplyDelete(comment._id)}>Delete Reply</button>
                            </CommentCard>
                        ))
                        
                    }
                </div>
                
                {
                    reply && 
                    <FormInput 
                        id= {comment._id}
                        socket= {socket}
                        name = {name}
                        setReply = {setReply}
                        send= "replyComment"
                    />
                }

            </CommentCard>
        </div>
    )
}

export default CommentItem