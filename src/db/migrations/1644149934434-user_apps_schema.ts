import {MigrationInterface, QueryRunner} from "typeorm";

export class userAppsSchema1644149934434 implements MigrationInterface {
    name = 'userAppsSchema1644149934434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ipv4_addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`octet_one_from\` int NOT NULL, \`octet_one_to\` int NOT NULL, \`octet_two_from\` int NOT NULL, \`octet_two_to\` int NOT NULL, \`octet_three_from\` int NOT NULL, \`octet_three_to\` int NOT NULL, \`octet_four_from\` int NOT NULL, \`octet_four_to\` int NOT NULL, \`is_whitelisted\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_apps\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`access_token\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`IDX_849845c72b51aec29d29e46f20\` (\`access_token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_apps_ips_ipv4_addresses\` (\`userAppsId\` int NOT NULL, \`ipv4AddressesId\` int NOT NULL, INDEX \`IDX_a109e3c4948231167f35939ce9\` (\`userAppsId\`), INDEX \`IDX_5d0b60083412b7aa805648dadb\` (\`ipv4AddressesId\`), PRIMARY KEY (\`userAppsId\`, \`ipv4AddressesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_apps_stations_observation_stations\` (\`userAppsId\` int NOT NULL, \`observationStationsId\` int NOT NULL, INDEX \`IDX_f14314fef33a8afbe9a5bcb17d\` (\`userAppsId\`), INDEX \`IDX_b6e3f398b99a5a9e97a3109419\` (\`observationStationsId\`), PRIMARY KEY (\`userAppsId\`, \`observationStationsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_apps\` ADD CONSTRAINT \`FK_884ba4e0d8cd4b80fe912c93db0\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_apps_ips_ipv4_addresses\` ADD CONSTRAINT \`FK_a109e3c4948231167f35939ce96\` FOREIGN KEY (\`userAppsId\`) REFERENCES \`user_apps\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_apps_ips_ipv4_addresses\` ADD CONSTRAINT \`FK_5d0b60083412b7aa805648dadb9\` FOREIGN KEY (\`ipv4AddressesId\`) REFERENCES \`ipv4_addresses\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_apps_stations_observation_stations\` ADD CONSTRAINT \`FK_f14314fef33a8afbe9a5bcb17dc\` FOREIGN KEY (\`userAppsId\`) REFERENCES \`user_apps\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_apps_stations_observation_stations\` ADD CONSTRAINT \`FK_b6e3f398b99a5a9e97a31094196\` FOREIGN KEY (\`observationStationsId\`) REFERENCES \`observation_stations\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_apps_stations_observation_stations\` DROP FOREIGN KEY \`FK_b6e3f398b99a5a9e97a31094196\``);
        await queryRunner.query(`ALTER TABLE \`user_apps_stations_observation_stations\` DROP FOREIGN KEY \`FK_f14314fef33a8afbe9a5bcb17dc\``);
        await queryRunner.query(`ALTER TABLE \`user_apps_ips_ipv4_addresses\` DROP FOREIGN KEY \`FK_5d0b60083412b7aa805648dadb9\``);
        await queryRunner.query(`ALTER TABLE \`user_apps_ips_ipv4_addresses\` DROP FOREIGN KEY \`FK_a109e3c4948231167f35939ce96\``);
        await queryRunner.query(`ALTER TABLE \`user_apps\` DROP FOREIGN KEY \`FK_884ba4e0d8cd4b80fe912c93db0\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6e3f398b99a5a9e97a3109419\` ON \`user_apps_stations_observation_stations\``);
        await queryRunner.query(`DROP INDEX \`IDX_f14314fef33a8afbe9a5bcb17d\` ON \`user_apps_stations_observation_stations\``);
        await queryRunner.query(`DROP TABLE \`user_apps_stations_observation_stations\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d0b60083412b7aa805648dadb\` ON \`user_apps_ips_ipv4_addresses\``);
        await queryRunner.query(`DROP INDEX \`IDX_a109e3c4948231167f35939ce9\` ON \`user_apps_ips_ipv4_addresses\``);
        await queryRunner.query(`DROP TABLE \`user_apps_ips_ipv4_addresses\``);
        await queryRunner.query(`DROP INDEX \`IDX_849845c72b51aec29d29e46f20\` ON \`user_apps\``);
        await queryRunner.query(`DROP TABLE \`user_apps\``);
        await queryRunner.query(`DROP TABLE \`ipv4_addresses\``);
    }

}
