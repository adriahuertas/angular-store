import { Component, OnDestroy, OnInit } from "@angular/core"
import { Subscription } from "rxjs"
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
<<<<<<< HEAD
  rowHeight = ROWS_HEIGHT[this.cols]
  category: string | undefined
  constructor() {}
=======
>>>>>>> origin/feature/service/store

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
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory
  }
}
