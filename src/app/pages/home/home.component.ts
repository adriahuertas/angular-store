import { Component, OnDestroy, OnInit } from "@angular/core"
import { Subscription } from "rxjs"
import { StoreService } from "src/app/services/store.service"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3

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
      .getAllProducts(this.count, this.sort)
      .subscribe((products) => {
        this.products = products
      })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum
  }
}
