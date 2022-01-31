export const __PROD__: boolean = process.env.NODE_ENV === "production";
export const __TEST__: boolean = process.env.NODE_ENV === "test";
export const __DEV__: boolean = process.env.NODE_ENV === "development" || (!__PROD__ && !__TEST__);

// Authentication Module
export const __AUTH_ROLE_ID_ADMIN__ = 1 as const;
export const __AUTH_ROLE_ID_CLIENT__ = 2 as const;

// Pagination Feature
export const __DEFAULT_ITEMS_PER_PAGE__: number = 50;
export const __MAX_ITEMS_PER_PAGE__: number = 100;

