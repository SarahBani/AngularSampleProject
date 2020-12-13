import { ICountry } from "./ICountry.model";
import { IEntity } from "./IEntity.model";

export interface ICity extends IEntity {
  countryId: number;
  name: string;
  country: ICountry;
}
