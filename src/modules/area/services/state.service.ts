import { SQLDatabase } from "../../../db/SQLDatabase";
import { State } from "../entities";

export const list_states = async (): Promise<State[]> => {
  return await SQLDatabase.conn.getRepository(State).find();
};
