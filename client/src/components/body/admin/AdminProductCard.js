import React from "react"
import { Link } from "react-router-dom"
import './AdminProductStyle.css'

function AdminProductCard(props){

    //In props, I can get product title and comment from calling Component

    //set path
    const productId = props.product._id;
    const path = `/product/${productId}`;

    return(
        
        <tr>
                <td> {props.product.title}</td>
                <td>{props.comment.username}</td>
                <td>{props.comment.content}</td>
                <td>{props.comment.createdAt}</td>
                <td>

                    <Link to = {path}> 
                         <button className = "AdminReplybtn"  >
                            Reply <i style = {{backgroundColor: "none"}} class="fas fa-reply"></i>
                         </button>
                    </Link>
                   
                </td>
         </tr>
        
    )
}

export default AdminProductCard