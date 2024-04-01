import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Brand } from "./brand";

@Injectable({ providedIn: 'root' })

export class BrandService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    public getAllBrands(): Observable<Brand[]> {
        return this.http.get<Brand[]>(this.baseUrl + "/brand")
    }
}