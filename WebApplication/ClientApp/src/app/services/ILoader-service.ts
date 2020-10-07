import { Subject } from "rxjs";

export interface ILoaderService {
    
  changeLoaderStatus : Subject<boolean>;
 
}
