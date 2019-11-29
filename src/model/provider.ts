import { Menu } from '../model/menu';

export class Provider {
    id: number;
    name: string;
    logo: string;
    locality: string;
    address: string;
    description: string;
    site: string;
    mail: string;
    phone: string;
    attentionTimeBegin: string;
    attentionTimeEnd: string;
    attentionDayBegin: string;
    attentionDayEnd: string;
    deliveryLocalities: [];
    menus: Array<Menu>;
    credit: number;
    type: string;
}