export interface IOrder {
    id: number;
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice:number;
    status: string;
    orderRows:Array<{}>
}