import ky, { BeforeRequestHook } from 'ky';
import { kyConfigs } from './config';
import { cookies, headers } from 'next/headers';
import merge from 'lodash/merge';

const cookieInterceptor: BeforeRequestHook = async ({ request }) => {
  const token = (await cookies()).get('token')?.value;
  const locale = (await headers()).get('NEXT_LOCALE');

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  if (locale) request.headers.set('X-Locale', locale);
};

export const serverFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    hooks: {
      afterResponse: [
        async (_input: Request, _options: any, response: Response) => {
          const body = await response.json();
          if (body.errors || body.message) {
            throw new Error(JSON.stringify(body));
          }
        },
      ],
      beforeRequest: [cookieInterceptor],
    },
  })
);
