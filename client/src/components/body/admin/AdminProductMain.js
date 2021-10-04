import React, { useContext } from "react"
import { DataContext } from "../../../GlobalState"
import AdminProduct from "./AdminProduct"
import Sidebar from './Sidebar'

import './AdminProductStyle.css'

function AdminProductMain(){

    const state = useContext(DataContext)
    const [products] = state.products

    // console.log(products)

    return (
        <div  className = "adminPageRow" >

          <div >
            <Sidebar />
            </div>

               
                    <table style = {{margin: "20px"}}>
                        <tr style = {{backgroundColor: "#c5c7c6"}}>
                            <th>Product Name</th>
                            <th>Username</th>
                            <th>comment</th>
                            <th>Date and Time</th>
                            <th>-</th>
                        </tr>
                    
                            {
                                products.map(product => (
                                    <AdminProduct key = {product._id} product = {product} />
                                    
                                ))
                            }
            
                        
                    </table>
              


        </div>
    )
}

export default AdminProductMain