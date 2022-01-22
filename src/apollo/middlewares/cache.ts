import { MiddlewareFn } from "type-graphql";
import { hash_request } from "../utils/hash_request";
import { store } from "../utils/store";

export const cache = (ms: number = 1000): MiddlewareFn<ExpressContext> => {
  return async ({ context }, next) => {
    const { req, res } = context;
    const hash = hash_request(req);

    if (store.check(hash)) {
      return res.end(store.at(hash));
    }

    const end = res.end;
    res.end = (data) => {
      store.put(hash, data, ms);
      return end(data);
    };

    return next();
  };
};
