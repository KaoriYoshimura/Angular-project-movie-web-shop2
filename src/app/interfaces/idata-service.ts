import { Observable } from 'rxjs';
import { IProduct } from './iproduct'
import { IPlacedOrders } from './iplaced-orders';
import { IOrder } from './iorder';
import { ICategory } from './icategory';

export interface IdataService {
    getData():Observable<IProduct[]>;
    getDetailById(id: number): Observable<IProduct>;
    getSessionCartItems():void;
    countNumberOfCartItems():void;
    addToCart(details: IProduct):void;
    RemoveFromSessionStorage(item: number):void;
    getOrders(): Observable<IPlacedOrders[]>;
    caluculateTotalCost():void;
    getSessionUserData():void;
    // submitOrder(order: IOrder): Observable<IOrder>;
    searchProductApi(Query: string):Observable<IProduct[]>;
    getCategory():Observable<ICategory[]>;
    getOrders(): Observable<IPlacedOrders[]>;
    // updateOrders(id:number, updateOrder:IPlacedOrders): Observable<IPlacedOrders>;
    // deleteOrderRow(id:number): Observable<IPlacedOrders>;
}
