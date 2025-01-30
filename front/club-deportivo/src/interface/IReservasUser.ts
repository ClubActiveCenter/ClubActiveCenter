import { IActivity } from "./IActivity";

export interface IReservasUser {
  id: string;
  date: string;
  status: boolean;
  price: number;
  activities: IActivity[];
}
