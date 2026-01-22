export const USER_VIEW = {
  LIST: "LIST",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
} as const;

export type UserView =
  (typeof USER_VIEW)[keyof typeof USER_VIEW];
