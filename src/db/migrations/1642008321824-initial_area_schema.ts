import {MigrationInterface, QueryRunner} from "typeorm";

export class initialAreaSchema1642008321824 implements MigrationInterface {
    name = 'initialAreaSchema1642008321824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`states\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`aws_code\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_92c8ae5146c8f23a9ab62e497b\` (\`id\`, \`name\`, \`aws_code\`), UNIQUE INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` (\`name\`), UNIQUE INDEX \`IDX_ed3820ee2e611f822159d134bf\` (\`aws_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`districts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`aws_code\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`stateId\` int NULL, INDEX \`IDX_0e726343fc445491607458c6b6\` (\`id\`, \`name\`, \`aws_code\`), UNIQUE INDEX \`IDX_7d7b3b3595f8619ddf173f6621\` (\`aws_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`districts\` ADD CONSTRAINT \`FK_2f1d5fff23055266790cc374f0c\` FOREIGN KEY (\`stateId\`) REFERENCES \`states\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`districts\` DROP FOREIGN KEY \`FK_2f1d5fff23055266790cc374f0c\``);
        await queryRunner.query(`DROP INDEX \`IDX_7d7b3b3595f8619ddf173f6621\` ON \`districts\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e726343fc445491607458c6b6\` ON \`districts\``);
        await queryRunner.query(`DROP TABLE \`districts\``);
        await queryRunner.query(`DROP INDEX \`IDX_ed3820ee2e611f822159d134bf\` ON \`states\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` ON \`states\``);
        await queryRunner.query(`DROP INDEX \`IDX_92c8ae5146c8f23a9ab62e497b\` ON \`states\``);
        await queryRunner.query(`DROP TABLE \`states\``);
    }

}
