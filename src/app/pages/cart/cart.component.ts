import { Component, OnInit } from "@angular/core"
import { Cart, CartItem } from "src/app/models/cart.model"
import { CartService } from "src/app/services/cart.service"

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  }
  dataSource: Array<CartItem> = []
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ]

  constructor(private cartService: CartService) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items)
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveFromCart(item: CartItem): void {}

  onRemoveQuantity(item: CartItem): void {}

  onClearCart(): void {
    this.cartService.clearCart()
  }

  onCheckout(): void {}
}
