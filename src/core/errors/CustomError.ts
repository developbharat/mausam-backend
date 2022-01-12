export enum ServerStatusCodes {
  MethodNotAllowed = 405, // Maybe Server doesn't support POST method requests.
  NotAcceptable = 406, // Accept: application/json is missing or something else.
  InternalServerError = 500 // Server error occurred.
}

export enum GeneralStatusCodes {
  BadRequest = 400, // Invalid request, missing information or invalid information
  NotFound = 404 // Resource not found.
}

export enum AuthStatusCodes {
  Forbidden = 403, // Restricted to user role: admin etc. You are not allowed to access it.
  UnAuthorized = 401 // Invalid API key or credentials
}

type StatusCode = GeneralStatusCodes | AuthStatusCodes | ServerStatusCodes;

export class CustomError extends Error {
  private readonly _status: StatusCode;

  constructor(status: StatusCode, message: string) {
    super(message);
    this._status = status;
  }

  public get status(): StatusCode {
    return this._status;
  }
}
