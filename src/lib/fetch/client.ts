'use client';

import ky, { BeforeRequestHook, Options } from 'ky';
import { kyConfigs } from './config';
import jsCookie from 'js-cookie';
import merge from 'lodash/merge';
import { toast } from 'sonner';


const cookieInterceptor: BeforeRequestHook = async ({ request }) => {
  const token = jsCookie.get('token');

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  request.headers.set('Accept-Language', 'en');

  request.headers.set('Accept', 'application/json, text/plain, */*');

  const contentType = request.headers.get('Content-Type');
  const value = contentType?.startsWith('multipart/form-data')
    ? contentType
    : 'application/json';

  request.headers.set('Content-Type', value);
};

const handleUnauthorized = () => {
  jsCookie.remove('token', { path: '/' });
  toast.error('Your session has expired. Please log in again.');
  window.location.replace('/login');
};

export const clientFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}user`,
    throwHttpErrors: false,
    hooks: {
      beforeRequest: [cookieInterceptor],
      afterResponse: [
        async (_input: Request, _options: Options, response: Response) => {
          const body = await response.json();

          if (response.status === 401) {
            const token = jsCookie.get('token');
            if (token) {
              handleUnauthorized();
            }
          }

          if (
            response.status !== 200 &&
            response.status !== 201 &&
            response.status !== 204
          ) {
            throw new Error(JSON.stringify(body));
          }
        },
      ],
    },
  })
);

export const clientSharedFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}shared`,
    throwHttpErrors: false,
    hooks: {
      beforeRequest: [cookieInterceptor],
      afterResponse: [
        async (_input: Request, _options: Options, response: Response) => {
          const body = await response.json();

          if (response.status === 401) {
            const token = jsCookie.get('token');
            if (token) {
              handleUnauthorized();
            }
          }

          if (
            response.status !== 200 &&
            response.status !== 201 &&
            response.status !== 204
          ) {
            throw new Error(JSON.stringify(body));
          }
        },
      ],
    },
  })
);

export const clientAuthFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    throwHttpErrors: false,
    hooks: {
      beforeRequest: [cookieInterceptor],
      afterResponse: [
        async (_input: Request, _options: Options, response: Response) => {
          const body = await response.json();

          if (response.status === 401) {
            const token = jsCookie.get('token');
            if (token) {
              handleUnauthorized();
            }
          }

          if (
            response.status !== 200 &&
            response.status !== 201 &&
            response.status !== 204
          ) {
            throw new Error(JSON.stringify(body));
          }
        },
      ],
    },
  })
);
