import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ObservationStation } from "./ObservationStation";

@ObjectType()
@Entity("weather_observations")
@Index(["id", "uid", "date_time"])
export class WeatherObservation {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Field()
  @Column({ unique: true })
  uid: string;

  @JoinColumn()
  @ManyToOne(() => ObservationStation, { eager: true })
  station: ObservationStation;

  @Field()
  @Column()
  date_time: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rainfall_mm: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  temperature_celcius: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  relative_humidity: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  wind_dir_10m_degree: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  wind_speed_10m_knots: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  max_wind_speed_by_gust_10m_knots: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  wind_dir_3m_degree: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  wind_speed_3m_knots: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  max_wind_speed_by_gust_3m_knots: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sea_level_pressure_hpa: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mean_sea_level_pressure: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sunshine_hh_mm: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_temp_at_10cm_depth_celcius: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_moisture_at_10cm_depth: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_temp_at_30cm_depth_celcius: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_moisture_at_30cm_depth: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_temp_at_70cm_depth_celcius: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_moisture_at_70cm_depth: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_temp_at_100cm_depth_celcius: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soil_moisture_at_100cm_depth: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  global_radiation: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo_active_radiation: number;

  @Field()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @UpdateDateColumn()
  updated_at?: Date;

  public static csv_header_row(): string {
    return (
      [
        "id",
        "uid",
        "station_id",
        "date_time",
        "rainfall_mm",
        "temperature_celcius",
        "relative_humidity",
        "wind_dir_10m_degree",
        "wind_speed_10m_knots",
        "max_wind_speed_by_gust_10m_knots",
        "wind_dir_3m_degree",
        "wind_speed_3m_knots",
        "max_wind_speed_by_gust_3m_knots",
        "sea_level_pressure_hpa",
        "mean_sea_level_pressure",
        "sunshine_hh_mm",
        "soil_temp_at_10cm_depth_celcius",
        "soil_moisture_at_10cm_depth",
        "soil_temp_at_30cm_depth_celcius",
        "soil_moisture_at_30cm_depth",
        "soil_temp_at_70cm_depth_celcius",
        "soil_moisture_at_70cm_depth",
        "soil_temp_at_100cm_depth_celcius",
        "soil_moisture_at_100cm_depth",
        "global_radiation",
        "photo_active_radiation",
        "created_at",
        "updated_at"
      ].join(",") + "\n"
    );
  }
  public static to_csv(observation: WeatherObservation): string {
    return [
      observation.id || "",
      observation.uid || "",
      observation.station.id || "",
      observation.date_time || "",
      observation.rainfall_mm || "",
      observation.temperature_celcius || "",
      observation.relative_humidity || "",
      observation.wind_dir_10m_degree || "",
      observation.wind_speed_10m_knots || "",
      observation.max_wind_speed_by_gust_10m_knots || "",
      observation.wind_dir_3m_degree || "",
      observation.wind_speed_3m_knots || "",
      observation.max_wind_speed_by_gust_3m_knots || "",
      observation.sea_level_pressure_hpa || "",
      observation.mean_sea_level_pressure || "",
      observation.sunshine_hh_mm || "",
      observation.soil_temp_at_10cm_depth_celcius || "",
      observation.soil_moisture_at_10cm_depth || "",
      observation.soil_temp_at_30cm_depth_celcius || "",
      observation.soil_moisture_at_30cm_depth || "",
      observation.soil_temp_at_70cm_depth_celcius || "",
      observation.soil_moisture_at_70cm_depth || "",
      observation.soil_temp_at_100cm_depth_celcius || "",
      observation.soil_moisture_at_100cm_depth || "",
      observation.global_radiation || "",
      observation.photo_active_radiation || "",
      observation.created_at || "",
      observation.updated_at || ""
    ].join(",");
  }

  public static clean(observation: WeatherObservation): WeatherObservation {
    Reflect.deleteProperty(observation, "station");
    return observation;
  }
}
