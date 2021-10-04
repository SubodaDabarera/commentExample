import React, {Children, useContext} from 'react'
import {DataContext, DataProvider} from '../../../GlobalState'
import ProductCard from '../../utils/productCard/ProductCard'



function Products(){

    const state = useContext(DataContext)
    const [products] = state.products

    console.log(products)

    return (
        <div>
        {/*  <Header />  */}
            <div className = "products_page">
            
                {
                    products.map(product => (
                        <ProductCard key = {product._id} product = {product} />
                        
                    ))
                }
            
            </div>
        </div>
    )
    
}

export default Products