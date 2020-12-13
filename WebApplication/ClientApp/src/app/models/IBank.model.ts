import { IEntity } from "./IEntity.model";

export interface IBank extends IEntity {
  name: string;
  grade?: number;
  logoUrl?: string;
}
