import { Provider } from 'src/app/model/provider';  
export class Menu {
    id: number;
    name: string;
    description: string;
    categories: [];
    deliveryPrice: number;
    validityDateBegin: string;
    validityDateEnd: string;
    deliveryTimeAverage: number;
    price: number;
    minQuantity: number;
    minQuantityPrice: number;
    minQuantity2: number;
    minQuantityPrice2: number;
    maxSalesPerDay: number;


    deliveryTimeBegin: string;
    deliveryTimeEnd: string;
    preparationTime: number;
    qualification: number;
    provider: Provider;
}