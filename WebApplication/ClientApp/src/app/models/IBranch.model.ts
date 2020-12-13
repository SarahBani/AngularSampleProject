import { IEntity } from "./IEntity.model";

export interface IBranch extends IEntity {
  bankId: number;
  name: string;
  code: string;
  address: string;
}
