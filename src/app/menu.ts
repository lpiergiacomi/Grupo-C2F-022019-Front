import { Provider } from '@angular/compiler/src/core';

export class Menu {
    id: number;
    name: string;
    description: string;
    categories: [];
    deliveryPrice: number;
    validityDateBegin: string;
    validityDateEnd: string;
    deliveryTimeBegin: string;
    deliveryTimeEnd: string;
    price: number;
    minQuantity: number;
    minQuantityPrice: number;
    minQuantity2: number;
    minQuantityPrice2: number;
    maxSalesPerDay: number;
    qualification: number;
    provider: Provider;
}