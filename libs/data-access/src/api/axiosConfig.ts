import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { STORAGE_KEY } from '../constants';
import { ResponseError } from '../types/responseError';

export class AxiosConfig {
    protected axiosInstance: AxiosInstance;
    constructor(baseURL: string, withAuthorization: boolean, shouldRedirectUnauthorized: boolean, shouldUseIdToken: boolean = false) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 150000,
            timeoutErrorMessage: 'Time out!',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.addInterceptor(this.axiosInstance, withAuthorization, shouldRedirectUnauthorized, shouldUseIdToken);
    }

    protected addInterceptor(instance: AxiosInstance, withAuthorization: boolean, shouldRedirectUnauthorized: boolean, shouldUseIdToken: boolean = false): void {
        if (withAuthorization) {
            instance.interceptors.request.use(async (config) => {
                const accessToken = await this.getAccessTokenAsync(shouldUseIdToken);

                config.headers.Authorization = `Bearer ${accessToken}`;

                return config;
            }, async (error) => {
                return await Promise.reject(error);
            });
        }

        instance.interceptors.response.use(function (response) {
            if ([200, 201].includes(response.status)) {
                return response.data;
            } else {
                const error: ResponseError = { ...new Error(response.statusText), response };

                throw error;
            }
        }, function (error) {
            if (shouldRedirectUnauthorized) {
                if (error?.response?.status === 401) {
                    window.location.href = '/auth/login';
                }
            }

            return Promise.reject(error);
        });
    }

    protected async getAccessTokenAsync(shouldUseIdToken: boolean): Promise<string> {
        if (shouldUseIdToken) {
            return Cookies.get(STORAGE_KEY.ID_TOKEN);
        } else {
            return Cookies.get(STORAGE_KEY.ACCESS_TOKEN);
        }
    }
}
