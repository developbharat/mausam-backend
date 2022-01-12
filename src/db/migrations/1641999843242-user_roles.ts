import { MigrationInterface, QueryRunner } from "typeorm";
import { __AUTH_ROLE_ID_ADMIN__, __AUTH_ROLE_ID_CLIENT__ } from "../../constants";

export class userRoles1641999843242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user_roles (id, role_name, description) VALUES
          ('${__AUTH_ROLE_ID_ADMIN__}', 'admin', 'only to be used by site admins.'),
          ('${__AUTH_ROLE_ID_CLIENT__}', 'client', 'only to be used by site users.')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user_roles WHERE "id" = ${__AUTH_ROLE_ID_ADMIN__} AND "id" = ${__AUTH_ROLE_ID_CLIENT__};`
    );
  }
}
