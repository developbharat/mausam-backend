import { CustomError, GeneralStatusCodes } from "../../../../core/errors/CustomError";
import { SQLDatabase } from "../../../../db/SQLDatabase";
import { District } from "../../entities";
import { ICreateDistrictOptions } from "../../types/district/admin/ICreateDistrictOptions";
import { IDeleteDistrictOptions } from "../../types/district/admin/IDeleteDistrictOptions";
import { DistrictValidators, StateValidators } from "../../validators";

export const create_new_district = async (options: ICreateDistrictOptions): Promise<District> => {
  if (!DistrictValidators.isCreateDistrictOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, StateValidators.error);
  }

  const exists = await SQLDatabase.conn.getRepository(District).findOne({ where: { aws_code: options.aws_code } });
  if (!!exists)
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `District with provided aws code: ${options.aws_code}, already exists.`
    );

  const district = await SQLDatabase.conn.getRepository(District).save({
    name: options.name,
    aws_code: options.aws_code
  });

  return District.clean(district);
};

export const delete_district = async (options: IDeleteDistrictOptions): Promise<District> => {
  if (!DistrictValidators.isDeleteDistrictOptionsValid(options)) {
    throw new CustomError(GeneralStatusCodes.BadRequest, DistrictValidators.error);
  }

  const district = await SQLDatabase.conn.getRepository(District).findOne({ where: { id: options.district_id } });
  if (!district)
    throw new CustomError(
      GeneralStatusCodes.NotFound,
      `State with provided id: ${options.district_id}, doesn't exist.`
    );

  await SQLDatabase.conn.getRepository(District).delete({ id: options.district_id });
  return District.clean(district);
};
