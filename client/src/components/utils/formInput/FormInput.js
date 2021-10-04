import React, {useRef, useEffect} from 'react'
import './FormInput.css'
import {patchData} from '../../utils/FetchData'

function FormInput({id, socket, rating, setReply, send, name, update, setEditReply}){
    const nameRef = useRef()
    const contentRef = useRef()
    
    
    useEffect(() => {
        if(name && update){
            contentRef.current.innerHTML = `
            <a href="#!"
                style="color: crimson;
                font-weight: 600;
                text-transform: capitalize;"
            > ${update}</a> `
            
        }
        else if(name){
            contentRef.current.innerHTML = `
            <a href="#!"
                style="color: crimson;
                font-weight: 600;
                text-transform: capitalize;"
            >${name}: </a> `
        }
    }, [name, update])


    const commentSubmit = () => {
        const username = localStorage.getItem("userInfo").replaceAll('"', '')
        // nameRef.current.value
        const content = contentRef.current.innerHTML

        // if(!username.trim()) return alert('Name cannot be empty!!!')
        if(contentRef.current.textContent.trim().length < 20)
            return alert('Contents too short, must be at least 20 characters')

        const createdAt = new Date().toISOString()
        
        
        socket.emit('createComment', {
            username, content, product_id: id, createdAt, rating, send
        })

        if(rating && rating !== 0){
            patchData(`/api/products/${id}`, {rating})
        }
        
        
        contentRef.current.innerHTML = ''

        if(setReply) setReply(false)
        if(setEditReply) setEditReply(false)


    }


    return(
        <div className = "form_input">
           {/* <p> Name</p>
           <input type = "text" ref = {nameRef} /> */}

           <p> Content</p>
           <div ref = {contentRef}
                contentEditable = "true"

                style = {{
                    height: '100px',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline : 'none'
                }}
           />

           <button style = {{borderRadius: "10px"}} onClick={commentSubmit} >Post</button>

        </div>
    )
}

export default FormInput