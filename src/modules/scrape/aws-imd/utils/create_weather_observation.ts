import { SQLDatabase } from "../../../../db/SQLDatabase";
import { WeatherObservation } from "../../../weather/entities/weather/WeatherObservation";
import { IObservation } from "../types/IProcessFileResult";

export const create_weather_observation = (result: IObservation): WeatherObservation => {
  return SQLDatabase.conn.getRepository(WeatherObservation).create({
    uid: `${result.cat_code}_${result.station}_${result.date}_${result.time_utc}`,
    station: { aws_code: result.station },
    date_time: new Date(result.date + " " + result.time_utc),
    rainfall_mm: Number(result.rainfall_mm) || undefined,
    temperature_celcius: Number(result.temperature_celcius) || undefined,
    relative_humidity: Number(result.relative_humidity) || undefined,
    wind_dir_10m_degree: Number(result.wind_dir_10m_degree) || undefined,
    wind_speed_10m_knots: Number(result.wind_speed_10m_knots) || undefined,
    max_wind_speed_by_gust_10m_knots: Number(result.max_wind_speed_by_gust_10m_knots) || undefined,
    wind_dir_3m_degree: Number(result.wind_dir_3m_degree) || undefined,
    wind_speed_3m_knots: Number(result.wind_speed_3m_knots) || undefined,
    max_wind_speed_by_gust_3m_knots: Number(result.max_wind_speed_by_gust_3m_knots) || undefined,
    sea_level_pressure_hpa: Number(result.sea_level_pressure_hpa) || undefined,
    mean_sea_level_pressure: Number(result.mean_sea_level_pressure) || undefined,
    sunshine_hh_mm: Number(result.sunshine_hh_mm) || undefined,
    soil_temp_at_10cm_depth_celcius: Number(result.soil_temp_at_10cm_depth_celcius) || undefined,
    soil_moisture_at_10cm_depth: Number(result.soil_moisture_at_10cm_depth) || undefined,
    soil_temp_at_30cm_depth_celcius: Number(result.soil_temp_at_30cm_depth_celcius) || undefined,
    soil_moisture_at_30cm_depth: Number(result.soil_moisture_at_30cm_depth) || undefined,
    soil_temp_at_70cm_depth_celcius: Number(result.soil_temp_at_70cm_depth_celcius) || undefined,
    soil_moisture_at_70cm_depth: Number(result.soil_moisture_at_70cm_depth) || undefined,
    soil_temp_at_100cm_depth_celcius: Number(result.soil_temp_at_100cm_depth_celcius) || undefined,
    soil_moisture_at_100cm_depth: Number(result.soil_moisture_at_100cm_depth) || undefined,
    global_radiation: Number(result.global_radiation) || undefined,
    photo_active_radiation: Number(result.photo_active_radiation) || undefined
  });
};
