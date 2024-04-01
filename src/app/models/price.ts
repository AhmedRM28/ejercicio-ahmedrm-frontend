import { Brand } from "./brand";

export interface Price {
    id: number;
    brand: Brand;
    startDate: Date;
    endDate: Date;
    priceList: number;
    productId: number;
    priority: number;
    price: number,
    currency: string;
}