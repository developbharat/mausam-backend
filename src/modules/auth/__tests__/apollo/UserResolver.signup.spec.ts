import supertest from "supertest";
import { MainServer } from "../../../../MainServer";

describe("GraphQL Signup Endpoint", () => {
  let apollo: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    await MainServer.init();
    apollo = supertest(MainServer.expressServer);
  });

  afterAll(async () => {
    await MainServer.shutdown();
  });

  it("returns user with valid credentials", (done) => {
    apollo
      .post("/graphql")
      .send({
        query:
          'mutation { create_new_account(options:{ full_name: "Jayant Malik", email:"valid1@mail.com", passcode:"Superb@123" }){ id, email } }'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        expect(err).toBeNull();
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.errors).toBeUndefined();
        expect(res.body.data.create_new_account).toMatchObject({ email: "valid1@mail.com" });
        return done();
      });
  });

  it("fails with invalid credentials", (done) => {
    apollo
      .post("/graphql")
      .send({
        query:
          'mutation { create_new_account(options:{ full_name:"7654321000", email:"invalid1@mail.com", passcode:"Superb@123" }){ id, email, mobile } }'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        expect(err).toBeNull();
        expect(res.body?.errors).toBeDefined();
        expect(res.body?.errors?.length).toBeGreaterThanOrEqual(1);
        done();
      });
  });
});
