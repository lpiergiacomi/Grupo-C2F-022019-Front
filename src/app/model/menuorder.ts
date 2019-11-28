import { Menu } from 'src/app/model/menu';

export class MenuOrder {
    constructor(public menu: Menu, public quantity: number) {}
}