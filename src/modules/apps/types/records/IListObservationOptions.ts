import { IPaginationOptions } from "../../../../types/pagination/IPaginationOptions";

export interface IListObservationOptions extends IPaginationOptions {
  access_token: string;
  station_id: number;
  start_date: Date;
  end_date: Date;
  ip: string;
}
