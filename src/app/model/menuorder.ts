import { Menu } from 'src/app/model/menu';

export class MenuOrder {
    id: number;
    idClient: number;
    menu: Menu;
    quantity: number;
    deliveryType: string;
    deliveryDate: string;
    deliveryTime: string;
    qualification: number;
}