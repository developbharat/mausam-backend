export default () => {
  process.env.NODE_ENV = "test";
  process.env.PORT = "4002";
  process.env.JWT_SECRET = "testsecret";
  process.env.CORS_ORIGIN = "http://localhost:3000";
  process.env.DB_URL = ":memory:";
};
