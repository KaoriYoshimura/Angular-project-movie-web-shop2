import { Observable } from 'rxjs';
import { IProduct } from './iproduct'
import { IPlacedOrders, IPlacedOrderRow } from './iplaced-orders';
import { IOrder } from './iorder';
import { ICategory } from './icategory';

export interface IdataService {
    // How to test?
    // onNotifyCartAmoutUpdated(updated: number);
    getData():Observable<IProduct[]>;
    getDetailById(id: number): Observable<IProduct>;
    getSessionCartItems():void;
    // countNumberOfCartItems():void;
    addToCart(cartItems: IProduct[]): void;
    RemoveFromSessionStorage(item: number):void;
    getOrders(): Observable<IPlacedOrders[]>;
    getSessionUserData():void;
    // To be tested by e2e test
    // submitOrder(order: IOrder): Observable<IOrder>;
    searchProductApi(Query: string):Observable<IProduct[]>;
    getCategory():Observable<ICategory[]>;
    getOrders(): Observable<IPlacedOrders[]>;
    // getOrderDetailById(id: number): Observable<IPlacedOrders>;
    // To be tested by e2e test?
    // updateOrders(id:number, updateOrder:IPlacedOrders): Observable<IPlacedOrders>;
    deleteOrder(id:number): Observable<IOrder>;
}
