export const LOGIN_ERROR_CODE = {
  INVALID_CREDENTIAL: "INVALID_CREDENTIAL",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
} as const;

export type LoginErrorCode =
  (typeof LOGIN_ERROR_CODE)[keyof typeof LOGIN_ERROR_CODE];
