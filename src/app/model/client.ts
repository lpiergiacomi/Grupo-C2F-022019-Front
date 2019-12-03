import { Order } from './order';
export class Client {
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    locality: string;
    address: string;
    credit: number;
    orders: Array<Order>;
    type: string;
}