import type { Options, BeforeErrorHook } from 'ky';

const errorInterceptor: BeforeErrorHook = async ({ error }) => {
  /** We can have shared hooks in here, or specifc hooks inside client, or server files */
  return error;
};

export const kyConfigs: Options = {
  prefix: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'same-origin',
  retry: 0,
  timeout: 60000,
  headers: {
    // 'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  hooks: {
    beforeError: [errorInterceptor],
  },
};
