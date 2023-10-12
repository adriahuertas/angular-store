import { Component, EventEmitter, OnInit, Output } from "@angular/core"

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>()
  @Output() itemsCountChange = new EventEmitter<number>()
  @Output() sortChange = new EventEmitter<string>()
  sort = "desc"
  itemsShowCount = 12
  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    if (this.sort !== newSort) {
      this.sort = newSort
      this.sortChange.emit(newSort)
    }
  }

  onItemsUpdated(newItemsCount: number): void {
    if (this.itemsShowCount !== newItemsCount) {
      this.itemsShowCount = newItemsCount
      this.itemsCountChange.emit(newItemsCount)
    }
  }

  onColumnsUpdated(newColNum: number): void {
    this.columnsCountChange.emit(newColNum)
  }
}
