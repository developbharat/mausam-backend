import { AppsValidators } from "../../validators/AppsValidators";

describe("Apps Validators - Create new application", () => {
  it("returns false in case of invalid options", () => {
    expect(AppsValidators.isCreateOptionsValid({} as any)).toBeFalsy();
    expect(
      AppsValidators.isCreateOptionsValid({ user_id: 1, name: undefined, description: undefined } as any)
    ).toBeFalsy();
    expect(
      AppsValidators.isCreateOptionsValid({ user_id: undefined, name: "Sample", description: undefined } as any)
    ).toBeFalsy();
    expect(
      AppsValidators.isCreateOptionsValid({ user_id: undefined, name: undefined, description: "It is simple" } as any)
    ).toBeFalsy();

    expect(
      AppsValidators.isCreateOptionsValid({ user_id: 0, name: "Simple", description: "It is simple" })
    ).toBeFalsy();

    expect(AppsValidators.isCreateOptionsValid({ user_id: 1, name: "", description: "" })).toBeFalsy();
    expect(AppsValidators.isCreateOptionsValid({ user_id: 1, name: "", description: "It is simple" })).toBeFalsy();
  });

  it("returns true in case of valid options", () => {
    expect(AppsValidators.isCreateOptionsValid({ user_id: 1, name: "Simple", description: undefined })).toBeTruthy();
    expect(
      AppsValidators.isCreateOptionsValid({ user_id: 1, name: "Simple", description: "Simple is really awesome" })
    ).toBeTruthy();
  });
});
