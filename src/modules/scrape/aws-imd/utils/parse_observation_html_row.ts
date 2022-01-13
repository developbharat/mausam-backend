import { WeatherObservation } from "../../../../entities/weather/WeatherObservation";
import { headers_map } from "../constants/headers_map";
import { IObservation } from "../types/IProcessFileResult";
import { create_weather_observation } from "./create_weather_observation";

export const parse_observation_html_row = (cols: string[], headers: string[]): WeatherObservation | undefined => {
  if (cols.length !== headers.length || cols.length !== Object.values(headers_map).length) return undefined;
  // Create a js object with known fields
  const obs: { [key: string]: string | number } = {};
  for (let i = 0; i < cols.length; i++) {
    const known = (headers_map as any)[headers[i]];
    if (`${known}` == "undefined") continue;

    obs[known] = cols[i];
  }
  return create_weather_observation(obs as IObservation);
};
