import { IEntity } from "./IEntity.model";
import { IHotel } from "./IHotel.model";

export interface IHotelPhoto extends IEntity {  
  photoUrl: string;
  hotel?: IHotel;
}
