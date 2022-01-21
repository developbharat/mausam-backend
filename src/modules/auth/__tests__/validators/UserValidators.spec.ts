import { UserValidators } from "../../validators/UserValidators";

describe("User Validators - Create new account", () => {
  it("returns false in case of invalid options", () => {
    expect(UserValidators.isCreateNewAccountOptionsValid({ full_name: "", email: "", passcode: "" })).toBeFalsy();
    expect(
      UserValidators.isCreateNewAccountOptionsValid({ full_name: "", email: "test@mail.com", passcode: "" })
    ).toBeFalsy();
    expect(
      UserValidators.isCreateNewAccountOptionsValid({ full_name: "", email: "test@mail.com", passcode: "Superb@143" })
    ).toBeFalsy();

    expect(
      UserValidators.isCreateNewAccountOptionsValid({ full_name: "John", email: "test@mail.com", passcode: "" })
    ).toBeFalsy();
    expect(
      UserValidators.isCreateNewAccountOptionsValid({ full_name: "John", email: "", passcode: "Superb@143" })
    ).toBeFalsy();

    expect(
      UserValidators.isCreateNewAccountOptionsValid({
        full_name: "John",
        email: "something interesting",
        passcode: "Superb@143"
      })
    ).toBeFalsy();
    expect(
      UserValidators.isCreateNewAccountOptionsValid({ full_name: "John", email: "test@mail.com", passcode: "pass" })
    ).toBeFalsy(); // short passcode

    expect(
      UserValidators.isCreateNewAccountOptionsValid({
        full_name: "John",
        email: "test@mail.com",
        passcode: "' OR 1 = 1"
      })
    ).toBeFalsy(); // spaces not allowed.
    expect(
      UserValidators.isCreateNewAccountOptionsValid({
        full_name: "John",
        email: "' OR 1 = 1",
        passcode: "Superb@569"
      })
    ).toBeFalsy(); // spaces not allowed.
    expect(
      UserValidators.isCreateNewAccountOptionsValid({
        full_name: "' OR 1 = 1",
        email: "test@mail.com",
        passcode: "Superb@242"
      })
    ).toBeFalsy(); // equals sign and numbers not allowed.
  });

  it("returns true in case of valid options", () => {
    expect(
      UserValidators.isCreateNewAccountOptionsValid({
        full_name: "John",
        email: "test@mail.com",
        passcode: "Superb@143"
      })
    ).toBeTruthy();
    expect(
      UserValidators.isCreateNewAccountOptionsValid({
        full_name: "Jayant Malik",
        email: "test@mail.com",
        passcode: "Superb@143"
      })
    ).toBeTruthy();
  });
});

describe("User Validators - Login via Email", () => {
  it("returns false in case of invalid options", () => {
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "", passcode: "" })).toBeFalsy();
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "", passcode: "Superb@143" })).toBeFalsy();
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "test@mail.com", passcode: "" })).toBeFalsy();

    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "something", passcode: "Superb@143" })).toBeFalsy(); // invalid email
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "test@mail.com", passcode: "pass" })).toBeFalsy(); // short passcode

    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "test@mail.com", passcode: "' OR 1 = 1" })).toBeFalsy(); // spaces not allowed.
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "'OR 1 = 1", passcode: "' OR 1 = 1" })).toBeFalsy(); // spaces not allowed.
  });

  it("returns true in case of valid options", () => {
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "test@mail.com", passcode: "Superb@143" })).toBeTruthy();
    expect(UserValidators.isLoginViaEmailOptionsValid({ email: "test@mail.com", passcode: "passcode" })).toBeTruthy();
  });
});

describe("User Validators - Login via Mobile", () => {
  it("returns false in case of invalid options", () => {
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "", passcode: "" })).toBeFalsy();
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "", passcode: "Superb@143" })).toBeFalsy();

    expect(
      UserValidators.isLoginViaMobileOptionsValid({ mobile: "test@mail.com", passcode: "Superb@143" })
    ).toBeFalsy();
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "7206987456", passcode: "" })).toBeFalsy();

    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "859744569", passcode: "Superb@143" })).toBeFalsy(); // invalid mobile
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "7589657458", passcode: "pass" })).toBeFalsy(); // short passcode

    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "7695412585", passcode: "' OR 1 = 1" })).toBeFalsy(); // spaces not allowed.
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "'OR 1 = 1", passcode: "' OR 1 = 1" })).toBeFalsy(); // spaces not allowed.
  });

  it("returns true in case of valid options", () => {
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "9856745231", passcode: "Superb@143" })).toBeTruthy();
    expect(UserValidators.isLoginViaMobileOptionsValid({ mobile: "9856745231", passcode: "passcode" })).toBeTruthy();
  });
});

describe("User Validators - Update profile", () => {
  it("returns false in case of invalid options", () => {
    expect(UserValidators.isUpdateProfileOptionsValid({ full_name: "", user_id: 0 })).toBeFalsy();
    expect(UserValidators.isUpdateProfileOptionsValid({ full_name: "Jayant Malik", user_id: 0 })).toBeFalsy(); // sql db starts id from 1

    expect(UserValidators.isUpdateProfileOptionsValid({ full_name: "Jayant Malik", user_id: 0 })).toBeFalsy();
    expect(UserValidators.isUpdateProfileOptionsValid({ full_name: "Jayant Malik", user_id: "" as any })).toBeFalsy();
    expect(
      UserValidators.isUpdateProfileOptionsValid({ full_name: "Jayant Malik", user_id: "invalid" as any })
    ).toBeFalsy(); // id must be int
  });

  it("returns true in case of valid options", () => {
    expect(UserValidators.isUpdateProfileOptionsValid({ full_name: "Jayant", user_id: 1 })).toBeTruthy();
    expect(UserValidators.isUpdateProfileOptionsValid({ full_name: "Jayant Malik", user_id: 100 })).toBeTruthy();
  });
});
