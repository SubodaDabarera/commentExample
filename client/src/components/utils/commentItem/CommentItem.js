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

    const [userInfo, setUserInfo] = useState((localStorage.getItem("userInfo")))
    const [userRole, setUserRole] = useState((localStorage.getItem("userRole"))) 
    const [validateUser, setValidateUser] = useState(false)
    const [splitUser, setSplitUser] = useState('')

    //########################################################################
    //for testing
    //const [isAdmin, setIsAdmin] = useState(true)
    const [updateReply, setUpdateReply] = useState('')
    let updateDetails = ''
    const [editReply, setEditReply] = useState(false)
   

    
    const handleReply = (username) => {
        setReply(true)
        setName(username)
       
    }

    const hideReply = () =>{
        setReply(false)
    }

    //check whether user is admin or not
    if(localStorage.getItem("userRole") == "false"){
        localStorage.removeItem("userRole")
        setUserRole(null)
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


    //for updation
    const handleUpdateReply = (commentId) => {
        setEditReply(true)
        setReplyDelete(commentId)
        setUpdateReply(updateDetails)
    }
   

    //for user validation
    // useEffect(() => {
    //     if(userInfo)
    //     setSplitUser(userInfo.replaceAll('"', ''))
    // }) 

    useEffect(() => {
        if(userInfo){
            setSplitUser(userInfo.replaceAll('"', ''))
        }
    })

    if(comment.username == splitUser){
        console.log("matches")
    }

    

    if(comment.reply) {
        if(comment.reply[0]){
            // console.log(comment.reply[0].content)
            updateDetails = comment.reply[0].content
            //setUpdateReply(comment.reply[0].content)
            
        }
    }

    console.log(comment)
    
    console.log(validateUser)

    

    return (
        <div>
            <CommentCard comment = {comment}>

                
                <div className = "nav_comment">

                {   
                    userRole &&
                    <>
                    <button  style = {{backgroundColor: "#cad2d9", width: "100px", height: "20",  margin: "10px", borderRadius: "10px", cursor: "pointer", borderColor: "#e3e6e8"}} onClick={() => handleReply(comment.username)}>Reply</button> {'  '}
                    </>
                }
                   {
                       comment.username == splitUser || userRole?
                       <button style = {{backgroundColor: "#ff1c1c", width: "100px", height: "30", margin: "10px",  borderRadius: "10px", color: "white", cursor: "pointer",  borderColor: "#fc4242"}} onClick={() => handleCommentDelete(comment._id)}>Delete Comment</button>
                   
                        : null
                    }
                        
                        
                    
                
                    
                   
                    {   reply &&
                         <p onClick={hideReply}>Hide Reply</p>
                    }

                   
                </div>
                

                        <div className = "reply_comment">
                            {
                                comment.reply.map(rep => (
                                    <CommentCard comment = {rep} key={rep._id}>
                                        
                                        {
                                            userRole &&
                                            <>
                                                <button style = {{backgroundColor: "#ff1c1c", width: "100px", height: "30", margin: "10px",  borderRadius: "10px", color: "white", cursor: "pointer", borderColor: "#fc4242"}} onClick={() => handleReplyDelete(comment._id)}>Delete Reply</button>
                                                <button style = {{backgroundColor: "#cad2d9", width: "100px", height: "30", margin: "10px",  borderRadius: "10px", cursor: "pointer", borderColor: "#e3e6e8"}} onClick={() => handleUpdateReply(comment._id)}>Edit Reply</button>
                                            </>
                                        }

                                        {
                                            editReply && userRole &&
                                            <FormInput 
                                                id= {comment._id}
                                                socket= {socket}
                                                name = {name}
                                                setEditReply = {setEditReply}
                                                send= "replyComment"
                                                update = {updateDetails}
                                            />
                                        }
                                            
                                    </CommentCard>
                                ))
                                
                            }
                        </div>
                        
                        {
                            reply && userRole &&
                            <FormInput 
                                id= {comment._id}
                                socket= {socket}
                                name = {name}
                                setReply = {setReply}
                                send= "replyComment"
                                update = {updateDetails}
                            />
                        }

                        {/* {
                            editReply && isAdmin &&
                            <FormInput 
                                id= {comment._id}
                                socket= {socket}
                                name = {name}
                                setReply = {setReply}
                                send= "replyComment"
                                update = {updateDetails}
                            />
                        }
                 */}


            </CommentCard>
        </div>
    )
}

export default CommentItem