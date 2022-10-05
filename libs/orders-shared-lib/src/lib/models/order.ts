import { OrderItem } from "./order-item";
import { User } from "@pinkbits/users-auth-shared-lib";


export class Order {
    id?: string;
    orderItems: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    pin?: string;
    country?: string;
    phone?: string;
    state?: string;
    status?: any;
    totalPrice?: string;
    user?: any;
    dateOrdered?: string;
}