import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    try{
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }catch(error) {
        console.log('Error parsing cart from localStorage :- ',error);
        return [];
    }
};

const initialState = getInitialState();

export const Cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            state = state.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },
        decrementQuantity: (state, action) => {
            state = state.map(item => {
                if (item.quantity !== 0) {
                    if (item.id === action.payload) {
                        item.quantity--;
                    }
                }
                return item;

            })
        },
    },
})

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = Cartslice.actions

export default Cartslice.reducer