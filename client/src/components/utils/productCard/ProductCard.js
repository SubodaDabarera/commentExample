import React from 'react'
import {Link} from 'react-router-dom'
import './productCard.css'


function ProductCard({product}){
    return (
        <div className = "product_card">
            
            <img src = {product.images.url} alt = ""/>
            <h3>{product.title}</h3>
            <span> Rs. {product.price}</span>
            <p>{product.description}</p>
           

            <div className = "product_card_row">
                <Link to={`/product/${product._id}`} style = {{borderRadius: "10px"}}>View</Link>
                <button style = {{borderRadius: "10px"}}> Buy </button>
            </div>

        </div>
    )   
}

export default ProductCard