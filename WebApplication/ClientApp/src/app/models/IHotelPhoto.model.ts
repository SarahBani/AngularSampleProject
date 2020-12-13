import { IEntity } from "./IEntity.model";

export interface IHotelPhoto extends IEntity {  
  photoUrl: string;
  hotel?: IHotel;
}
