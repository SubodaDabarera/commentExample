import React, {useContext, useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {DataContext} from '../../../GlobalState'
import {getData} from '../../utils/FetchData'


import DetailProductCard from '../../utils/detailProductCard/DetailProductCard'
import FormInput from '../../utils/formInput/FormInput'
import CommentItem from '../../utils/commentItem/CommentItem'
import { useGlobalState } from 'state-pool'

function DetailProduct(){
    const {id} = useParams()  

    const state = useContext(DataContext)
    const [products] = state.products
    const socket = state.socket

    // console.log(products)

    const [detailProduct, setDetailProduct] = useState([])
    
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
  //const [GlobalUserDetails, setGlobalUserDetails] = useGlobalState("GlobalUserDetails")

    //#####################################################################################
    //for testing
    const [userAuth, setUserAuth] = useState(true)
    const [userInfo, setUserInfo] = useState((localStorage.getItem("userInfo")))
    const [userRole, setUserRole] = useState((localStorage.getItem("userRole"))) 
    


    useEffect(() => {
        setDetailProduct(products.filter(product => product._id === id) )
       
       
    }, [id, products])

 
    useState(() => {
        setLoading(true)
        getData(`/api/comments/${id}`)
            .then(res => {
                setComments(res.data.comments)
                setLoading(false)
            })

            .catch(err => console.log(err.responce.data.msg))
    }, [id])

    //Realtime
    //Join room
    useEffect(() => {
        if(socket){
            socket.emit('JoinRoom', id)
        }
    },[socket, id] )

    useEffect(() => {
        if(socket){
            socket.on('sendCommentToClient', msg => {
                setComments([msg, ...comments])
            })

            return () => socket.off('sendCommentToClient')
        }
    },[socket, comments])

  

    //end realtime

    //Reply comments with realtime
    useEffect(() => {
        if(socket){
            socket.on('sendReplyCommentToClient', msg => {
                const newArr = [...comments]

                newArr.forEach(cm => {
                    if(cm._id === msg._id){
                        cm.reply = msg.reply
                    }
                })
                setComments(newArr)
            })

            return () => socket.off('sendReplyCommentToClient')
        }
    },[socket, comments])

   

    return (
        <div className = "detail_product_page"> 

            {
                detailProduct.map(product => (
                    <DetailProductCard key = {product._id} product = {product}/>
                ))
            }
         
            <div className = "comments">
                <h2 className = "app_title">
                    Feedbacks and Reviews
                </h2>

            {   userInfo ? 
                <>

                    <div className = "reviews">
                        <input type="radio" name="rate" id="rd-5" onChange = {() => setRating(5)}/>
                        <label htmlFor="rd-5" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-4" onChange = {() => setRating(4)}/>
                        <label htmlFor="rd-4" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-3" onChange = {() => setRating(3)}/>
                        <label htmlFor="rd-3" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-2" onChange = {() => setRating(2)}/>
                        <label htmlFor="rd-2" className="fas fa-star"></label>

                        <input type="radio" name="rate" id="rd-1" onChange = {() => setRating(1)}/>
                        <label htmlFor="rd-1" className="fas fa-star"></label>
                        
                    </div>
                        <FormInput id={id} socket={socket} rating={rating}> </FormInput>
                
                </>  
                :
                <p> Wants to post a comment, First <Link to = "/signin" style = {{color: "#a66cd9"}}>Log In </Link> </p>
            } 

                <div className = "comments_list">
                    {
                        comments.map(comment => (
                            <CommentItem key = {comment._id} comment = {comment} socket= {socket}/>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default DetailProduct