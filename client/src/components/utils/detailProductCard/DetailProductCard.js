import React from 'react'
import './DetailProductCard.css'
import Rating from '../rating/Rating'

function DetailProductCard({product}){


    return (
        <div>
            <div className = "detail_product_card">
                <img src = {product.images.url} alt = "" />

                <div  className = "detail_product_card_content">
                    <h2>{product.title}</h2>
                    <div>
                        <h3 style = {{margin: '10px 0'}}>Rating : {product.numReviews} reviews</h3>
                        <Rating props = {product}/>
                    </div>
                
                    <span> Rs. {product.price}</span>
                
                    <p> {product.description} </p>
                    
        
                    <button style = {{backgroundColor: '#56C495', margin: '10px', borderRadius: "10px", border: "none", cursor: "pointer" }}> <i class="far fa-money-bill-alt"></i> {' '} Buy</button>
                    <button style = {{backgroundColor: '#EACF36', margin: '10px', borderRadius: "10px", border: "none", cursor: "pointer"  }} ><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>  {' '}Add to cart</button>
                    

                </div>
  
            </div>
            <hr></hr>

            <h2> More about Product</h2>
            <p>{product.description}</p>
           
            <hr></hr>
        </div>
    )   
}

export default DetailProductCard
