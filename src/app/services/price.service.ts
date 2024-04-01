import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Price } from "../models/price";

@Injectable({ providedIn: 'root' })

export class PriceService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    public getAllPrices(): Observable<Price[]> {
        return this.http.get<Price[]>(this.baseUrl + "/price")
    }

    public getPriceById(priceId: number): Observable<Price> {
        return this.http.get<Price>(this.baseUrl + "/price/" + priceId)
    }

    public addPrice(price: Price): Observable<Price> {
        return this.http.post<Price>(this.baseUrl + "/price", price)
    }

    public updatePrice(price: Price): Observable<Price> {
        return this.http.put<Price>(this.baseUrl + "/price/" + price.id, price)
    }

    public deletePrice(priceId: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + "/price/" + priceId)
    }
}