import {ADD_TO_CART,REMOVE_FROM_CART, SAVE_SHIPPING_INFO} from "../constants/CartConstatnt"
import axios from "axios";

export const addItemsToCart = (id,qunatity)=>async(dispatch,getState)=>{
        let {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({type:ADD_TO_CART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images.length>=1?data.product.images[0].url:"",
                stock:data.product.stock,
                qunatity
            }
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().Cart.cartItems));
}

export const removeFromCart = (id)=>async(dispatch,getState)=>{
    dispatch({type:REMOVE_FROM_CART,
        payload:id
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().Cart.cartItems));
}

export const saveShippingInfo = (data)=>async(dispatch,getState)=>{
    dispatch({type:SAVE_SHIPPING_INFO,
        payload:data
    })

    localStorage.setItem("shippingInfo",JSON.stringify(data));
}