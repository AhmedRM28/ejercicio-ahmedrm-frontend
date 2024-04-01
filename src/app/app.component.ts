import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Price } from './price';
import { PriceService } from './price.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  prices: Price[] = [];

  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.getAllPrices();
  }

  public getAllPrices(): void {
    this.priceService.getAllPrices().subscribe({
      next: (response: Price[]) => {
        this.prices = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  public onOpenModal(price: any): void {
    const button = document.getElementById("priceModificationModal");
    if (price == null)
      button?.setAttribute("data-target", '#addPrice');
    else if (price?.id > 0)
      button?.setAttribute("data-target", '#editPrice');  
    else 
      button?.setAttribute("data-target", '#deletePrice');  
  }
}
