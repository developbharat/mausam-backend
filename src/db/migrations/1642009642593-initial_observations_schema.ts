import { MigrationInterface, QueryRunner } from "typeorm";

export class initialObservationsSchema1642009642593 implements MigrationInterface {
  name = "initialObservationsSchema1642009642593";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`weather_observations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(255) NOT NULL, \`date_time\` datetime NOT NULL, \`rainfall_mm\` int NULL, \`temperature_celcius\` int NULL, \`relative_humidity\` int NULL, \`wind_dir_10m_degree\` int NULL, \`wind_speed_10m_knots\` int NULL, \`max_wind_speed_by_gust_10m_knots\` int NULL, \`wind_dir_3m_degree\` int NULL, \`wind_speed_3m_knots\` int NULL, \`max_wind_speed_by_gust_3m_knots\` int NULL, \`sea_level_pressure_hpa\` int NULL, \`mean_sea_level_pressure\` int NULL, \`sunshine_hh_mm\` int NULL, \`soil_temp_at_10cm_depth_celcius\` int NULL, \`soil_moisture_at_10cm_depth\` int NULL, \`soil_temp_at_30cm_depth_celcius\` int NULL, \`soil_moisture_at_30cm_depth\` int NULL, \`soil_temp_at_70cm_depth_celcius\` int NULL, \`soil_moisture_at_70cm_depth\` int NULL, \`soil_temp_at_100cm_depth_celcius\` int NULL, \`soil_moisture_at_100cm_depth\` int NULL, \`global_radiation\` int NULL, \`photo_active_radiation\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`stationId\` int NULL, INDEX \`IDX_e2572b63e05d456f0c440392f8\` (\`id\`, \`uid\`, \`date_time\`), UNIQUE INDEX \`IDX_b65862856fc56decfd2a3ef9cd\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`weather_observations\` ADD CONSTRAINT \`FK_109a96b4bf9b86a7d6517ff9d4b\` FOREIGN KEY (\`stationId\`) REFERENCES \`observation_stations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`weather_observations\` DROP FOREIGN KEY \`FK_109a96b4bf9b86a7d6517ff9d4b\``);
    await queryRunner.query(`DROP INDEX \`IDX_b65862856fc56decfd2a3ef9cd\` ON \`weather_observations\``);
    await queryRunner.query(`DROP INDEX \`IDX_e2572b63e05d456f0c440392f8\` ON \`weather_observations\``);
    await queryRunner.query(`DROP TABLE \`weather_observations\``);
  }
}
