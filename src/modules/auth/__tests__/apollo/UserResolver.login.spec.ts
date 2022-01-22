import supertest from "supertest";
import { SQLDatabase } from "../../../../db/SQLDatabase";
import { User } from "../../../../entities/auth/User";
import { UserProfile } from "../../../../entities/auth/UserProfile";
import { MainServer } from "../../../../MainServer";
import argon2 from "argon2";

/**
 *
 * VALID USERS IN DATABASE:
 * 1. valid1@mail.com (fullname: Jayant Malik, mobile: 7654321000, passcode: Superb@123)
 * 2. valid2@mail.com (fullname: Jayant Malik, mobile: null, passcode: Superb@123)
 *
 */

describe("GraphQL Login Endpoint", () => {
  let apollo: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    await MainServer.init();

    const profile1 = await SQLDatabase.conn.getRepository(UserProfile).save({ full_name: "Jayant Malik" });
    const profile2 = await SQLDatabase.conn.getRepository(UserProfile).save({ full_name: "Jayant Malik" });

    const passcode = await argon2.hash("Superb@123");
    await SQLDatabase.conn
      .getRepository(User)
      .save({ email: "valid1@mail.com", mobile: "7654321000", passcode: passcode, profile: profile1 });
    await SQLDatabase.conn
      .getRepository(User)
      .save({ email: "valid2@mail.com", passcode: passcode, profile: profile2 });

    apollo = supertest(MainServer.expressServer);
  });

  afterAll(async () => {
    await MainServer.shutdown();
  });

  it("returns user with valid credentials", (done) => {
    apollo
      .post("/graphql")
      .send({
        query: 'mutation { login_via_email(options:{ email:"valid1@mail.com", passcode:"Superb@123" }){ id, email } }'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        expect(err).toBeNull();
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.login_via_email).toMatchObject({ email: "valid1@mail.com" });
        return done();
      });
  });

  it("returns user with valid credentials", (done) => {
    apollo
      .post("/graphql")
      .send({
        query:
          'mutation { login_via_mobile(options:{ mobile:"7654321000", passcode:"Superb@123" }){ id, email, mobile } }'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        expect(err).toBeNull();
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.login_via_mobile).toMatchObject({ email: "valid1@mail.com", mobile: "7654321000" });
        return done();
      });
  });
});
