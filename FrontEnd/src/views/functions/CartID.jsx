import React from 'react'

const CartID = () => {
    const doesCartIDExist = localStorage.getItem("cartID") 
    if(!doesCartIDExist){
        const len =30
        const characters = "ABCDEFGHIJKL123567"
        let cartID = ""
        for(let i =0; i < len; i++){
            const index = Math.floor(Math.random() * characters.length)
            cartID += characters[index]
        }
        localStorage.setItem("cartID" , cartID)
    }
    return doesCartIDExist
}

export default CartID