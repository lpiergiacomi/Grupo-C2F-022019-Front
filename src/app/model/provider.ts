import { Menu } from 'src/app/model/menu';

export class Provider {
    id: number;
    name: string;
    logo: string;
    locality: string;
    address: string;
    description: string;
    site: string;
    mail: string;
    password: string;
    phone: string;
    daysAttention: [];
    attentionTimeBegin: string;
    attentionTimeEnd: string;
    deliveryLocalities: [];
    menus: Array<Menu>;
    credit: number;
    type: string;
    reputation: number;
}