import { CustomError, GeneralStatusCodes } from "../../../core/errors/CustomError";
import { SQLDatabase } from "../../../db/SQLDatabase";
import { District } from "../entities";
import { IListDistrictOptions } from "../types/district/IListDistrictOptions";
import { DistrictValidators } from "../validators/DistrictValidators";

export const list_districts = async (options: IListDistrictOptions): Promise<District[]> => {
  if (!DistrictValidators.isListDistrictOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, DistrictValidators.error);
  }

  const districts = await SQLDatabase.conn.getRepository(District).find({ where: { state: { id: options.state_id } } });
  return districts.map((district) => District.clean(district));
};
