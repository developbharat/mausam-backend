import { SQLDatabase } from "../../../db/SQLDatabase";
import { State } from "../../../entities/area/State";

export const list_states = async (): Promise<State[]> => {
  return await SQLDatabase.conn.getRepository(State).find();
};
