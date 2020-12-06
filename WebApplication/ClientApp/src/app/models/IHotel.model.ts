import { ICity } from "./ICity.model";

export interface IHotel {
  id: number;
  name: string;
  cityId: number;
  stars: number;
  address: string;
  city?: ICity;
}
