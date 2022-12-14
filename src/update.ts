import { RestService } from './services/rest/restService';
import { RequiredParams } from './services/rest/restService.types';

class UpdateHandler {
    // Update an existing label
    static async updateLabel(
        params: RequiredParams,
        updateParams: UpdateParams,
        name: string
    ) {
        await RestService.patch(
            {
                ...params,
                data: updateParams,
            },
            name
        );
    }
}

interface UpdateParams {
    new_name?: string;
    color?: string;
    description?: string;
}

export { UpdateHandler, UpdateParams };
