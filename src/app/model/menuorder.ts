import { Menu } from 'src/app/model/menu';

export class MenuOrder {
    menu: Menu
    quantity: number
    deliveryType: string
    deliveryDate: string
    deliveryTime: string
}