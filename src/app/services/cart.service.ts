import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Cart, CartItem } from "../models/cart.model"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]
    const index = items.findIndex((i) => i.id === item.id)
    if (index === -1) {
      items.push(item)
    } else {
      items[index].quantity += 1
    }

    this.cart.next({ items })
    this._snackBar.open("Product added to cart", "Ok", {
      duration: 3000,
    })
  }

  removeFromCart(item: CartItem): void {
    const items = [...this.cart.value.items]
    const filteredCart = items.filter((i) => i.id !== item.id)

    this.cart.next({ items: filteredCart })

    this._snackBar.open("Product removed from cart", "Ok", {
      duration: 3000,
    })
  }

  removeQuantity(item: CartItem): void {
    const items = [...this.cart.value.items]
    const index = items.findIndex((i) => i.id === item.id)
    if (index === -1) {
      return
    } else {
      if (items[index].quantity === 1) {
        this.removeFromCart(item)
      } else {
        items[index].quantity -= 1
        this.cart.next({ items })

        this._snackBar.open("Product quantity updated", "Ok", {
          duration: 3000,
        })
      }
    }
  }

  getTotal(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0)
  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackBar.open("Cart cleared", "Ok", {
      duration: 3000,
    })
  }
}
