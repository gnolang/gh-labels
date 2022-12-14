import Logger from './logger/logger';
import { RestService } from './services/rest/restService';
import { RequiredParams } from './services/rest/restService.types';

class CreateHandler {
    // Create a new label
    static async createLabel(
        params: RequiredParams,
        createParams: CreateParams
    ) {
        await RestService.post({
            ...params,
            data: createParams,
        });

        Logger.success(`Label ${createParams.name} successfully created!`);
    }
}

interface CreateParams {
    name: string;
    color: string;
    description: string;
}

export { CreateHandler, CreateParams };
