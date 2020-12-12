import { ICity } from "./ICity.model";
import { IEntity } from "./IEntity.model";

export interface IHotel extends IEntity {
  name: string;
  cityId: number;
  stars: number;
  address: string;
  city?: ICity;
}
