import { Order } from './order';
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
    orders: Array<Order>;
    type: string = 'Client';
}