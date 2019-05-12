import { Observable } from 'rxjs';
import { IProduct } from './iproduct'

export interface IdataService {
    getData():Observable<IProduct[]>;
}
