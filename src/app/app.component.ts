import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Price } from './price';
import { PriceService } from './price.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Brand } from './brand';
import { BrandService } from './brand.service';
import { OpResult } from './op-result';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  prices: Price[] = [];
  brands: Brand[] = [];

  editedPrice: Price | undefined;
  detelePriceId: number = -1;

  operationResult: OpResult = {
    status: "",
    message: ""
  };

  constructor(private priceService: PriceService, private brandService: BrandService) { }

  ngOnInit() {
    this.getAllPrices();
    this.getAllBrands();
  }

  public getAllBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (response: Brand[]) => {
        this.brands = response;
      },
      error: (error: HttpErrorResponse) => {
        this.openOperationResultModal("Error", error.message);
      }
    })
  };

  public getAllPrices(): void {
    this.priceService.getAllPrices().subscribe({
      next: (response: Price[]) => {
        this.prices = response;
      },
      error: (error: HttpErrorResponse) => {
        this.openOperationResultModal("Error", error.message);
      }
    });
  }

  public onAddOrUpdatePrice(form: NgForm): void {
    const brand = this.brands.find(b => b.id == form.value.brand);
    form.value.brand = brand;
    let price:Price = form.value;    
    if (price.id == null) {
      this.priceService.addPrice(price).subscribe({
        next: (response: Price) => {
          this.openOperationResultModal("Correct!", "Price created successfully");
          this.getAllPrices();
        },
        error: (error: HttpErrorResponse) => {
          this.openOperationResultModal("Error", error.message);
        }
      })
    } else {
      this.priceService.updatePrice(price).subscribe({
        next: (response: Price) => {
          this.openOperationResultModal("Correct!", "Price updated successfully");
          this.getAllPrices();
          this.editedPrice = undefined;
        },
        error: (error: HttpErrorResponse) => {
          this.openOperationResultModal("Error", error.message);
        }
      })
    }
  }

  public onDeletePrice(priceId: number): void {
    this.priceService.deletePrice(priceId).subscribe({
      next: (response: void) => {
        this.openOperationResultModal("Correct!", "Price deleted successfully");
        this.getAllPrices();
        this.detelePriceId = -1;
      },
      error: (error: HttpErrorResponse) => {
        this.openOperationResultModal("Error", error.message);
      }
    })
  }

  public onOpenModal(price: any): void {
    const button = document.createElement("priceModificationModal");
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", price == null || price?.id > 0 ? "#addOrEditPrice" : "#deletePrice");
    if (price == null) this.editedPrice = undefined;
    else if (price?.id > 0) this.editedPrice = price;
    else this.detelePriceId = price;
    document.getElementById("listPricesPage")?.appendChild(button);
    button.click();
  }

  public openOperationResultModal(status: string, message: string): void {
    this.operationResult.status = status;
    this.operationResult.message = message;
    const button = document.createElement("operationResultModalButton");
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#operationResultModal");
    document.getElementById("operationResultModal")?.appendChild(button);
    button.click();
  }
}
