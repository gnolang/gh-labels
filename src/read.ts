import { RestService } from './services/rest/restService';
import { RequiredParams } from './services/rest/restService.types';
import { Label } from './types';

class ReadHandler {
    // Get a single label
    static async getLabel(
        params: RequiredParams,
        name: string
    ): Promise<Label> {
        return await RestService.get<Label>(
            {
                ...params,
            },
            `/${name}`
        );
    }

    // Get all repository labels
    static async getAllLabels(
        params: RequiredParams,
        pagination: Pagination
    ): Promise<Label[]> {
        return await RestService.get<Label[]>(
            {
                ...params,
            },
            `?per_page${pagination.per_page}&page=${pagination.page}`
        );
    }
}

interface Pagination {
    per_page: number;
    page: number;
}

export { ReadHandler, Pagination };
