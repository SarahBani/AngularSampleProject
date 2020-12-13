import { ICity } from "./ICity.model";
import { IEntity } from "./IEntity.model";

export interface ICountry extends IEntity {
  name: string;
  flagUrl?: string;
  cities?: ICity[]
}
