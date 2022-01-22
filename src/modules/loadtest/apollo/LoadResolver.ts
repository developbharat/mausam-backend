import { Query, Resolver, UseMiddleware } from "type-graphql";
import { cache } from "../../../apollo/middlewares/cache";
import { data } from "./data";
import { LoadResult } from "./load";

@Resolver()
export class LoadResolver {
  @UseMiddleware(cache(10000))
  @Query(() => [LoadResult])
  async load(): Promise<LoadResult[]> {
    return Promise.resolve(data);
  }
}
