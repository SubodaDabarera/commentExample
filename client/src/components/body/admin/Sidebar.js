import React from 'react'
import './AdminProductStyle.css'

function Sidebar() {
    return (
        <div style = {{backgroundColor: "#212120"}}>
            <div className = "sidebar" style = {{backgroundColor: "#212120"}}>
            
                <ul className = "sidebarlist">
                
                    <li className = "row" ><i class="fa fa-comments" aria-hidden="true" id = "icon"></i><div id = "title">Comments</div></li>
                    <li  className = "row" style = {{marginTop: "20px"}}><i class="fas fa-file-export" id = "icon"></i><div id = "title">Reports</div></li>
                </ul>
                
                
            </div> 
        </div>


        )
}

export default Sidebar
