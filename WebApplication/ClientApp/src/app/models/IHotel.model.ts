import { ICity } from "./ICity.model";
import { ICountry } from "./ICountry.model";

export interface IHotel {
  id: number;
  name: string;
  cityId: number;
  stars: number;
  address: string;
  country?: ICountry;
  city?: ICity;
}
