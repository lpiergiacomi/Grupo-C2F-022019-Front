import { MenuOrder } from './menuorder';
export class Client {
    constructor() {}
    id: number;
    firstName: string;
    lastName: string;
    mail: string;
    password: string;
    phone: string;
    locality: string;
    address: string;
    credit: number;
    orders: Array<MenuOrder>;
    type: string = 'Client';
}