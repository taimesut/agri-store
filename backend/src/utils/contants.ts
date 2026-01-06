export const RES_CODE = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_FAILED: 'VALIDATION_FAILED',

  AUTH_SERIVCE: {
    LOGIN_FAILED: 'LOGIN_FAILED',
  },

  USER_SERVICE: {
    GET_USER_FAILED: 'GET_USER_FAILED',
    GET_USERS_FAILED: 'GET_USERS_FAILED',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',
  },

  CATEGORY_SERVICE: {
    GET_CATEGORY_FAILED: 'GET_CATEGORY_FAILED',
    GET_CATEGORIES_FAILED: 'GET_CATEGORIES_FAILED',
    CREATE_CATEGORY_FAILED: 'CREATE_CATEGORY_FAILED',
    UPDATE_CATEGORY_FAILED: 'UPDATE_CATEGORY_FAILED',
    DELETE_CATEGORY_FAILED: 'DELETE_CATEGORY_FAILED',
    VALIDATE_NON_CATEGORY_CYCLE: 'VALIDATE_NON_CATEGORY_CYCLE',
  },
};

export const RES_MESSAGE = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  CUSTOM_PARSE_INT_PIPE_ERROR: 'Validation failed (numeric string is expected)',

  AUTH_SERVICE: {
    ACCOUNT_OR_PASSWORD_INVALID: 'Tài khoản hoặc mật khẩu không hợp lệ',
    ACCOUNT_DOES_NOT_EXISTS: 'Tài khoản không tồn tại',
    PASSWORD_IS_INCORRECT: 'Mật khẩu không chính xác',

    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGOUT_SUCCESS: 'Đăng xuất thành công',
  },
  USERS_SERVICE: {
    NOT_FOUND_WITH_ID: (id) => `User with id:: ${id} not found`,
    EMAIL_IS_EXISTING: 'Email đã được đăng kí',
  },
  CATEGORIES_SERVICE: {
    NOT_FOUND_WITH_ID: (id) => `Category with id:: ${id} not found`,
    NOT_FOUND_WITH_PARENT_ID: (id) =>
      `Category with parentId:: ${id} not found`,
    NOT_FOUND_WITH_NAME: (name) => `Category with name:: ${name} not found`,
    PARENT_OF_ITSELF: 'Category cannot be parent of itself',
    HIEARARCHY_CYCLE: 'Category hierarchy cycle detected',
  },
};
