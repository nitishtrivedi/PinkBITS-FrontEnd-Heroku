/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Observable to monitor items being added in the cart

  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: []
      }
      const initialCartJson = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY, initialCartJson)
    }     
  }

  //EMPTY CART after placing the order

  emptyCart () {
    const initialCart = {
      items: []
    }

    const initialCartJson = JSON.stringify(initialCart)
    localStorage.setItem(CART_KEY, initialCartJson);
    this.cart$.next(initialCart);
  }


  //GET initial cart items from local storage

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }


  setCartItem (cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();

    //Check if item exist in cart. If exist, increase quantity, else, add product to cart
    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId)
    if(cartItemExist) {
      cart.items.map((item) => {
        if(item.productId === cartItem.productId){
          if (updateCartItem) {
            item.quantity = cartItem.quantity
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }          
        }
        return item;
      })
    } else {
      //Push items to cart
      cart.items.push(cartItem);
    }


    //Data processing
    const cartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJson)

    this.cart$.next(cart);

    return cart;
  }



  deleteCartItem(productId: string) {
    //GET Cart and Delete that particular ID by using .filter method
    const cart = this.getCart();
    const newCart = cart.items.filter(item => item.productId !== productId)

    //Initialize new updated cart
    cart.items = newCart;

    //Data processing for updated cart
    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);
    this.cart$.next(cart);
  }


}
