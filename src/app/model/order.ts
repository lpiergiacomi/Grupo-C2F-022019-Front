import { Provider } from './provider';
import { Client } from './client';

export class Order {
    provider: Provider;
    client: Client;
    deliveryType: string;
    amount: number
}