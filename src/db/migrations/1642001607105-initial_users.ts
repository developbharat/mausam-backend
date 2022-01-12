import { MigrationInterface, QueryRunner } from "typeorm";

export class initialUsers1642001607105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // plain text: password
    const password_hash =
      "$argon2i$v=19$m=4096,t=3,p=1$DQHziuvjzDk/aSOS0h7Ndw$FB46rnqgO+ySylOMbDI4JYPSwjXpIgfUeJwcooU1GJQ";

    await queryRunner.query(`INSERT IGNORE INTO user_profiles (\`id\`, \`full_name\`) VALUES (1, 'Site Admin');`);
    await queryRunner.query(
      `INSERT IGNORE INTO users (\`id\`, \`email\`, \`passcode\`, \`profileId\`, \`roleId\`) VALUES (1, 'admin@site.com', '${password_hash}', 1, 1);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE id=1;`);
    await queryRunner.query(`DELETE FROM user_profiles WHERE id=1;`);
  }
}
