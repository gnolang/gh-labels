import axios from 'axios';
import { RequestParams } from './restService.types';

const baseUrl = 'https://api.github.com/repos';

export class RestService {
    static async post<T>(params: RequestParams) {
        return axios
            .post<T>(
                `${baseUrl}/${params.owner}/${params.repo}/labels`,
                params.data,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: 'Bearer ' + params.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    static async get<T>(params: Omit<RequestParams, 'data'>) {
        return axios
            .get<T>(`${baseUrl}/${params.owner}/${params.repo}/labels`, {
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: 'Bearer ' + params.token,
                },
            })
            .then((response) => response.data);
    }

    static async delete<T>(params: RequestParams, name: string) {
        return axios
            .delete(
                `${baseUrl}/${params.owner}/${params.repo}/labels/${name}`,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: 'Bearer ' + params.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    static async put<T>(params: RequestParams) {
        return axios
            .put(
                `${baseUrl}/${params.owner}/${params.repo}/labels`,
                params.data,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: 'Bearer ' + params.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    static async patch<T>(params: RequestParams, name: string) {
        return axios
            .patch(
                `${baseUrl}/${params.owner}/${params.repo}/labels/${name}`,
                params.data,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: 'Bearer ' + params.token,
                    },
                }
            )
            .then((response) => response.data);
    }
}
