import { CustomError, GeneralStatusCodes } from "../../../../core/errors/CustomError";
import { SQLDatabase } from "../../../../db/SQLDatabase";
import { State } from "../../entities";
import { ICreateStateOptions } from "../../types/state/admin/ICreateStateOptions";
import { IDeleteStateOptions } from "../../types/state/admin/IDeleteStateOptions";
import { StateValidators } from "../../validators";

export const create_new_state = async (options: ICreateStateOptions): Promise<State> => {
  if (!StateValidators.isCreateStateOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, StateValidators.error);
  }

  const exists = await SQLDatabase.conn.getRepository(State).findOne({ where: { aws_code: options.aws_code } });
  if (!!exists)
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `State with provided aws code: ${options.aws_code}, already exists.`
    );

  const state = await SQLDatabase.conn.getRepository(State).save({
    name: options.name,
    aws_code: options.aws_code
  });

  return state;
};

export const delete_state = async (options: IDeleteStateOptions): Promise<State> => {
  if (!StateValidators.isDeleteStateOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, StateValidators.error);
  }

  const state = await SQLDatabase.conn.getRepository(State).findOne({ where: { id: options.state_id } });
  if (!state)
    throw new CustomError(GeneralStatusCodes.NotFound, `State with provided id: ${options.state_id}, doesn't exist.`);

  await SQLDatabase.conn.getRepository(State).delete({ id: options.state_id });
  return state;
};
