export const RES_CODE = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  PRISMA_ERROR: 'PRISMA_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_FAILED: 'VALIDATION_FAILED',

  PRISMA_SERVICE: {
    DUPLICATE_VALUE: 'DUPLICATE_VALUE',
  },

  AUTH_SERIVCE: {
    LOGIN_FAILED: 'LOGIN_FAILED',
  },

  PRODUCT_SERVICE: {
    GET_PRODUCT_FAILED: 'GET_PRODUCT_FAILED',
    GET_PRODUCTS_FAILED: 'GET_PRODUCTS_FAILED',
    CREATE_PRODUCT_FAILED: 'CREATE_PRODUCT_FAILED',
    UPDATE_PRODUCT_FAILED: 'UPDATE_PRODUCT_FAILED',
    DELETE_PRODUCT_FAILED: 'DELETE_PRODUCT_FAILED',
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
  PRISMA_ERROR: 'PRISMA_ERROR',

  CUSTOM_PARSE_INT_PIPE_ERROR: 'Validation failed (numeric string is expected)',

  PRISMA_SERVICE: {
    DUPLICATE_VALUE: (field) => `Duplicate value for: ${field}`,
  },

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
    NAME_IS_EXISTING: (name) => `Category with name:: ${name} đã tồn tại`,
    PARENT_OF_ITSELF: 'Category cannot be parent of itself',
    HIEARARCHY_CYCLE: 'Category hierarchy cycle detected',
  },
  PRODUCT_SERVICE: {
    HANDLE_IS_EXISTING: (handle) =>
      `Product with handle:: ${handle} đã tồn tại`,
    SKU_IS_EXISTING: (sku) => `Product with sku:: ${sku} đã tồn tại`,
    NOT_FOUND_CATEGORY_ID: (id) =>
      `Product with categoryId:: ${id} không tồn tại`,
    NOT_FOUND_WITH_ID: (id) => `Not found with id: ${id}`,
  },
};
