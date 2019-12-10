import { Order } from './order';
export class Client {
    constructor(public firstName: string, public lastName: string, public mail: string, public password: string, public phone: string, public locality: string, public address: string) {}
    credit: number;
    orders: Array<Order>;
    type: string;
}