import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

import { ENCRYPTED_STORAGE_KEY } from '@/shared/constants';
import { isNameSpaceProduction } from '@/shared/env/index';

export interface RequestParams {
  params?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
}

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: isNameSpaceProduction() ? 'https://api.daeta.com' : 'https://localhost:3000',
    headers: {
      Accept: 'application/json',
      Pragma: 'no-cache',
    },
  });

  instance.interceptors.request.use(
    async config => {
      const accessToken = `${await EncryptedStorage.getItem(ENCRYPTED_STORAGE_KEY.ACCESS_TOKEN)}`;
      config.headers!['deata-access-token'] = accessToken;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    // camelize 추가
    res => res,
    async (error: AxiosError) => {
      if (error.response && error.response.status === 419) {
        const originalRequest = error.config;
        const refreshToken = (await EncryptedStorage.getItem(
          ENCRYPTED_STORAGE_KEY.REFRESH_TOKEN
        )) as string;
        const { data } = axios.get('https://api.deata.com/refreshToken', {
          headers: {
            'deata-refresh-token': refreshToken,
          },
        });
        await EncryptedStorage.setItem(ENCRYPTED_STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
        originalRequest.headers!['deata-access-token'] = `${data.accessToken}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const getRequest = async <T>(
  url: string,
  { params, headers }: RequestParams = {}
): Promise<T> => {
  const { data } = await createAxiosInstance().get(url, { params, headers });

  return data as T;
};

export const postRequest = async <Req, Res>(
  url: string,
  body: Req,
  { params, headers }: RequestParams = {}
): Promise<Res> => {
  const { data } = await createAxiosInstance().post(url, body, { params, headers });

  return data as Res;
};
