import { Component, OnDestroy, OnInit } from "@angular/core"
import { Subscription } from "rxjs"
import { Product } from "src/app/models/product.model"
import { CartService } from "src/app/services/cart.service"
import { StoreService } from "src/app/services/store.service"

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3
  rowHeight = ROWS_HEIGHT[this.cols]
  category: string | undefined

  products: Array<Product> | undefined
  sort = "desc"
  count = 12
  productsSubscription: Subscription | undefined

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe()
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((products) => {
        this.products = products
      })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onItemsCountChange(count: number): void {
    this.count = count
    this.getProducts()
  }

  onSortChange(sort: string): void {
    this.sort = sort
    this.getProducts()
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory === "All" ? undefined : newCategory
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      product: product.image,
    })
  }
}
