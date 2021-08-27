import React, {useState, useEffect, useCallback} from 'react'
import CommentCard from './CommentCard'
import FormInput from '../formInput/FormInput'

function CommentItem({comment, socket}){
    const [reply, setReply] = useState(false)
    const [name, setName] = useState('')



    const handleReply = (username) => {
        setReply(true)
        setName(username)
       
    }

    const hideReply = () =>{
        setReply(false)
    }

    return (
        <div>
            <CommentCard comment = {comment}>
                <div className = "nav_comment">
                    <p onClick={() => handleReply(comment.username)}>Reply</p>
                    
                    <p onClick={hideReply}>Hide Reply</p>
                </div>

                <div className = "reply_comment">
                    {
                        comment.reply.map(rep => (
                            <CommentCard comment = {rep} key={rep._id}>
                                
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