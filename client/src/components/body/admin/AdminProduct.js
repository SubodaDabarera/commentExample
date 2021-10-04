import React, { useContext, useState } from "react";
import { DataContext } from "../../../GlobalState";
import { getData } from "../../utils/FetchData";
import AdminProductCard from './AdminProductCard'
import './AdminProductStyle.css'

function AdminProduct({product}){

    const id = product._id
    const [comments, setComments] = useState([])

  


    useState(() => {
        
        getData(`/api/comments/${id}`)
            .then(res => {
                setComments(res.data.comments)
            })
            .catch(err => console.log(err.responce.data.msg))
    }, [id])

    

    return (
        <>
            {
                comments.map(comment => (
                    <AdminProductCard key = {comment._id} comment = {comment} product = {product} />
                ))
            }  
        </>    

    )
}

export default AdminProduct