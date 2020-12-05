import { ICountry } from "./ICountry.model";

export interface ICity {
  id: number;
  countryId: number;
  name: string;
  country: ICountry;
}
