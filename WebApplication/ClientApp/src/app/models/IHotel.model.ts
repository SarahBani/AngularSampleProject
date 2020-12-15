import { ICity } from "./ICity.model";
import { IEntity } from "./IEntity.model";
import { IHotelPhoto } from "./IHotelPhoto.model";

export interface IHotel extends IEntity {
  name: string;
  cityId: number;
  stars: number;
  address: string;
  city?: ICity;
  photos?: IHotelPhoto[];
}
