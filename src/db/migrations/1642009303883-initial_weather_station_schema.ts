import {MigrationInterface, QueryRunner} from "typeorm";

export class initialWeatherStationSchema1642009303883 implements MigrationInterface {
    name = 'initialWeatherStationSchema1642009303883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`observation_stations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`aws_code\` varchar(255) NOT NULL, \`cat_code\` varchar(20) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`districtId\` int NULL, INDEX \`IDX_f2a112409e6220203d651d4a85\` (\`id\`, \`name\`, \`aws_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`observation_stations\` ADD CONSTRAINT \`FK_09f9e398468864483be4913ce09\` FOREIGN KEY (\`districtId\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`observation_stations\` DROP FOREIGN KEY \`FK_09f9e398468864483be4913ce09\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2a112409e6220203d651d4a85\` ON \`observation_stations\``);
        await queryRunner.query(`DROP TABLE \`observation_stations\``);
    }

}
