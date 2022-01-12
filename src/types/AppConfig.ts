export type AppConfig = {
  root: {
    port: number;
    env: string;
  };
  cors: {
    origin: string;
  };
  db: {
    url: string;
  };
  jwt: {
    secret: string;
  };
};
