import { ICity } from "./ICity.model";

export interface ICountry {
  id: number;
  name: string;
  flagUrl: string;
  cities: ICity[]
}
